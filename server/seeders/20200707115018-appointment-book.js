"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("AppointmentBook", [
      {
        teacher_ID: 2,
        school_ID: 3
      },
      {
        teacher_ID: 2,
        school_ID: 3
      },
      {
        teacher_ID: 1,
        school_ID: 2
      },
      {
        teacher_ID: 1,
        school_ID: 2
      },
      {
        teacher_ID: 3,
        school_ID: 2
      },
      {
        teacher_ID: 3,
        school_ID: 2
      }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("AppointmentBook", null, {});
  }
};
