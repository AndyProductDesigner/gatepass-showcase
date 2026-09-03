import { createClient } from '@/lib/supabase/server';

// Gets Terminals and the Move Types accepted by each Terminal.
export async function getBookAppointmentData() {
  const supabase = await createClient();

  const [terminalsResult, moveTypesResult, terminalMoveTypesResult] =
    await Promise.all([
      supabase.from('terminals').select('id, name, code').order('name'),
      supabase
        .from('move_types')
        .select('id, name, code, input_method')
        .order('name'),
      supabase
        .from('terminal_move_types')
        .select('terminal_id, move_type_id'),
    ]);

  const firstError =
    terminalsResult.error ||
    moveTypesResult.error ||
    terminalMoveTypesResult.error;

  if (firstError) {
    throw new Error(`Unable to load Book Appointment data: ${firstError.message}`);
  }

  const moveTypesById = new Map(
    (moveTypesResult.data ?? []).map((moveType) => [moveType.id, moveType]),
  );

  const moveTypeIdsByTerminal = (terminalMoveTypesResult.data ?? []).reduce(
    (result, relationship) => {
      const currentIds = result.get(relationship.terminal_id) ?? [];

      currentIds.push(relationship.move_type_id);
      result.set(relationship.terminal_id, currentIds);

      return result;
    },
    new Map(),
  );

  return (terminalsResult.data ?? []).map((terminal) => ({
    ...terminal,
    moveTypes: (moveTypeIdsByTerminal.get(terminal.id) ?? [])
      .map((moveTypeId) => moveTypesById.get(moveTypeId))
      .filter(Boolean),
  }));
}
