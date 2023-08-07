# Utility Operators, Keywords and Functions

## `GREATEST`

- `GREATEST` is a SQL function that takes multiple arguments and returns the highest value among them.

```sql
SELECT GREATEST(20, 678, 40, 200); -- 678

-- Compute the cost to ship each item
-- `cost_to_ship` is the maximum of (weight * $2) or $30
-- If cost_to_ship < $30, set cost_to_ship = $30
SELECT name, weight, GREATEST(30, 2 * weight) AS cost_to_ship
FROM products;
```

## `LEAST`

- `LEAST` is a function used to retrieve the smallest value from a list of expressions or column values.

```sql
SELECT LEAST(20, 678, 40, 200); -- 20

-- Example: All products are on sale.
-- Price is the least of the products price * 0.5 or $400
SELECT name, price, LEAST(price * 0.5, 400)
FROM products;
```

## `CASE`

- `CASE` in SQL is a conditional statement used to perform different actions based on specified conditions.

```sql
-- Print each product and its price, and print a
-- description of the price.
-- If the price > 600, then 'high'
-- If the price > 300, then 'medium'
-- Else, print 'cheap'
SELECT
	name,
  price,
  CASE
  	WHEN price > 600 THEN 'high'
    WHEN price > 300 THEN 'medium'
    ELSE 'cheap'
  END AS description
 FROM products;
```
