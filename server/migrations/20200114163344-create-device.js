'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => 
    queryInterface.createTable('Devices', {
      title: {
        type: Sequelize.STRING,
        primaryKey:true,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    }),

  down: (queryInterface /*, Sequelize*/) => queryInterface.dropTable('Devices'),

};