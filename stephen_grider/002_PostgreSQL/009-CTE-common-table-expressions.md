# Common Table Expressions

- Defined with a `WITH` before the main query.
- CTEs create a named, temporary result set that can be used within the scope of a single SQL query.
- Simpler form used to make a query easier to understand.
- Recursive form used to write queries that are otherwise impossible to write.
    - A query that refers to itself to process hierarchical or tree-like data structures.

## Simple CTE

```sql
-- Show the username of users who tagged in a caption
-- or photo before January 7th, 2010. Also show the date
-- they were tagged.
SELECT username, tags.created_at
FROM users
JOIN (
	SELECT user_id, created_at FROM caption_tags
	UNION ALL
	SELECT user_id, created_at FROM photo_tags
) AS tags ON tags.user_id = users.id
WHERE tags.created_at < '2010-01-07';

-- CTE
WITH tags AS (
	SELECT user_id, created_at FROM caption_tags
	UNION ALL
	SELECT user_id, created_at FROM photo_tags
)
SELECT username, tags.created_at
FROM users
JOIN tags ON tags.user_id = users.id
WHERE tags.created_at < '2010-01-07';
```

