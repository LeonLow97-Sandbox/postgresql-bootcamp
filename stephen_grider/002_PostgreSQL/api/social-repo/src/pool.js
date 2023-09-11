const pg = require('pg');

// NORMALLY, we would create a pool like this:
// but it is difficult to do unit test this way
// const pool = new pg.Pool({
//     host: 'localhost',
//     port: 5432
// })

// module.exports = pool

// easier to let our connection pool to connect to another database server easily
// good for testing!
class Pool {
  _pool = null;

  connect(options) {
    this._pool = new pg.Pool(options);
    return this._pool.query('SELECT 1 + 1'); // to ensure there is a valid connection to postgres database, returns a promise
  }

  // close connection pool, disconnect from postgres database entirely
  close() {
    return this._pool.end()
  }

  // BIG SECURITY ISSUE HERE! REVISIT LATER
  query(sql) {
    return this._pool.query(sql)
  }
}

module.exports = new Pool();
