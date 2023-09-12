const {randomBytes} = require('crypto')
const format = require('pg-format')
const {default: migrate} = require('node-pg-migrate')
const pool = require('../pool')

class Context {
  static async build() {
    // Randomly generating a role name to connect to PG as
    const roleName = 'a' + randomBytes(4).toString('hex');

    // Connect to PG as usual
    await pool.connect({
      host: 'localhost',
      post: 5432,
      database: 'socialnetwork-test',
      user: 'leonlow',
      password: '',
    });

    // Create a new role aka 'username'
    await pool.query(
      format(
        'CREATE ROLE %I WITH LOGIN PASSWORD %L;',
        roleName,
        roleName // to prevent SQL injection, don't really need because not gonna happen in unit test
      )
    );

    // Create a schema with the same name, ensure the roleName has authorization to the schema
    await pool.query(
      format('CREATE SCHEMA %I AUTHORIZATION %I;', roleName, roleName)
    );

    // Disconnect entirely from PG
    await pool.close();

    // Run our migrations in the new schema
    await migrate({
      schema: roleName,
      direction: 'up',
      log: () => {},
      noLock: true, // don't lock database when running migrations
      dir: 'migrations',
      databaseUrl: {
        host: 'localhost',
        post: 5432,
        database: 'socialnetwork-test',
        user: roleName,
        password: roleName,
      },
    });

    // Connect to PG as the newly created role
    await pool.connect({
      host: 'localhost',
      post: 5432,
      database: 'socialnetwork-test',
      user: roleName,
      password: roleName,
    });

    return new Context(roleName)
  }

  constructor(roleName) {
    this.roleName = roleName
  }
}

module.exports = Context;
