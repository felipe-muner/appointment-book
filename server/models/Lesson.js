"use strict";
module.exports = (sequelize, DataTypes) => {
  const Lesson = sequelize.define(
    "Lesson",
    {
      lessonID: DataTypes.INTEGER,
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
