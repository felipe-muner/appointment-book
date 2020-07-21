"use strict";
module.exports = (sequelize, DataTypes) => {
  const Lesson = sequelize.define(
    "Lesson",
    {
      lessonID: DataTypes.INTEGER,
      grade: DataTypes.STRING,
      startTime: DataTypes.DATE,
      endTime: DataTypes.DATE,
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
