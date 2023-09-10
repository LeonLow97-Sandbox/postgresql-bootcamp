# Simplifying Queries with Views

## View

- CTEs can be referred to only in the query they are attached to.
- Views are similar, but can be referred to in different queries in the future - they are persistent.
- Create a fake table that has rows from other tables.
- These can be exact rows as they exist on another table, or a computed value.
- Can reference the view in any place where we would normally reference a table.
- View doesn't actually create a new table or move data around.
- Doesn't have to be used for a union. Can compute absolutely any values.

```sql
-- Original way
SELECT username, COUNT(*)
FROM users
JOIN (
	SELECT user_id FROM photo_tags
	UNION ALL
	SELECT user_id FROM caption_tags
) AS tags ON tags.user_id = users.id
GROUP BY username
ORDER BY COUNT(*) DESC;

-- Create a view
CREATE VIEW tags AS (
	SELECT id, created_at, user_id, post_id, 'photo_tag' AS type
	FROM photo_tags
	UNION ALL
	SELECT id, created_at, user_id, post_id, 'caption_tag' AS type
	FROM caption_tags
);

SELECT username, COUNT(*)
FROM users
JOIN tags ON tags.user_id = users.id
GROUP BY username
ORDER BY COUNT(*) DESC;
```

## When to use a view?

```sql
-- show 10 most recent posts
CREATE VIEW recent_posts AS (
	SELECT *
	FROM posts
	ORDER BY created_at DESC
	LIMIT 10
);

-- get the usernames
SELECT username
FROM recent_posts
JOIN users ON users.id = recent_posts.user_id;
```

## Deleting or changing views

```sql
-- Changing a view
CREATE OR REPLACE VIEW recent_posts AS (
	SELECT *
	FROM posts
	ORDER BY created_at DESC
	LIMIT 15
);

-- Deleting a view
DROP VIEW recent_posts;
```

## List of views in PGAdmin4

- Database --> Schemas --> public --> Views

# Materialized Views

- **Materialized Views**: Query that gets executed only at very specific times, but the _results are saved_ and can be referenced _without rerunning the query_.
- **Views**: Query that gets executed every time you refer to it.
- Use materialized views only to rows / records that are not going to change very often.
    - *E.g., You are writing a query that takes twenty seconds to execute.  Even though the query gets executed many times per day, the results only change once per month.*
- Both views and materialized views wrap up a query. When you refer to a view, the query is executed. When you refer to a materialized view, you get back the results from when the materialized view was created or when it was last refreshed.

```sql
/**
    For each week, show the number of likes that posts and comments received.
    Use the post and comment created_at date, not when the like was received.
*/

-- Perform a 3-way LEFT JOIN (pretty slow query)
SELECT 
	date_trunc('week', COALESCE(posts.created_at, comments.created_at)) AS week,
	COUNT(posts.id) AS num_likes_for_posts,
	COUNT(comments.id) AS num_likes_for_comments
FROM likes
LEFT JOIN posts ON posts.id = likes.post_id
LEFT JOIN comments ON comments.id = likes.comment_id
GROUP BY week
ORDER BY week;

-- Materialized View (very fast)
CREATE MATERIALIZED VIEW weekly_likes AS (
	SELECT 
		date_trunc('week', COALESCE(posts.created_at, comments.created_at)) AS week,
		COUNT(posts.id) AS num_likes_for_posts,
		COUNT(comments.id) AS num_likes_for_comments
	FROM likes
	LEFT JOIN posts ON posts.id = likes.post_id
	LEFT JOIN comments ON comments.id = likes.comment_id
	GROUP BY week
	ORDER BY week
) WITH DATA; -- `DATA` to allow postgres to hold onto the results
SELECT * FROM weekly_likes;
```

## Updating Materialized View

```sql
DELETE FROM posts
WHERE created_at < '2010-02-01';

REFRESH MATERIALIZED VIEW weekly_likes;

SELECT * FROM weekly_likes;
```