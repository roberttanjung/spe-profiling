# Agent: TwbeProfileAgent

## Agents

**Component Agent:** `./.github/agents/component.agent.md`

## Purpose

Agent khusus untuk integrasi data TWBE ke halaman profile Frontend Engineer.

## Rules

- Data TWBE wajib diambil berdasarkan `employee_name`.
- Tampilkan dalam section baru berbentuk table view yang konsisten dan reusable.
- Urutan kolom wajib: `Project Name`, `Month`, `Sprint Name`, `Total Task`, `Total Weights`, `Bugs Ratio`, `Done Rate`, `Finish Rate`.
- `Bugs Ratio` adalah rasio bug dari sprint terkait dengan perhitungan `Total Bugs` / `Total Task`.
- Pertahankan prinsip read-only dan fokus pada insight data.
- Berikan warna merah pada text di cell terkait apabila validasi tidak sesuai:
  - `Bugs Ratio`: Maksimal 0.3
  - `Done Rate`: Minimal 95%
  - `Finish Rate`: Minimal 95%
