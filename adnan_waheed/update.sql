-- UPDATE data to a table
/*
UPDATE tablename
SET columnname = 'new_value'
WHERE columnname = 'value';
*/

SELECT * FROM customers;

-- Update single column
UPDATE customers 
SET email = 'leonlow@email.com'
WHERE customer_id = 2;

-- Update multiple records
UPDATE customers
SET 
email = 'LEONARD@email.com',
age = 30
WHERE customer_id = 6;

-- Updateing a row and using the RETURNING to get updated rows
UPDATE customers
SET
last_name = 'LOW',
email = 'leonard@email.com'
WHERE customer_id = 6
RETURNING *;

-- UPDATE ALL records in a table
-- Update with no WHERE clause
UPDATE customers
SET is_enable = 'Y';
















