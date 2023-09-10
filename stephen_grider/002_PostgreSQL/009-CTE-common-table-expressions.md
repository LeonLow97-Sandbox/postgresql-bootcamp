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

## Recursive CTEs

- Very different from simple CTEs.
- Useful anytime you have a `tree` or `graph-type` data structure.
- Must use a `UNION` keyword - simple CTEs don't have a UNION.
- Recursive CTEs are very advanced, don't expect you to be able to write your own recursive CTEs, just understand that they exist.

```sql
/**
    1. Define the results and working tables
    2. Run the initial non-recursive statement, put the results
        into the results table and working table.
    3. Run the recursive statement replacing the table name 'countdown'
        with a reference to the working table.
    4. If recursive statement returns some rows, append them to the
        results table and run recursion again. Then throw everything in
        working table away and replace whatever we got from the recursive query.
    5. If recursive statement returns no rows, stop recursion.
 */

WITH RECURSIVE countdown(val) AS (
	SELECT 3 AS val -- Initial, Non-recursive query
	UNION
	SELECT val - 1 FROM countdown WHERE val > 1 -- Recursive query
)
SELECT * 
FROM countdown;

-- Output: 
3
2
1
```

## Real example of Recursive CTEs

- Instagram suggests who you may want to follow.

```sql
WITH RECURSIVE suggestions (leader_id, follower_id, depth) AS (
		SELECT leader_id, follower_id, 1 AS depth
		FROM followers
		WHERE follower_id = 1
	UNION
		SELECT followers.leader_id, followers. follower_id, depth + 1
		FROM followers
		JOIN suggestions ON suggestions.leader_id = followers.follower_id
		WHERE depth < 3
)
SELECT DISTINCT users.id, users.username
FROM suggestions
JOIN users ON users.id = suggestions.leader_id
WHERE depth > 1 -- depth = 1 are users that we are already following
LIMIT 30;
```