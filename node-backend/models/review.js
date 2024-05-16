'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      // Define association with User
      Review.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });

      // Define association with Car
      Review.belongsTo(models.Car, {
        foreignKey: 'car_id',
        as: 'car'
      });
    }
  }
  Review.init({
    user_id: DataTypes.INTEGER,
    car_id: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    review: DataTypes.TEXT,
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
    modelName: 'Review',
    timestamps: false, // Disable Sequelize's automatic timestamp fields
    createdAt: 'created_at', // Map created_at field to Sequelize's createdAt
    updatedAt: 'updated_at' // Map updated_at field to Sequelize's updatedAt
  });
  return Review;
};