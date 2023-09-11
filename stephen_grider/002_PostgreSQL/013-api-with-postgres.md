# Connecting PostgreSQL from API

## Understanding Connection Pools

- Issue: A **client** can only be used for 1 query at a time. Only used a client when running **SQL Transactions**.
- Solution: A **pool** internally maintains server different clients that can be reused.
  - When a pool is created, it is not connected to postgres yet. We need a client to connect to postgres.

## Repository Pattern

- Can be implemented as an object with plain functions, as an instance of a class, as a class with static methods, anything.
- One center point for accessing the database with e.g., User Repository

|  Function  | Goal                                                        |
| :--------: | ----------------------------------------------------------- |
|   `find`   | Return an array of objects, each object representing a user |
| `findById` | Find a user with the provided ID                            |
|  `insert`  | Add a user with some provided properties                    |
|  `update`  | Update a user with the provided ID                          |
|  `delete`  | Delete the user with the provided ID                        |

## SQL Injection

- SQL Injection is possible with the code below.
- NEVER directly concatenate user-provided input into a SQL Query.
- There are a variety of safe ways to get user-provided values into a string.

```js
// WARNING: BIG SECURITY ISSUE!
const { rows } = await pool.query(`
    SELECT * FROM users WHERE id = ${id};
`);

// NEVER DO THIS TOO!!
'SELECT * FROM users WHERE id = ' + id;
```

- If a GET request is made like this `http://localhost:3005/users/1;DROP TABLE users;`,
our application extracts the URL params as `1;DROP TABLE users;`
    - Our query then runs as `SELECT * FROM users WHERE id = 1;DROP TABLE users;`
    - We dropped table users! That is a big security issue with SQL Injection!

## Handling SQL Injection with Prepared Statements

- Add code to 'sanitize' user-provided values to our app.
- Rely on Postgres to sanitize values for us.

---
#### Option 1: Relying on Postgres to sanitize values for us

- Downside: can only use prepared statement when we are trying to substitute values to a query.

1. Create a `prepared` statement
    - `SELECT * FROM users WHERE id = $1;`
    - Values: ['127']
    ```sql
    -- what pg will be running
    PREPARE random_name (string) AS
        SELECT *
        FROM users
        WHERE id = $1;
    ```
2. Execute the prepared statement. Postgres strictly understands that theres are **values** that will be placed into the **queries**. Cannot pass **queries** itself, thus we cannot pass something like `DROP TABLE users;`
    ```sql
    EXECUTE random_name('127');
    ```
---
#### Option 2