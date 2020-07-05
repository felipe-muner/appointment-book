"use strict";
module.exports = (sequelize, DataTypes) => {
  const ProfileFunctionality = sequelize.define(
    "ProfileFunctionality",
    {
      profileFunctionalityID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      profile_ID: DataTypes.INTEGER,
      functionality_ID: DataTypes.INTEGER,
      canInsert: DataTypes.BOOLEAN,
      canUpdate: DataTypes.BOOLEAN,
      canDelete: DataTypes.BOOLEAN
    },
    {
      timestamps: false,
      freezeTableName: true
    }
  );
  ProfileFunctionality.associate = function(models) {
    ProfileFunctionality.belongsTo(models.Functionality, {
      foreignKey: "functionality_ID",
      targetKey: "functionalityID"
    });
  };

  return ProfileFunctionality;
};
