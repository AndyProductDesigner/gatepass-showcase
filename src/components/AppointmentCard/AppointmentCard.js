export function getAppointmentReferenceLabel(sourceType) {
  if (sourceType === 'booking') {
    return 'Booking Number';
  }

  return 'Container Number';
}

export function buildAppointmentDetails({
  sizeType,
  shippingLine,
  moveType,
  specialHandling = [],
}) {
  return [sizeType, shippingLine, moveType, ...specialHandling]
    .filter(Boolean)
    .join(' · ');
}

export function formatAppointmentTimeSlot(appointmentDateTime) {
  if (!appointmentDateTime) {
    return '—';
  }

  const startDate = new Date(appointmentDateTime);

  if (Number.isNaN(startDate.getTime())) {
    return '—';
  }

  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);

  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  });

  const timeFormatter = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: false,
  });

  return `${dateFormatter.format(startDate)}, ${timeFormatter.format(
    startDate,
  )}–${timeFormatter.format(endDate)}`;
}

export function getStatusClassName(status) {
  const normalizedStatus = status?.toLowerCase() ?? '';

  return [
    'appointment-card__status',
    `appointment-card__status--${normalizedStatus}`,
  ]
    .filter(Boolean)
    .join(' ');
}
