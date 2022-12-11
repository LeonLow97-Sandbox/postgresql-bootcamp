CREATE TABLE customers (
	customer_id SERIAL PRIMARY KEY,
	first_name VARCHAR(50),
	last_name VARCHAR(50),
	email VARCHAR(150),
	age INT
);

SELECT * FROM customers;

-- Insert data into a table
/*
INSERT INTO table_name (column1, column2)
VALUES ('value1', 'value2');
*/

INSERT INTO customers (first_name, last_name, email, age) VALUES ('Adnan', 'Waheed', 'a@email.com', 40);

-- INSERT MULTIPLE RECORD INTO A TABLE
-- Separate data with ',' to add multiple insert record into a table
/*
INSERT INTO table_name (column1, column2)
VALUES
('value1','value2'),
('value1','value2'),
('value1','value2');
*/

INSERT INTO customers (first_name, last_name)
VALUES
('LEON', 'LOW'),
('JOHN','ADAMS'),
('LINDA','ABE');

-- INSERT A DATA WITH QUOTES
-- E.g., "Bill'O Sullivan"

INSERT INTO customers (first_name)
VALUES
('Bill''O Sullivan');

-- Use 'RETURNING' to get info on return rows
-- Returns the affected row that was inserted to the table
INSERT INTO customers (first_name)
VALUES ('LEONARD') RETURNING *;

-- Returns a single column value
INSERT INTO customers (first_name)
VALUES ('JOSEPH') RETURNING customer_id;












