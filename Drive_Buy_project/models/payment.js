'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association with Booking
      Payment.belongsTo(models.Booking, {
        foreignKey: 'booking_id',
        as: 'booking'
      });
    }
  }
  Payment.init({
    booking_id: DataTypes.INTEGER,
    amount: DataTypes.FLOAT,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};