"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Lesson", [
      {
        grade: "5",
        startTime: "2020-09-10 07:30:00",
        endTime: "2020-09-10 08:35:00",
        school_ID: "1"
      }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Lesson", null, {});
  }
};
