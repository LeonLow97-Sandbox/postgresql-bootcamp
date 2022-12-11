# PostgreSQL Bootcamp

## Basics

- Create Database User
  - Login/Group Roles --> Right-click create
- Create Database
  - Database --> Create database
- Creating a Query Editor
  - Click on your database_name --> Query Tool

## CREATE DATABASE and DROP DATABASE

- `CREATE DATABASE database_name`
- `DROP DATABASE IF EXISTS database_name`

## `CREATE TABLE`

- `SERIAL` is like auto_increment
- Foreign key is used to link different table together.

```sql
CREATE TABLE movies (
	movie_id SERIAL PRIMARY KEY, -- SERIAL is like auto_increment
	movie_name VARCHAR(100) NOT NULL,
	movie_length INT,
	movie_lang VARCHAR(20),
	age_certificate VARCHAR(10),
	release_date DATE,
	director_id INT REFERENCES directors (director_id) -- Foreign key (REFERENCES table_name (foreign_table_column))
);
```

## `DROP TABLE`

- `DROP TABLE table_name`

# INSERT Query

## INSERT data into a table

```sql
INSERT INTO table_name (column1, column2)
VALUES ('value1', 'value2');

-- Insert multiple records
INSERT INTO table_name (column1, column2)
VALUES
('value1','value2'),
('value1','value2'),
('value1','value2');
```

## INSERT data with single quotes

```sql
INSERT INTO customers (first_name)
VALUES
('Bill''O Sullivan');
```

## INSERT data with returning rows

```sql
-- Returns the affected row that was inserted to the table
INSERT INTO customers (first_name)
VALUES ('LEONARD') RETURNING *;

-- Returns a single column value
INSERT INTO customers (first_name)
VALUES ('JOSEPH') RETURNING customer_id;
```

