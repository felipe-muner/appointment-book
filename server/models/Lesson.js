"use strict";
module.exports = (sequelize, DataTypes) => {
  const Lesson = sequelize.define(
    "Lesson",
    {
      lessonID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      day: DataTypes.STRING,
      grade: DataTypes.STRING,
      startTime: DataTypes.TIME,
      endTime: DataTypes.TIME,
      school_ID: DataTypes.INTEGER
    },
    {
      timestamps: false,
      freezeTableName: true
    }
  );
  Lesson.associate = function(models) {
    // associations can be defined here
  };
  return Lesson;
};
