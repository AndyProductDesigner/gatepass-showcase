# GatePass — Code Review

This public repository is a sanitized review copy of GatePass, an appointment-booking product for container terminal visits.

The original development repository remains private. This copy is intended for portfolio and technical review. It contains representative production code, product/domain documentation, shared UI components, authentication/data-access patterns, and the main booking/review flows. Private collaboration documents, local environment files, credentials, deployment secrets, and internal development history are intentionally excluded.

## What to review

- `src/app/BookAppointment/` — booking input and container handling
- `src/app/BookingReview/` — review and retry flow
- `src/components/` — reusable interface components
- `src/lib/` — authentication and Supabase access
- `src/styles/` — design tokens and global styling
- `docs/domain/` — product model and relationships
- `docs/technical/` — technical architecture notes

## Stack

Next.js • React • Supabase • CSS design tokens

## Live product

https://gate-pass-v2.vercel.app

This repository is a review snapshot, not the deployment source of truth.
