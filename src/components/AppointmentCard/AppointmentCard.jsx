'use client';

import { EllipsisVertical, History } from 'lucide-react';

import IconButton from '@/components/ui/IconButton/IconButton.jsx';
import Menu from '@/components/ui/Menu/Menu.jsx';

import {
  buildAppointmentDetails,
  formatAppointmentTimeSlot,
  getAppointmentReferenceLabel,
  getStatusClassName,
} from './AppointmentCard.js';

import './AppointmentCard.css';

export default function AppointmentCard({ appointment, onActionSelect }) {
  const {
    sourceType,
    referenceNumber,
    sizeType,
    shippingLine,
    moveType,
    specialHandling,
    appointmentDateTime,
    terminal,
    status,
    rescheduleCount = 0,
  } = appointment;

  const referenceLabel = getAppointmentReferenceLabel(sourceType);

  const appointmentDetails = buildAppointmentDetails({
    sizeType,
    shippingLine,
    moveType,
    specialHandling,
  });

  const appointmentTimeSlot = formatAppointmentTimeSlot(appointmentDateTime);
  const isFinalAppointment = status === 'Completed' || status === 'Cancelled';

  const transportDetailsLabel =
    status === 'Confirmed'
      ? 'Change Transport Details'
      : 'Add Transport Details';

  const appointmentMenuOptions = [
    { value: 'view-details', label: 'View Details' },
    {
      value: 'transport-details',
      label: transportDetailsLabel,
      disabled: isFinalAppointment,
    },
    {
      value: 'reschedule',
      label: 'Reschedule Appointment',
      disabled: isFinalAppointment,
    },
    {
      value: 'reschedule-history',
      label: 'Reschedule History',
      disabled: rescheduleCount === 0,
    },
    {
      value: 'cancel',
      label: 'Cancel Appointment',
      disabled: isFinalAppointment,
    },
  ];

  function selectAppointmentAction(action) {
    onActionSelect?.(action, appointment);
  }

  function openRescheduleHistory() {
    selectAppointmentAction('reschedule-history');
  }

  return (
    <article
      className="appointment-card"
      aria-label={`${referenceLabel} ${referenceNumber}`}
    >
      <div className="appointment-card__content">
        <div className="appointment-card_reference_details">
          <div className="appointment-card__reference">
            <span className="appointment-card__reference-label">
              {referenceLabel}
            </span>

            <span className="appointment-card__reference-number numeric">
              {referenceNumber}
            </span>
          </div>

          <span className="appointment-card__details">
            {appointmentDetails}
          </span>
        </div>

        <div className="appointment-card__schedule">
          <time
            className="appointment-card__date-time numeric"
            dateTime={appointmentDateTime}
          >
            {appointmentTimeSlot}
          </time>

          <span className="appointment-card__terminal">{terminal}</span>
        </div>
      </div>

      <div className="appointment-card__actions">
        {rescheduleCount > 0 && (
          <div className="appointment-card__reschedule-info">
            <IconButton
              icon={History}
              label={`View reschedule history for ${referenceNumber}`}
              onClick={openRescheduleHistory}
            />

            <button
              className="appointment-card__reschedule-count"
              type="button"
              aria-label={`View ${rescheduleCount} ${
                rescheduleCount === 1 ? 'reschedule' : 'reschedules'
              } for ${referenceNumber}`}
              onClick={openRescheduleHistory}
            >
              {rescheduleCount}
            </button>
          </div>
        )}

        <span className={getStatusClassName(status)}>
          {status.toUpperCase()}
        </span>

        <Menu
          align="end"
          label={`Actions for ${referenceLabel} ${referenceNumber}`}
          options={appointmentMenuOptions}
          onSelect={selectAppointmentAction}
          trigger={({ isOpen, toggleMenu }) => (
            <IconButton
              icon={EllipsisVertical}
              label={
                isOpen
                  ? `Close menu for ${referenceLabel} ${referenceNumber}`
                  : `Open menu for ${referenceLabel} ${referenceNumber}`
              }
              onClick={toggleMenu}
            />
          )}
        />
      </div>
    </article>
  );
}
