"use strict";

// const ProfileFunctionality = require("./ProfileFunctionality");

module.exports = (sequelize, DataTypes) => {
  const UserAccessControl = sequelize.define(
    "UserAccessControl",
    {
      userAccessControlID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      user_ID: DataTypes.INTEGER,
      system_ID: DataTypes.INTEGER,
      profile_ID: DataTypes.INTEGER,
      menuOption: DataTypes.STRING
    },
    {
      timestamps: false,
      freezeTableName: true
    }
  );
  UserAccessControl.associate = function(models) {
    // UserAccessControl.belongsTo(ProfileFunctionality, {
    //   foreignKey: "profile_ID"
    // });
  };

  return UserAccessControl;
};
