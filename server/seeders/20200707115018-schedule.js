"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Schedule", [
      {
        start: "2020-10-10 07:15:00",
        end: "2020-10-10 08:00:00",
        grade: "5-A",
        lesson_id: 1,
        teacher_id: 1,
        school_id: 1
      },
      {
        start: "2020-10-10 08:00:00",
        end: "2020-10-10 08:45:00",
        grade: "5-B",
        lesson_id: 2,
        teacher_id: 1,
        school_id: 1
      },
      {
        start: "2020-10-10 08:45:00",
        end: "2020-10-10 09:30:00",
        grade: "5-C",
        lesson_id: 3,
        teacher_id: 1,
        school_id: 1
      },
      {
        start: "2020-10-10 09:30:00",
        end: "2020-10-10 10:15:00",
        grade: "5-D",
        lesson_id: 4,
        teacher_id: 1,
        school_id: 1
      },

      {
        start: "2020-10-13 07:16:00",
        end: "2020-10-13 08:01:00",
        grade: "6-A",
        lesson_id: 5,
        teacher_id: 1,
        school_id: 1
      },
      {
        start: "2020-10-13 08:01:00",
        end: "2020-10-13 08:46:00",
        grade: "6-B",
        lesson_id: 6,
        teacher_id: 1,
        school_id: 1
      },
      {
        start: "2020-10-13 09:16:00",
        end: "2020-10-13 09:46:00",
        grade: "6-C",
        lesson_id: 7,
        teacher_id: 3,
        school_id: 1
      },
      {
        start: "2020-10-13 10:16:00",
        end: "2020-10-13 11:01:00",
        grade: "6-D",
        lesson_id: 8,
        teacher_id: 3,
        school_id: 1
      },

      {
        start: "2020-10-13 07:16:00",
        end: "2020-10-13 08:01:00",
        grade: "6-A",
        lesson_id: 9,
        teacher_id: 2,
        school_id: 2
      },
      {
        start: "2020-10-13 08:01:00",
        end: "2020-10-13 08:46:00",
        grade: "6-B",
        lesson_id: 10,
        teacher_id: 2,
        school_id: 2
      },
      {
        start: "2020-10-13 09:16:00",
        end: "2020-10-13 09:46:00",
        grade: "6-C",
        lesson_id: 11,
        teacher_id: 2,
        school_id: 2
      },
      {
        start: "2020-10-13 10:16:00",
        end: "2020-10-13 11:01:00",
        grade: "6-D",
        lesson_id: 12,
        teacher_id: 2,
        school_id: 2
      }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Schedule", null, {});
  }
};
