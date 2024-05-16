'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      checkin_date: {
        type: Sequelize.DATE
      },
      checkout_date: {
        type: Sequelize.DATE
      },
      nightly_price: {
        type: Sequelize.FLOAT
      },
      service_fee: {
        type: Sequelize.FLOAT
      },
      cleaning_fee: {
        type: Sequelize.FLOAT
      },
      total_price: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bookings');
  }
};