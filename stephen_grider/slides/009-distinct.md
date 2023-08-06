# Selecting `DISTINCT` records

# `SELECT DISTINCT`

- Retrieves unique values from a column, eliminating duplicates, and returns a result set containing only **distinct rows**.

```sql
SELECT DISTINCT department
FROM products

-- returns the number of distinct departments (works for 1 column)
SELECT COUNT(DISTINCT department)
FROM products

-- distinct on multiple columns (but cannot do `COUNT`)
SELECT DISTINCT department, name
FROM products;
```