# Database-Side Validation and Constraints

## Validation

- Usually, our Web Server will do the validation before writing data in our database.

## Creating and Viewing Tables in pgadmin

```sql
CREATE TABLE products (
	id SERIAL PRIMARY KEY,
	name VARCHAR(40),
	department VARCHAR(40),
	price INTEGER,
	weight INTEGER
);

INSERT INTO products (name, department, price, weight)
VALUES
	('Shirt', 'Clothes', 20, 1);

INSERT INTO products (name, department, weight)
VALUES
	('Pants', 'Clothes', 3); -- price was inserted as NULL (this is an issue! we need some validation for price)
```

## Row-Level Validation

<img src="../pics/postgres_row_level_validation.png" alt="postgres row level validation" />

## Applying a NULL constraint to Table Column

```sql
-- When creating the table
CREATE TABLE products (
	id SERIAL PRIMARY KEY,
	name VARCHAR(40) NOT NULL,
	department VARCHAR(40) NOT NULL,
	price INTEGER NOT NULL,
	weight INTEGER
);

-- After the table was created
-- 1. Update/Delete rows where price is NULL
-- 2. ALTER the column
UPDATE products SET price = 9999 WHERE price IS NULL;

ALTER TABLE products
ALTER COLUMN price
SET NOT NULL;

-- Trying to INSERT NULL values
INSERT INTO products (name, department, weight)
VALUES ('Shoes', 'Clothes', 5); -- ERROR:  null value in column "price" of relation "products" violates not-null constraint
```
