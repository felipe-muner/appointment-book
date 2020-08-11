"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Teacher", {
      teacherID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      name: {
        type: Sequelize.STRING
      },
      birthday: {
        type: Sequelize.DATE
      },
      phone: {
        type: Sequelize.STRING
      },
      salary: {
        type: Sequelize.DECIMAL(10,2)
      },
      isTeacherAssistant: {
        type: Sequelize.BOOLEAN
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Teacher");
  }
};
