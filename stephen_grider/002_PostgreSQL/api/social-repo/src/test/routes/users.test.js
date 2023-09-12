const request = require('supertest');
const buildApp = require('../../app');
const UserRepo = require('../../repos/user-repo');
const pool = require('../../pool');

const { randomBytes } = require('crypto');
const { default: migrate } = require('node-pg-migrate');
const format = require('pg-format');

beforeAll(async () => {
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
});

afterAll(() => {
  return pool.close();
});

it('create a user', async () => {
  const startingCount = await UserRepo.count();

  await request(buildApp())
    .post('/users')
    .send({ username: 'testuser', bio: 'testbio' })
    .expect(200);

  const finishCount = await UserRepo.count();
  expect(finishCount - startingCount).toEqual(1);
});
