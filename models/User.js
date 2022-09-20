
'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    static associate(models) {
      users.hasMany(models.time_capsule_messages, {
        foreignKey: 'users_id',
        as: 'time_capsule_messages',
      });
    }
  };
  users.init({
    fullname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};