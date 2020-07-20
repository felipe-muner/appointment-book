"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Functionality", [
      {
        father_id: null,
        name: "Teacher",
        action: "/teacher",
        icon: "mdi-card-account-details",
        system_id: 1,
        priority: 1,
        active: true
      },
      {
        father_id: null,
        name: "School",
        action: "/school",
        icon: "mdi-home-city",
        system_id: 1,
        priority: 1,
        active: true
      },
      {
        father_id: null,
        name: "Schedule",
        action: "/schedule",
        icon: "mdi-calendar-clock",
        system_id: 1,
        priority: 2,
        active: true
      },
      {
        father_id: null,
        name: "Action 4",
        action: "/",
        icon: "mdi-alert-octagram-outline",
        system_id: 1,
        priority: 3,
        active: true
      },
      {
        father_id: null,
        name: "Action 5",
        action: "/",
        icon: "mdi-alert-octagram-outline",
        system_id: 1,
        priority: 1,
        active: true
      },
      {
        father_id: null,
        name: "Action 6",
        action: "/",
        icon: "mdi-alert-octagram-outline",
        system_id: 1,
        priority: 1,
        active: true
      }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Functionality", null, {});
  }
};
