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

      mondayMorning: DataTypes.INTEGER,
      mondayMorningTime: DataTypes.TIME,
      mondayAfternoon: DataTypes.INTEGER,
      mondayAfternoonTime: DataTypes.TIME,

      tuesdayMorning: DataTypes.INTEGER,
      tuesdayMorningTime: DataTypes.TIME,
      tuesdayAfternoon: DataTypes.INTEGER,
      tuesdayAfternoonTime: DataTypes.TIME,

      wednesdayMorning: DataTypes.INTEGER,
      wednesdayMorningTime: DataTypes.TIME,
      wednesdayAfternoon: DataTypes.INTEGER,
      wednesdayAfternoonTime: DataTypes.TIME,

      thursdayMorning: DataTypes.INTEGER,
      thursdayMorningTime: DataTypes.TIME,
      thursdayAfternoon: DataTypes.INTEGER,
      thursdayAfternoonTime: DataTypes.TIME,

      fridayMorning: DataTypes.INTEGER,
      fridayMorningTime: DataTypes.TIME,
      fridayAfternoon: DataTypes.INTEGER,
      fridayAfternoonTime: DataTypes.TIME,

      saturdayMorning: DataTypes.INTEGER,
      saturdayMorningTime: DataTypes.TIME,
      saturdayAfternoon: DataTypes.INTEGER,
      saturdayAfternoonTime: DataTypes.TIME,

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
