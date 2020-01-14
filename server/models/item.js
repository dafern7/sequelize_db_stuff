'use strict';
module.exports = (sequelize, DataTypes) => {
  const item = sequelize.define('item', {
    powerIn: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    powerOut: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    voltage: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    current: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    marketPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    SOC: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  });

  item.associate = (models) => {

    item.belongsTo(models.Device, {
      foreignKey: 'user_id',
      onDelete:'CASCADE'
    });
    // associations can be defined here
  };
  return item;
};