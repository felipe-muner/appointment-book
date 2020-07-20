"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("School", {
      schoolID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      neighborhood: {
        type: Sequelize.STRING
      },
      mondayMorning: {
        type: Sequelize.INTEGER
      },
      mondayMorningTime: {
        type: Sequelize.TIME
      },
      mondayAfternoon: {
        type: Sequelize.INTEGER
      },
      mondayAfternoonTime: {
        type: Sequelize.TIME
      },
      tuesdayMorning: {
        type: Sequelize.INTEGER
      },
      tuesdayMorningTime: {
        type: Sequelize.TIME
      },
      tuesdayAfternoon: {
        type: Sequelize.INTEGER
      },
      tuesdayAfternoonTime: {
        type: Sequelize.TIME
      },
      wednesdayMorning: {
        type: Sequelize.INTEGER
      },
      wednesdayMorningTime: {
        type: Sequelize.TIME
      },
      wednesdayAfternoon: {
        type: Sequelize.INTEGER
      },
      wednesdayAfternoonTime: {
        type: Sequelize.TIME
      },
      thursdayMorning: {
        type: Sequelize.INTEGER
      },
      thursdayMorningTime: {
        type: Sequelize.TIME
      },
      thursdayAfternoon: {
        type: Sequelize.INTEGER
      },
      thursdayAfternoonTime: {
        type: Sequelize.TIME
      },
      fridayMorning: {
        type: Sequelize.INTEGER
      },
      fridayMorningTime: {
        type: Sequelize.TIME
      },
      fridayAfternoon: {
        type: Sequelize.INTEGER
      },
      fridayAfternoonTime: {
        type: Sequelize.TIME
      },
      saturdayMorning: {
        type: Sequelize.INTEGER
      },
      saturdayMorningTime: {
        type: Sequelize.TIME
      },
      saturdayAfternoon: {
        type: Sequelize.INTEGER
      },
      saturdayAfternoonTime: {
        type: Sequelize.TIME
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("School");
  }
};
