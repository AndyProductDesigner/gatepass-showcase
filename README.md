# GatePass — Code Review

GatePass is an appointment-booking product for container terminal visits. This public repository is a sanitized, curated review copy of the private development project.

It is intended for portfolio and technical review rather than deployment. The files here are real implementation and product-reference files selected to show product logic, data access, reusable interface patterns, and the booking domain without exposing private collaboration material or environment configuration.

## Good places to start

- `docs/domain/GatePass_Product_Handbook_v2.0.md` — product concepts, rules and booking lifecycle
- `docs/technical/GatePass_Technical_Architecture_Reference.md` — technical foundation
- `src/app/BookAppointment/getBookAppointmentData.js` — terminal and move-type data composition
- `src/app/BookAppointment/ContainerChip/` — validated container presentation and removal behaviour
- `src/components/AppointmentCard/` — appointment state, actions and presentation logic
- `src/lib/supabase/` — browser/server data clients
- `src/lib/auth/` — authentication helper
- `src/styles/tokens.css` — shared design values

## Stack

Next.js • React • Supabase • Vanilla CSS • CSS design tokens

## What is intentionally not included

- environment files and deployment secrets
- credentials or passwords
- private collaboration/AI working documents
- internal development instructions and project history
- every screen and implementation file from the private repository

The live product and portfolio case study are the best places to experience the complete application. This repository exists to make the implementation and product thinking reviewable without making the working source repository public.
