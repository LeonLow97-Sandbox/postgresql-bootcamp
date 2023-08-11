# Basic Query Tuning

## Query Processing Pipeline

1. Parser: Ensure SQL query is a valid statement.
2. Rewrite: Decompose views into underlying table references.
3. Planner: Evaluates which plan is the fastest.
   - Look at users_username_idx then get users?
   - Fetch all users and search through them?
4. Execute: Runs the query and retrieves the records.

## `EXPLAIN` and `EXPLAIN ANALYZE`

- `EXPLAIN`: build a query plan and display info about it.
- `EXPLAIN ANALYZE`: build a query plan, run it and info about it.
- These are for benchmarking + evaluating queries, not for use in real data fetching. Just for performance evaluation.

<img src="../pics/explain_analyze.png" />

- "Hash Join (cost=8.31..1756.11 rows=11 width=81)"
  - `Hash Join`: How this node is generating data.
  - `cost=...`: Amount of processing power required for this step.
  - `rows=...`: A *guess* at how many rows this step will produce.
  - `width=...`: A *guess* at the average number of bytes of each row.

```sql
-- How PostgreSQL estimated rows and width
SELECT *
FROM pg_stats
WHERE tablename = 'users';
```