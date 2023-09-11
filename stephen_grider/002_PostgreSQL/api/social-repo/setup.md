# Installation steps

1. `npm init -y`
2. `npm install node-pg-migrate pg`
3. Add to `package.json`

```json
"scripts": {
  "migrate": "node-pg-migrate"
},
```

4. `npm run migrate create table comments`
5. `npm run migrate create rename contents to body`
6. `npm install express pg`

## Killing port 5432 for any postgres running instance

1. `sudo lsof -i :5432`
2. `sudo kill <PID>`

## Migration Up and Down

- Make sure to create database `socialnetwork`
- `DATABASE_URL=postgres://leonlow@localhost:5432/socialnetwork npm run migrate up`
