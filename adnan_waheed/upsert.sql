-- USING UPSERT
/*
1.  The idea is that when you insert a new row into the table, PostgreSQL will update the row if it already exists,
	otherwise, it will insert the new row. Combination of update or insert.

2. Syntax
	INSERT INTO table_name (column_list)
	VALUES(value_list)
	ON CONFLICT target action;

3. for 'action'
	ON CONFLICT

	DO NOTHING							means do nothing if the row already exists in the table.
	DO UPDATE SET column1 = value1		update some fields in the table
	WHERE condition
	
4. Similar to INSERT INTO...IF NOT EXIST
*/

CREATE TABLE t_tags (
	id SERIAL PRIMARY KEY,
	tag text UNIQUE,
	update_date TIMESTAMP DEFAULT NOW()
);

-- insert some sample data
INSERT INTO t_tags (tag) VALUES
('Pen'),
('Pencil');

SELECT * FROM t_tags;

-- "2022-12-11 21:02:47.688809"
-- "2022-12-11 21:02:47.688809"

-- INSERT a record, ON CONFLICT
INSERT INTO t_tags (tag)
VALUES ('Pen')
ON CONFLICT (tag)
DO NOTHING;

-- INSERT a record, ON CONFLICT set new values
-- EXCLUDED.field_name: set the new value of the record based on the provided value.
INSERT INTO t_tags (tag)
VALUES ('Pen')
ON CONFLICT (tag)
DO 
	UPDATE SET 
	tag = EXCLUDED.tag,
	update_date = NOW();









