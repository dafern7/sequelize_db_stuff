'use strict';
module.exports = (sequelize, DataTypes) => {
  const Device = sequelize.define('Device', {
    title: {
    type: DataTypes.STRING,
    allowNull: false
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false
    } 
});


  Device.associate = (models) => {
    Device.hasMany(models.item, {
      foreignKey: 'user_id',
      as: 'Item',
    });
  };

  return Device;
};