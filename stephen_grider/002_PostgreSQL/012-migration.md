# Managing Database Design with Schema Migrations

- Making changes to your database structure.
- Important points:
  1. Changes to the DB structure and changes to the clients need to be made at precisely the same time.
  2. When working with other engineers, we need a really easy way to tie the structure of our database to our code.
- **Schema Migration File**: Code that describes a precise change to make to the database.

## Migration File

<img src="../pics/migration1.png" width="75%" />
<img src="../pics/migration2.png" width="75%" />
<img src="../pics/migration3.png" width="75%" />
<img src="../pics/migration4.png" width="75%" />
<img src="../pics/migration5.png" width="75%" />
<img src="../pics/migration6.png" width="75%" />
<img src="../pics/migration7.png" width="75%" />
<img src="../pics/migration9.png" width="75%" />
<img src="../pics/migration8.png" width="75%" />

## Schema Migration and Data Migration

- Not recommended to run schema migration and data migration in 1 step. Could be a long operation and we might lose some data in the process.
- Migrations should be placed inside a SQL **transaction** so that we can rollback if anything happens.

<img src="../pics/data-migration1.png" width="75%" />
<img src="../pics/data-migration2.png" width="75%" />
<img src="../pics/data-migration3.png" width="75%" />

## Different Approaches with Migration from API to PostgreSQL

<img src="../pics/data-migration5.png" width="30%" />
<img src="../pics/data-migration6.png" width="75%" />
<img src="../pics/data-migration7.png" width="75%" />