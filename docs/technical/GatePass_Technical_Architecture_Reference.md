# GatePass Technical Architecture Reference

## Purpose

Record the factual technical foundation and established code ownership map of the current GatePass implementation.

This document is descriptive, not prescriptive. Implementation standards belong exclusively in ESD.

## Technical Foundation

- Next.js App Router
- React with JavaScript
- Supabase
- Vanilla CSS
- Lucide icons
- Path alias: `@/*` maps to `./src/*`

## Established Code Areas

| Area | Current owner | Contents |
|---|---|---|
| Page routes | Next.js App Router pages | Page entry points and page composition |
| Product components | React components named for GatePass concepts | Product-specific rendering and interaction |
| Interface components | Reusable React controls | Shared interface controls |
| Data access | Service modules | Supabase queries and persistence operations |
| Presentation | Component CSS and lasting page CSS | Component and page appearance |
| Global presentation | `globals.css` | Application-wide defaults and layout foundations |
| Design values | `tokens.css` | Shared visual values |

## Established Product Components

- AppHeader
- PageHeader
- AppointmentCard
- AppointmentList
- Menu
- FilterDialog

This list records components confirmed in the current project. Feature-specific ownership remains discoverable from the implementation itself.

## Data Foundation

- Supabase is the external data platform.
- The Appointments source is connected for the appointments list.
- Booking Number lookup does not yet have a confirmed operational data source.

## Reference Maintenance

Update this document only when the factual technical foundation or established code ownership changes. Do not add implementation rules, feature requirements, project status, or domain decisions.
