# Project Description
Boiler Plate for postgres+expressjs+netlify

## Cloud Enviroment
https://beexpressjs.netlify.app

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
npm run deploy
```

### Init sequelize

```sh
sequelize init
```

### Make Model and Migration

```sh
sequelize model:generate --name Users --attributes firstName:string,lastName:string,email:string,password:string
```

### Create Migration file 

```sh
sequelize migration:create --name alter_users_table
```

### Migrate Table

```sh
sequelize db:migrate
```

### Rollback Last Migration
```sh
sequelize db:migrate:undo
```

### Rollback Specific Migration File
```sh
sequelize db:migrate:undo --name 20220924161148-alter_users_table_isdeleted_null.js
```

### Documentation
- Import to Postman
https://www.getpostman.com/collections/7dda5f907db54b608825

## Source
- https://dev.to/richienabuk/setting-up-express-js-rest-api-postgres-and-sequelize-orm-with-es6-4m08
- https://echobind.com/post/a-guide-for-restful-apis-with-node-sequelize-postgres
- https://www.bezkoder.com/node-express-sequelize-postgresql/
- https://medium.com/techno101/crud-using-node-js-express-and-sequelize-82c10ef3b346
- https://paulreaney.medium.com/deploy-express-js-on-netlify-91cfaea39591
