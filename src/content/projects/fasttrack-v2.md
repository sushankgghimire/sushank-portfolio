---
title: FastTrackV2
tagline: Django 5 and DRF rebuild of an engineering institute's platform with Docker, uv and a justfile
category: ai
featured: true
order: 4
year: 2025
stack: [Python 3.13, Django 5.1, Django REST Framework, PostgreSQL 17, Docker, uv, ruff, pytest]
links:
  repo: https://github.com/sushankgghimire/FastTrackV2
metrics:
  - { value: 'One command', label: 'bootstrap with just' }
  - { value: 'Containerised', label: 'dev and prod' }
---

The second generation of the platform I run for Fast Track Engineering Institute, rebuilt so that a new developer can be productive in one command.

## Setup that stays out of the way

`just bootstrap` builds the images, creates the environment, and runs migrations. `just start` brings up the app and its infrastructure. Tests, coverage, linting and formatting each have a single verb.

## Under the hood

- Django 5.1 with Django REST Framework for the API surface.
- PostgreSQL 17 in Docker Compose, matching production.
- `uv` for fast, reproducible dependency management, `ruff` for lint and format, `pytest` with coverage, and pre-commit hooks so nothing broken lands on main.
