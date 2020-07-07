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
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      teacher_id: DataTypes.STRING,
      school_id: DataTypes.STRING
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
