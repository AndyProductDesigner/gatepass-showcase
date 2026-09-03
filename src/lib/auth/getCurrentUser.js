/* =========================================================
   GET CURRENT USER

   Returns the Supabase Auth user for the current session.

   The Supabase client is supplied by the caller so this helper
   can be used from both browser and server code.
   ========================================================= */

export async function getCurrentUser(supabase) {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw error;
  }

  if (!user) {
    throw new Error('You are not signed in.');
  }

  return user;
}
