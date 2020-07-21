"use strict";

module.exports = (sequelize, DataTypes) => {
  const School = sequelize.define(
    "School",
    {
      schoolID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      neighborhood: DataTypes.STRING,

      active: DataTypes.BOOLEAN
    },
    {
      timestamps: false,
      freezeTableName: true
    }
  );
  School.associate = function(models) {
    // associations can be defined here
  };

  School.prototype.toJSON = function() {
    var values = Object.assign({}, this.get());
    return values;
  };

  return School;
};
