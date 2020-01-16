'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => 
    queryInterface.createTable('items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      powerIn: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      powerOut: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      voltage: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      current: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      marketPrice: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      SOC: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      user_id: {
        type: Sequelize.STRING,
        onDelete: 'CASCADE',
        references: {
          model: 'Devices',
          key: 'title',
          as: 'user_id'
        }
      }
    }),

  down: (queryInterface/*, Sequelize*/) => 
  queryInterface.dropTable('items'),
};