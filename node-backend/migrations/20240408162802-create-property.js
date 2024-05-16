'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Properties', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nightly_price: {
        type: Sequelize.FLOAT
      },
      property_name: {
        type: Sequelize.STRING
      },
      num_guests: {
        type: Sequelize.INTEGER
      },
      num_beds: {
        type: Sequelize.INTEGER
      },
      num_bedrooms: {
        type: Sequelize.INTEGER
      },
      num_bathrooms: {
        type: Sequelize.INTEGER
      },
      is_guest_favourite: {
        type: Sequelize.BOOLEAN
      },
      description: {
        type: Sequelize.STRING
      },
      address_line_1: {
        type: Sequelize.STRING
      },
      address_line_2: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Properties');
  }
};