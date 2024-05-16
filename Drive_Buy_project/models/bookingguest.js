'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookingGuest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BookingGuest.init({
    num_guests: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'BookingGuest',
  });
  return BookingGuest;
};