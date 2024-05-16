'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TempUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TempUser.init({
    phoneNumber: DataTypes.STRING,
    verificationCode: DataTypes.STRING,
    expirationTime: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'TempUser',
  });
  return TempUser;
};