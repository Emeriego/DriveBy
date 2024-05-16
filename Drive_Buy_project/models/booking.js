'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      // Define association with User
      Booking.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });

      // Define association with Car
      Booking.belongsTo(models.Car, {
        foreignKey: 'car_id',
        as: 'car'
      });

      // Define association with Payment
      Booking.hasOne(models.Payment, {
        foreignKey: 'booking_id',
        as: 'payment'
      });
    }
  }
  Booking.init({
    user_id: DataTypes.INTEGER,
    car_id: DataTypes.INTEGER,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    total_price: DataTypes.DECIMAL,
    total_hours: DataTypes.INTEGER,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'Pending'
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Booking',
    timestamps: false, // Disable Sequelize's automatic timestamp fields
    createdAt: 'created_at', // Map created_at field to Sequelize's createdAt
    updatedAt: 'updated_at' // Map updated_at field to Sequelize's updatedAt
  });
  return Booking;
};