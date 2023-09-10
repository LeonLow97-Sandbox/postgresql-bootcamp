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