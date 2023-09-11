const app = require('./src/app.js');
const pool = require('./src/pool');

// no password because we use macOS postgres.app
pool
  .connect({
    host: 'localhost',
    post: 5432,
    database: 'socialnetwork',
    user: 'leonlow',
    password: '',
  })
  .then(() => {
    app().listen(3005, () => {
      console.log('Listening on port 3005!');
    });
  })
  .catch((err) => console.error(err));
