'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      // Define association with Car
      Category.hasMany(models.Car, {
        foreignKey: 'category_id',
        as: 'cars'
      });
    }
  }
  Category.init({
    name: DataTypes.STRING,
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
    modelName: 'Category',
    timestamps: false, // Disable Sequelize's automatic timestamp fields
    createdAt: 'created_at', // Map created_at field to Sequelize's createdAt
    updatedAt: 'updated_at' // Map updated_at field to Sequelize's updatedAt
  });
  return Category;
};