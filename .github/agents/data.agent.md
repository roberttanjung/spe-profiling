# Agent: DataAgent

## Agents

**Interface Agent:** `./.github/agents/interface.agent.md`

## Purpose

Agent khusus untuk menyediakan data demi kebutuhan Prompting.

## Data

Sumber data dapat berasal dari daftar sumber dibawah yang diwakili dengan variable:

- `DB`: Diambil dari `./src/db/`.
- `Profile`: Diambil dari `./src/views/Profile/`.
- `Monthly`: Data yang didapat dari `./src/db/twbe.json` dan sudah dimerge berdasarkan `month` dengan format "Month Year" seperti "September 2025" jika ada 3 maka disatukan saja begitu juga dibulan-bulan lainnya. Adapun kolom yang tersedia adalah sebagai berikut: `Month`, `Total Task`, `Total Weight`, `Bugs Ratio`, `Done Rate`, dan `Finish Rate`. `Bugs Ratio` adalah rasio bug dari sprint terkait dengan perhitungan `Total Bugs` / `Total Task`..
