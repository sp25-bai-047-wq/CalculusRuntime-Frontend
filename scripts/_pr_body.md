## Summary
- Expanded every study-guide quiz block from ~5 to exactly **15** unique on-topic MCQs across Calc AG, Multivariable, Linear Algebra, and Probability & Statistics (**82 blocks / 1230 questions**).
- Extracted banks into `src/data/*Quizzes.js` modules and wired guides through `GuideMcqSection` / `LaMcqSection` (removed filler inline MCQs).
- Answer letters balanced **A/B/C = 410/410/410 (33.3% each)**; KaTeX `throwOnError` check clean; section quiz gating still uses **80%** (`sectionQuizGates.js`).
- Did not touch `*PracticeBank.js`; LA/PS/MV certificate boosts left in place.

## Test plan
- [ ] `node _quiz_check.mjs` exits 0 (82 banks, 1230 Q, 0 failures)
- [ ] Spot-check one guide per subject: quiz shows 15 questions, score strip `0 / 15`, unlock/gate still works at 80%
- [ ] Confirm certificate boost sections still render on LA/PS/MV guides
- [ ] `npm run build` succeeds
