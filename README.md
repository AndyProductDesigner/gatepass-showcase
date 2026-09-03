# GatePass — Code Review

GatePass is an appointment-booking product for container terminal visits. This public repository is a sanitized, curated review copy of the private development project.

It is intended for portfolio and technical review, not as the deployment source of truth. The files here are real implementation and product-reference files selected to show product logic, data access, reusable interface patterns, and the booking domain without exposing private collaboration material or environment configuration.

## Good places to start

- `docs/domain/GatePass_Product_Handbook_v2.0.md` — product concepts, rules and booking lifecycle
- `docs/technical/GatePass_Technical_Architecture_Reference.md` — technical foundation
- `src/app/BookAppointment/getBookAppointmentData.js` — terminal and move-type data composition
- `src/app/BookAppointment/ContainerChip/` — validated container presentation and removal behaviour
- `src/components/AppointmentCard/` — appointment state, actions and presentation logic
- `src/components/ui/IconButton/` — reusable accessible icon control
- `src/components/ui/Menu/` — reusable action/selection menu with keyboard support and viewport-aware positioning
- `src/lib/supabase/` — browser/server data clients
- `src/lib/auth/` — authentication helper
- `src/styles/tokens.css` — shared design values

## Stack

Next.js • React • Supabase • Vanilla CSS • CSS design tokens

## Scope of this repository

This is a deliberate review snapshot rather than a runnable copy of the full application. Each selected example includes the local dependencies needed to follow the implementation, while screens, assets and internal working documents that do not add review value are left out.

Intentionally excluded:

- environment files and deployment secrets
- credentials or passwords
- private collaboration/AI working documents
- internal development instructions and project history
- the complete set of product screens and routes

The live product is the best place to experience GatePass end to end. This repository exists so a reviewer can inspect how representative parts of the product and its underlying rules were structured and implemented without making the working source repository public.
