"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("AppointmentBook", [
      {
        startDate: "2020-07-08 07:30:00",
        endDate: "2020-07-08 10:30:00",
        teacher_id: 2,
        school_id: 3
      },
      {
        startDate: "2020-07-08 02:00:00",
        endDate: "2020-07-08 04:30:00",
        teacher_id: 2,
        school_id: 3
      },
      {
        startDate: "2020-07-08 02:00:00",
        endDate: "2020-07-08 04:30:00",
        teacher_id: 1,
        school_id: 2
      },
      {
        startDate: "2020-07-08 02:00:00",
        endDate: "2020-07-08 04:30:00",
        teacher_id: 1,
        school_id: 2
      },
      {
        startDate: "2020-07-08 02:00:00",
        endDate: "2020-07-08 04:30:00",
        teacher_id: 3,
        school_id: 2
      },
      {
        startDate: "2020-07-08 02:00:00",
        endDate: "2020-07-08 04:30:00",
        teacher_id: 3,
        school_id: 2
      }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("AppointmentBook", null, {});
  }
};
