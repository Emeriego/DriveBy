'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    static associate(models) {
      // Define association with Car
      // Location.hasMany(models.Car, {
      //   foreignKey: 'location_id',
      //   as: 'cars'
      // });
    }
  }
  Location.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Location',
  });
  return Location;
};