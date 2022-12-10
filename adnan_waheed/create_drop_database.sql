-- DROP DATABASE
DROP DATABASE IF EXISTS database_name;

/*
1. Only superusers and the database owner can execute the DROP DATABASE statement.
2. Be careful when you try to use anything starting with 'DROP'
*/

-- 1. Create a sample database called 'db_test'

CREATE DATABASE db_test;

-- 2. Drop the database 'db_test'

DROP DATABASE IF EXISTS db_test;

