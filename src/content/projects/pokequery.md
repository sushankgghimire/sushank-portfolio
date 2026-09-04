---
title: PokeQuery
tagline: Async FastAPI service that caches the PokeAPI into PostgreSQL and serves filtered queries
category: ai
featured: true
order: 3
year: 2024
stack: [Python, FastAPI, PostgreSQL, asyncpg, Alembic, SQLAlchemy]
links:
  repo: https://github.com/sushankgghimire/PokeQuery
metrics:
  - { value: 'v1', label: 'versioned REST API' }
  - { value: 'Async', label: 'end to end' }
---

A small, clean backend I built to practise the patterns I use at work: an async FastAPI app that fetches Pokemon from the public PokeAPI on first request, stores them in PostgreSQL, and serves every later request from the database.

## What it covers

- Versioned routes (`/api/v1`) so the contract can change without breaking clients.
- Filtering by name and type with proper pagination.
- Alembic migrations, an `.env` driven config, and a fully async data layer with `asyncpg`.

It is the reference I reach for when I need to spin up a typed, async service quickly.
