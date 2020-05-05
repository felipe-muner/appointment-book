"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("SystemProfile", [
      {
        name: "CEO",
        system_id: "1"
      },
      {
        name: "Manager",
        system_id: "1"
      },
      {
        name: "Seller",
        system_id: "1"
      },
      {
        name: "CEO 2",
        system_id: "2"
      },
      {
        name: "Manager 2",
        system_id: "2"
      },
      {
        name: "Seller 2",
        system_id: "2"
      },
      {
        name: "CEO 3",
        system_id: "3"
      },
      {
        name: "Manager 3",
        system_id: "3"
      },
      {
        name: "Seller 3",
        system_id: "3"
      }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("SystemProfile", null, {});
  }
};
