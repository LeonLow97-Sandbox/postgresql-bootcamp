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