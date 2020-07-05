"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("UserAccessControl", {
      userAccessControlID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_ID: {
        type: Sequelize.INTEGER
      },
      system_ID: {
        type: Sequelize.INTEGER
      },
      profile_ID: {
        type: Sequelize.INTEGER
      },
      menuOption: {
        type: Sequelize.STRING,
        defaultValue: '{"drawer": true, "miniVariant": false, "clipped": false}'
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("UserAccessControl");
  }
};
