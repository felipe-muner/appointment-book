"use strict";

module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define(
    "Teacher",
    {
      teacherID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      email: DataTypes.STRING,
      name: DataTypes.STRING,
      dateOfBirth: DataTypes.DATE,
      phone: DataTypes.STRING,
      isTeacherAssistant: DataTypes.BOOLEAN
    },
    {
      timestamps: false,
      freezeTableName: true
    }
  );
  Teacher.associate = function(models) {
    // associations can be defined here
  };

  Teacher.prototype.toJSON = function() {
    var values = Object.assign({}, this.get());
    return values;
  };

  return Teacher;
};
