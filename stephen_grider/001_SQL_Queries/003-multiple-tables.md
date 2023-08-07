# Working with Multiple Tables

## Database Design of Instagram

- Profile for a user
- Users have followers and can follow other users
- List of photos
- Users can like a photo
- List of comments, each created by a user

<img src="../pics/database-design-instagram.png" />

## One-to-Many and Many-to-One Relationship

- One-to-Many
  - A user _has many_ photos
  - A photo _has many_ comments
- Many-to-One
  - A photo _has one_ user
  - A comment _has one_ photo

## One-to-One and Many-to-Many Relationship

- One-to-One
  - A boat has one captain, and vice versa.
  - A company has one CEO, and vice versa.
- Many-to-Many
  - A student has many classes, and vice versa.
  - A player has many basketball matches, and vice versa.

## Primary Keys and Foreign Keys

- Primary Key: Uniquely identifies this record in the table
- Foreign Key:
  - Identifies a record (usually in another table) that this row is associated with.
  - The 'many' side of the relationship gets the foreign key column.

|                      Primary Keys                      |                       Foreign Keys                        |
| :----------------------------------------------------: | :-------------------------------------------------------: |
|       Each row in every table has 1 primary key        |   Rows only have this if they belong to another record    |
| No other row in the same table can have the same value | Many rows in the same table can have the same foreign key |
|              99% of the time called `id`               |    Name varies, usually called something like `xyz_id`    |
|              Either an integer or a UUID               |  Exactly equal to the primary key of the referenced row   |
|                   Will never change                    |          Will change if the relationship changes          |

## Auto-Generated IDs

- `SERIAL`: auto-generated integer.

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50)
);
```

## Foreign Key

- Cannot insert foreign key data that does not exist, _violates foreign key constraint_.
- Can insert a foreign key data of _NULL_.

```sql
CREATE TABLE photos (
  	id SERIAL PRIMARY KEY,
  	url VARCHAR(200),
 	user_id INTEGER REFERENCES users(id) -- FOREIGN KEY
);
```

```sql
-- Find all the photos created by user_id = 4
SELECT * FROM photos WHERE user_id = 4;

-- List all photos with details about the associated user for each
SELECT url, username FROM photos
JOIN users ON users.id = photos.user_id;
```

## Constraints around deletion of foreign key data

- What happens if you try to delete a user when a photo is still referencing it?

|    On Delete Option     | Description                                                            |
| :---------------------: | ---------------------------------------------------------------------- |
|  `ON DELETE RESTRICT`   | Throw an error                                                         |
|  `ON DELETE NO ACTION`  | Throw an error                                                         |
|   `ON DELETE CASCADE`   | Delete the photo too                                                   |
|  `ON DELETE SET NULL`   | Set the 'user_id' of the photo to `NULL`                               |
| `ON DELETE SET DEFAULT` | Set the 'user_id' of the photo to a default value, if one is provided. |

```sql
CREATE TABLE photos (
    id SERIAL PRIMARY KEY,
    url VARCHAR(200),
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE photos (
    id SERIAL PRIMARY KEY,
    url VARCHAR(200),
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL
);
```
