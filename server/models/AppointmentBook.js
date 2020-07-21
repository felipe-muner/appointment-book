"use strict";

module.exports = (sequelize, DataTypes) => {
  const AppointmentBook = sequelize.define(
    "AppointmentBook",
    {
      appointmentBookID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      teacher_id: DataTypes.INTEGER,
      school_id: DataTypes.INTEGER
    },
    {
      timestamps: false,
      freezeTableName: true
    }
  );
  AppointmentBook.associate = function(models) {
    // associations can be defined here
  };

  AppointmentBook.prototype.toJSON = function() {
    var values = Object.assign({}, this.get());
    return values;
  };

  return AppointmentBook;
};
