# Aggregating and Grouping

- `Grouping`:
  - Reduces many rows down to fewer rows.
  - Done by using the `GROUP BY` keyword.
  - Visualizing the result is key to use.
- `Aggregates`:
  - Reduces many values down to 1.
  - Done by using 'aggregate functions'.

## Group By

- `GROUP BY user_id`:
  - Find the set of all unique user_id's
  - Take each row and assign it to group based on its user_id
- Can only `SELECT` the `user_id`, not other rows because they are not included in the `GROUP BY`

```sql
SELECT user_id FROM comments
GROUP BY user_id;
```

<img src="../pics/group-by.png" />

## Aggregate Functions

| Aggregate Functions | Description                                                               |
| :-----------------: | ------------------------------------------------------------------------- |
|      `COUNT()`      | Returns the number of values in a group of values, EXCLUDES `NULL` values |
|     `COUNT(*)`      | INCLUDES `NULL` values                                                    |
|       `SUM()`       | Finds the **sum** of a group of numbers.                                  |
|       `AVG()`       | Finds the **average** of a group of numbers.                              |
|       `MIN()`       | Returns the **minimum** value from a group of numbers.                    |
|       `MAX()`       | Returns the **maximum** value from a group of numbers.                    |

```sql
SELECT COUNT(id) FROM comments;
SELECT SUM(id) FROM comments;
SELECT AVG(id) FROM comments;
SELECT MIN(id) FROM comments;
SELECT MAX(id) FROM comments;

SELECT MAX(id), contents FROM comments; -- this results in an aggregate function error
```

## Combining `GROUP BY` and Aggregates

<img src="../pics/group-by2.png" />

```sql
-- Counts the number of comments the user has made
SELECT user_id, COUNT(id) AS no_of_comments
FROM comments
GROUP BY user_id;
```

```sql
-- will count NULL values too instead of referencing a single column COUNT(user_id)
SELECT COUNT(*) FROM photos;
```

```sql
-- Find the number of comments for each photo
-- `comments` table: id, contents, user_id, photo_id
SELECT photo_id, COUNT(*)
FROM comments
GROUP BY photo_id;
```

## GROUP BY with JOIN

```sql
SELECT name, COUNT(*)
FROM books
JOIN authors ON authors.id = books.author_id
GROUP BY authors.name;
```

## Filtering Groups with `HAVING`

- `HAVING`: Filters the set of groups.

```sql
-- Find the number of comments for each photo
-- where the photo_id is less than 3 and
-- the photo has more than 2 comments.
SELECT photo_id, COUNT(*)
FROM comments
WHERE photo_id < 3
GROUP BY photo_id
HAVING COUNT(*) > 2;
```

```sql
-- Find the user_ids
-- where the user has commented on the first 50 photos and
-- the user added more than 20 comments on those photos
SELECT user_id, COUNT(*)
FROM comments
WHERE photo_id < 50
GROUP BY user_id
HAVING COUNT(*) > 20;
```

```sql
SELECT manufacturer, SUM(price*units_sold)
FROM phones
GROUP BY manufacturer
HAVING SUM(price*units_sold) > 2000000;
```