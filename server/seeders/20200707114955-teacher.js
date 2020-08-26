"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Teacher", [
      {
        email: "felipe.muner@gmail.com",
        name: "felipe cunha muner",
        birthday: "1990-03-07",
        phone: "0395122643",
        salary: 1200,
        workDays: '["1", "2", "3", "4", "5", "6"]',
        isTeacherAssistant: 0
      },
      {
        email: "dina.said@gmail.com",
        name: "dina said",
        birthday: "1991-03-06",
        phone: "8927382929",
        salary: 1200,
        workDays: '["1", "2", "3", "4", "5"]',
        isTeacherAssistant: 0
      },
      {
        email: "tom@gmail.com",
        name: "tom teacher assitant",
        birthday: "2000-03-07",
        phone: "81818181",
        salary: 400,
        workDays: '["1", "2", "3"]',
        isTeacherAssistant: 1
      }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Teacher", null, {});
  }
};
