# Filtering

## Filtering Rows with `WHERE`

```sql
SELECT name, area FROM cities
WHERE area > 4000;
```

## Comparison Math Operators

| Comparison Operators | Description                           |
| :------------------: | ------------------------------------- |
|         `=`          | Equal to                              |
|         `>`          | Greater than                          |
|         `<`          | Less than                             |
|         `>=`         | Greater than or equal to              |
|         `<=`         | Less than or equal to                 |
|         `<>`         | Not equal                             |
|         `!=`         | Not equal                             |
|         `IN`         | Is the value present in a list?       |
|       `NOT IN`       | Is the value _not_ present in a list? |
|      `BETWEEN`       | Is the value between 2 other values?  |

```sql
SELECT name, area FROM cities WHERE area <> 4000;

SELECT name, area FROM cities WHERE area BETWEEN 2000 AND 4000;
SELECT name, area FROM cities WHERE name IN ('Delhi', 'Shanghai');
SELECT name, area FROM cities WHERE name NOT IN ('Delhi', 'Shanghai');
SELECT name, area FROM cities WHERE area NOT IN (3043, 8223);
```

## Calculations in `WHERE` clause

```sql
SELECT name, population/area AS density
FROM cities
WHERE population/area > 6000;
```

## Updating Rows

```sql
UPDATE cities SET population = 39505000 WHERE name = 'Tokyo';
```

## Deleting Rows

```sql
DELETE FROM cities WHERE name = 'Tokyo';
```