'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    static associate(models) {
      // Define association with Booking
      Car.hasMany(models.Booking, {
        foreignKey: 'car_id',
        as: 'bookings'
      });

      // Define association with Category
      Car.belongsTo(models.Category, {
        foreignKey: 'category_id',
        as: 'category'
      });

      // Define association with User
      Car.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
    }
  }
  Car.init({
    brand: DataTypes.STRING,
    model: DataTypes.STRING,
    color: {
      type: DataTypes.STRING,
      defaultValue: 'black'
    },
    img: {
      type: DataTypes.STRING,
    },
    price: DataTypes.DECIMAL,
    category_id: DataTypes.INTEGER,
    location: {
      type: DataTypes.STRING,
      defaultValue: 'No. 5, Freedom Street'
    },
    city: {
      type: DataTypes.STRING,
      defaultValue: 'Lagos'
    },
    power: {
      type: DataTypes.STRING,
      defaultValue: '2000cc'
    },
    condition: {
      type: DataTypes.STRING,
      defaultValue: 'Good'
    },
    user_id: DataTypes.INTEGER,
    numReviews: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    rating: {
      type: DataTypes.INTEGER,
      defaultValue: 0
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
    modelName: 'Car',
    timestamps: false, // Disable Sequelize's automatic timestamp fields
    createdAt: 'created_at', // Map created_at field to Sequelize's createdAt
    updatedAt: 'updated_at' // Map updated_at field to Sequelize's updatedAt
  });
  return Car;
};