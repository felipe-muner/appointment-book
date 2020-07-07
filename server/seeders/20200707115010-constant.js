"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Constant", [
      {
        name: "Teacher",
        value: "9"
      },
      {
        name: "Teacher Assistant",
        value: "3"
      }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Constant", null, {});
  }
};
