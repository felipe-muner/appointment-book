"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Schedule", [
      {
        day: "2020-10-10",
        lesson_id: 1,
        teacher_id: 1,
        school_id: 1
      },
      {
        day: "2020-10-10",
        lesson_id: 2,
        teacher_id: 1,
        school_id: 1
      },
      {
        day: "2020-10-10",
        lesson_id: 3,
        teacher_id: 1,
        school_id: 1
      },
      {
        day: "2020-10-10",
        lesson_id: 4,
        teacher_id: 1,
        school_id: 1
      }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Schedule", null, {});
  }
};
