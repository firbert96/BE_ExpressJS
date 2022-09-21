# Project Description
Boiler Plate for postgres+expressjs+vuejs+netlify

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Run Production

```sh
npm install
```

### Init sequelize

```sh
sequelize init
```

### Make Model and Migration

```sh
sequelize model:generate --name Users --attributes firstName:string,lastName:string,email:string,password:string
```

### Migrate Table

```sh
sequelize db:migrate
```

## Source
- https://dev.to/richienabuk/setting-up-express-js-rest-api-postgres-and-sequelize-orm-with-es6-4m08
- https://echobind.com/post/a-guide-for-restful-apis-with-node-sequelize-postgres
- https://www.bezkoder.com/node-express-sequelize-postgresql/
- https://medium.com/techno101/crud-using-node-js-express-and-sequelize-82c10ef3b346