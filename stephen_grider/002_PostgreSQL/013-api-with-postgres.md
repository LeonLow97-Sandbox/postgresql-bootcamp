# Connecting PostgreSQL from API

## Understanding Connection Pools

- Issue: A **client** can only be used for 1 query at a time. Only used a client when running **SQL Transactions**.
- Solution: A **pool** internally maintains server different clients that can be reused.
    - When a pool is created, it is not connected to postgres yet. We need a client to connect to postgres.