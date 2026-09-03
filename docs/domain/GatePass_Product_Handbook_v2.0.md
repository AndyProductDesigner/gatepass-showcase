# GatePass Product Handbook

Version 2.0 | Stable Product Reference

## 1. Purpose

This handbook provides a concise overview of the GatePass product, its users, core concepts, and established business rules.

The GatePass Domain Model is the detailed authority for domain definitions, relationships, rules, and lifecycle behaviour. This handbook does not contain interface design, implementation guidance, technical architecture, project progress, or temporary scope decisions.

## 2. Product

GatePass enables trucking companies to book, manage, and track container-movement appointments at container terminals.

## 3. Users and Organisations

- Dispatchers book and manage appointments for their Trucking Company.
- A Dispatcher belongs to one Trucking Company and does not select a different company while booking.
- Truck Drivers carry out the scheduled container movements.
- Trucking Companies own trucks and employ drivers.
- Shipping Lines own containers and issue Booking Numbers.
- Terminals provide appointment availability, configure cutoffs, and issue Gate Passes or tickets.

## 4. Core Business Concepts

### Appointment

An Appointment reserves a terminal date-and-time slot for one container movement.

- One Appointment represents one container.
- Each Appointment belongs to one Terminal and one Move Type.
- GatePass generates the Appointment ID.
- Each container receives its own appointment slot. Appointments created together may have the same slot or different slots.

### Booking Attempt

A Booking Attempt is one GatePass operation in which a user tries to create one or more Appointments.

- One Booking Attempt applies to exactly one Terminal and one Move Type.
- A Booking Attempt supports a maximum of 10 containers.
- Each eligible container creates its own Appointment.
- A Booking Attempt uses either Container Numbers or a Booking Number, never both.

### Booking Number

A Booking Number is issued by a Shipping Line for a customer booking.

- It may represent multiple containers and multiple size types.
- The containers may be booked partially across multiple Booking Attempts.
- GatePass distinguishes Total Containers, Booked, and Available for Booking.
- A user may select up to 10 available containers in one Booking Attempt.
- Container numbers may still be unknown when the Booking Number is used.

### Container

- A GatePass Container Number always contains four letters followed by seven digits, including the check digit; for example, `MAEU1234567`.
- A container belongs to one Shipping Line.
- Container information includes Shipping Line, Size Type, and any applicable Special Equipment.
- A container may have only one active Appointment at a time.
- It becomes available for booking again after its Appointment is Completed or Cancelled.

### Move Type

GatePass supports four Move Types:

- Pick Full
- Pick Empty
- Drop Full
- Drop Empty

Import and Export provide business context, but they do not determine the booking method. The booking method depends on which identifier the user knows.

### Special Equipment

Special Equipment may include:

- Reefer
- Hazardous (Haz)
- Over Dimension (OD)

More than one type may apply to a container. Hazardous handling information may require user input when applicable. GatePass does not present a `None` value when no special equipment applies.

## 5. Booking Identifier Rule

| Information known to the user | Booking method |
|---|---|
| Only Container Number | Use Container Number |
| Only Booking Number | Use Booking Number |
| Both | Use either method |

When Container Numbers are used, the Booking Number is irrelevant to that Booking Attempt.

## 6. Booking Flow

1. The user selects either Container Numbers or Booking Number.
2. The user selects one Terminal and one Move Type for the Booking Attempt.
3. GatePass establishes the containers or quantities being booked.
4. The user provides a date and time preference or requests the earliest available slots.
5. GatePass evaluates each container for its own slot.
6. Booking Review shows successful and failed results separately.
7. The user completes the booking with the successful Appointments.

### Container Number validation

- GatePass creates a card for every entered Container Number, including invalid entries.
- Invalid cards are marked and may be corrected or removed.
- If invalid cards remain when the user proceeds, GatePass asks for confirmation.
- On confirmation, GatePass excludes the invalid containers and continues with the valid containers.
- The user cannot proceed if no valid container remains.

### Date and time preference

- The user may provide a From Date, To Date, and Time of Day.
- Time-of-day choices are Morning, Afternoon, Evening, Night, and Anytime.
- Morning is 6:00–11:59, Afternoon is 12:00–16:59, Evening is 17:00–20:59, and Night is 21:00–5:59.
- Without a custom preference, GatePass seeks the earliest available slots for all containers.
- With a custom preference, some containers may succeed while others fail if sufficient matching slots are unavailable.

### Successful and failed results

- Booking Review displays Successful and Failed results in separate categories.
- Successful results remain intact while failed containers are retried.
- Failed containers may be retried any number of times with a different date and time-of-day preference.
- Failed containers may also be removed.
- If failed containers remain when the user proceeds, GatePass asks for confirmation and completes the booking with only the successful Appointments.
- A container that remains failed or is excluded must be submitted in a new Booking Attempt if the user wants to book it later.

## 7. Appointment Lifecycle

| Status | Meaning |
|---|---|
| Pending | The Appointment exists, but both Truck and Driver have not yet been assigned. |
| Confirmed | Both an eligible Truck and Driver are assigned. |
| Completed | The Terminal gate event has completed the Appointment lifecycle. |
| Cancelled | The Appointment was cancelled before the applicable Terminal cutoff. |

- Every new Appointment starts as Pending.
- Pending becomes Confirmed after both Truck and Driver are assigned.
- Pending or Confirmed may become Cancelled before cutoff.
- Confirmed becomes Completed after the Terminal gate event.
- Completed and Cancelled are terminal states.
- Completed Appointments cannot be modified, and Cancelled Appointments cannot be restored.

## 8. Appointment Management

- Truck and Driver assignment occurs after Appointment creation and is not part of Book Appointment or Booking Review.
- Both a Truck and Driver are required for an Appointment to become Confirmed.
- Assignments may be replaced before the applicable Terminal cutoff but are not simply removed.
- Before cutoff, an eligible Appointment may be rescheduled or cancelled.
- The Terminal configures the applicable cutoff.

## 9. Gate Pass / Ticket

- The Terminal, not GatePass, issues the Gate Pass or ticket.
- Only Confirmed Appointments are eligible.
- The Gate Pass or ticket is sent shortly before the scheduled Appointment time.

## 10. Primary Product Workflows

- View and manage Appointments
- Book Appointment
- Review Booking outcomes
- View Appointment details
- Assign or replace Truck and Driver
- Reschedule Appointment
- Cancel Appointment

## 11. Document Boundaries

- **GatePass Product Handbook:** concise, stable product overview.
- **GatePass Domain Model:** detailed domain definitions, relationships, rules, and lifecycle.
- **PSL:** approved product structure for a page or feature.
- **PWL:** approved events, validations, conditions, and workflow transitions.
- Technical standards, implementation tasks, progress, and project history belong outside the product-domain documents.
