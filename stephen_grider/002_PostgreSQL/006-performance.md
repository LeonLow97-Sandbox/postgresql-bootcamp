# Performance with Postgres

- Take a look at how data is stored and accessed.
- Investigate how indexes are stored and used.
- Put these together to understand how queries are executed.

## Where does Postgres **store** data?

```sql
-- Directory where PostgreSQL is running from
SHOW data_directory;

-- Shows all the databases created in PostgreSQL
-- oid: Internal Identifier
SELECT oid, datname
FROM pg_database;

-- relname: table name, primary key, ...
-- can use `oid` to locate the exact data file in PostgreSQL directory
SELECT * FROM pg_class;
```

## Heaps, Blocks, Tuples

|Internals of PostgreSQL|Description|
|:-:|:-:|
|Heap or Heal File|File that contains all the data (rows) of a single table.|
|Tuple or Item|Individual row from the table|
|Block or Page|The heap file is divided into many different 'blocks' or 'pages'. Each page/block stores some number of rows and are 8kb in size regardless of how many items are stored inside. Each block stores some number of tuples.|

---
#### ChatGPT Description of Heaps, Blocks, Tuples

- `Heaps`: A heap is the underlying structure where table data is stored. It's a collection of pages, and each page can gold multiple rows of a table. The heap is where the actual data is stored, and various optimizations, like indexing, are applied on top of this heap structure to improve query performance.
- `Blocks`: A block typically refers to a fixed-size unit of data that the database uses for storage and retrieval. The term 'block' can be used interchangeably with 'page'. PostgreSQL's storage system operates on a block/page basis, and data is read from or written to these blocks.
- `Tuples`: A tuple is a term used to describe a single row of data within a table. Each tuple corresponds to a single record in the table. Tuples are stored within blocks/pages in the heap structure.
---