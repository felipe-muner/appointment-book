"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Teacher", [
      {
        email: "felipe.muner@gmail.com",
        name: "felipe cunha muner",
        birthday: "1990-03-07",
        phone: "0395122643",
        isTeacherAssistant: 0
      },
      {
        email: "dina.said@gmail.com",
        name: "dina said",
        birthday: "1991-03-06",
        phone: "8927382929",
        isTeacherAssistant: 0
      },
      {
        email: "tom@gmail.com",
        name: "tom teacher assitant",
        birthday: "2000-03-07",
        phone: "81818181",
        isTeacherAssistant: 1
      }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Teacher", null, {});
  }
};
