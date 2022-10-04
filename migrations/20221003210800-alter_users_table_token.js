'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Users',
      'token',
      {type:Sequelize.STRING}
    );
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'Users',
      'token',
      {type:Sequelize.STRING}
    );
  }
};
