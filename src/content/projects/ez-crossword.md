---
title: EZ-Crossword
tagline: Solves newspaper crosswords and generates new ones with transformer QA models
category: ai
featured: true
order: 1
year: 2023
stack: [Python, PyTorch, Transformers, Django, FastAPI, Bootstrap]
links:
  live: https://ez-crossword.vercel.app/
  repo: https://github.com/sushankgghimire/EZ-Crossword
cover: ../../assets/projects/crossword.png
coverAlt: EZ-Crossword web app by Sushank Ghimire, showing a solved crossword grid
metrics:
  - { value: 'QA models', label: 'clue answering' }
  - { value: 'End to end', label: 'solve and generate' }
---

EZ-Crossword started as my final year project and turned into something I still like showing people. You hand it a crossword from a newspaper and it solves it. Or you hand it a theme and it builds one.

## How it works

Solving is a question answering problem with a twist: every clue has a known answer length and shares letters with its neighbours. A transformer QA model produces candidate answers for each clue, and a constraint solver picks the combination that keeps the grid consistent. When the model is unsure, the intersections usually settle it.

Generation runs the same pieces backwards. Given a set of answer words, the generator lays out a valid grid, then asks the model to write clues that are specific enough to be fair.

## What I learned

- Constraint propagation does most of the heavy lifting. The model only needs to be good at ranking, not at being right on the first try.
- Async job queues matter even for a demo. Solving takes seconds, so the web app polls a job status endpoint instead of holding the request open.
- Clue quality is the hard part of generation and it is where better language models made the biggest difference.
