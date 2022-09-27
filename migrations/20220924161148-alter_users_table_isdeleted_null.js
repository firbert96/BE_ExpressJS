'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'Users',
      'isDeleted',
      { type:Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:false
      }
    );
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'Users',
      'isDeleted',
      {type:Sequelize.BOOLEAN}
    );
  }
};
