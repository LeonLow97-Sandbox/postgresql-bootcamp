# A look at Indexes for Performance

- When we perform a `SELECT` query, we are loading up data from the Heap File on Hard Drive (HD) with all the blocks to the Memory(RAM), this could be costly in terms of performance. PostgreSQL needs to retrieve the required data from the storage (usually the heap file) and load it into memory (RAM) for processing.

## Full Table Scan

- Occurs when PostgreSQL reads all rows from a table, either because there's no suitable index to use for optimization or because the query's nature demands it.
- Frequently (but not always) poor performance.
- Full Table Scan can be resource-intensive and result in slower query performance, especially for large tables, as every row needs to be read from the hard drive (disk) and loaded into memory (RAM).

## What is an Index?

<img src="../pics/indexing.png" />

- Index is a data structure that efficiently tells us what block/index a record is stored at.
- Provides a way to quickly look up rows based on the values in *specific columns*.

