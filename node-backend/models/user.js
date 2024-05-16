'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) { 
      // Define association with Booking
      User.hasMany(models.Booking, {
        foreignKey: 'user_id',
        as: 'bookings'
      });

      // Define association with Car
      User.hasMany(models.Car, {
        foreignKey: 'user_id',
        as: 'cars'
      });

      // Define association with Message
      User.hasMany(models.Message, {
        foreignKey: 'sender_id',
        as: 'sentMessages'
      });

      User.hasMany(models.Message, {
        foreignKey: 'receiver_id',
        as: 'receivedMessages'
      });
    }
  }

  User.init({
    email: {
      type: DataTypes.STRING,
      unique: true // Ensure email is unique
    },
    username: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    password: DataTypes.STRING,
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    is_staff: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    is_superuser: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    date_joined: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    last_login: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeSave: (user, options) => {
        user.fullName = `${user.firstname} ${user.lastname}`;
      }
    }
  });
  
  return User;
};