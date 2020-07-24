"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Lesson", [
      {
        day: "Monday",
        grade: "5-A",
        startTime: "07:15:00",
        endTime: "08:00:00",
        school_ID: "1"
      },
      {
        day: "Monday",
        grade: "5-B",
        startTime: "08:00:00",
        endTime: "08:45:00",
        school_ID: "1"
      },
      {
        day: "Monday",
        grade: "5-C",
        startTime: "08:45:00",
        endTime: "09:30:00",
        school_ID: "1"
      },
      {
        day: "Monday",
        grade: "5-D",
        startTime: "09:30:00",
        endTime: "10:15:00",
        school_ID: "1"
      },
      {
        day: "Tuesday",
        grade: "6-A",
        startTime: "07:16:00",
        endTime: "08:01:00",
        school_ID: "1"
      },
      {
        day: "Tuesday",
        grade: "6-B",
        startTime: "08:01:00",
        endTime: "08:46:00",
        school_ID: "1"
      },
      {
        day: "Tuesday",
        grade: "6-C",
        startTime: "09:16:00",
        endTime: "09:46:00",
        school_ID: "1"
      },
      {
        day: "Tuesday",
        grade: "6-D",
        startTime: "10:16:00",
        endTime: "11:01:00",
        school_ID: "1"
      }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Lesson", null, {});
  }
};
