require('dotenv').config();
const {
    DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME,
    DB_HOST_TEST,DB_USERNAME_TEST, DB_PASSWORD_TEST, DB_NAME_TEST,
    DB_HOST_PROD,DB_USERNAME_PROD, DB_PASSWORD_PROD, DB_NAME_PROD,
} = process.env;
console.log('DB_HOST',DB_HOST);
module.exports = {
  dev: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: 'postgres'
  },
  test: {
    username: DB_USERNAME_TEST,
    password: DB_PASSWORD_TEST,
    database: DB_NAME_TEST,
    host: DB_HOST_TEST,
    dialect: 'postgres'
  },
  prod: {
    username: DB_USERNAME_PROD,
    password: DB_PASSWORD_PROD,
    database: DB_NAME_PROD,
    host: DB_HOST_PROD,
    dialect: 'postgres'
  }
}
