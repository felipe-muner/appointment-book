"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("User", [
      {
        email: "felipe.muner@gmail.com",
        password: await bcrypt.hash("12345678", 10),
        name: "Felipe Cunha Muner",
        birthday: "1990-03-07"
      },
      {
        email: "felipe.muner2@gmail.com",
        password: await bcrypt.hash("12345678", 10),
        name: "Felipe Cunha Muner 2",
        birthday: "1990-03-07"
      }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("User", null, {});
  }
};

// module.exports = {
// up: (queryInterface, Sequelize) => {
/*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
// },

// down: (queryInterface, Sequelize) => {
/*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
// }
// };
