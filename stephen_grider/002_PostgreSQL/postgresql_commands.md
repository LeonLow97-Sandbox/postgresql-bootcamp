# PostgreSQL Commands

# `COALESCE`

```sql
SELECT COALESCE(16, NULL); -- 16
SELECT COALESCE(NULL, 16); -- 16

SELECT COALESCE (4::BOOLEAN::INTEGER, 0) -- 1(4 is valid)

SELECT (NULL::BOOLEAN::INTEGER) -- [null]

-- Validation check
ADD CHECK of (
    COALESCE((post_id)::BOOLEAN::INTEGER, 0)
    +
    COALESCE((comment_id)::BOOLEAN::INTEGER, 0)
) = 1
```