"use strict";

module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define(
    "Schedule",
    {
      scheduleID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      start: DataTypes.DATE,
      end: DataTypes.DATE,
      grade: DataTypes.STRING,
      lesson_id: DataTypes.INTEGER,
      teacher_id: DataTypes.INTEGER,
      school_id: DataTypes.INTEGER
    },
    {
      timestamps: false,
      freezeTableName: true
    }
  );
  Schedule.associate = function(models) {
    Schedule.hasMany(models.School, {
      foreignKey: "schoolID",
      sourceKey: "school_id"
    });
    Schedule.hasMany(models.Teacher, {
      foreignKey: "teacherID",
      sourceKey: "teacher_id"
    });
    Schedule.hasMany(models.Lesson, {
      foreignKey: "lessonID",
      sourceKey: "lesson_id"
    });
  };

  Schedule.prototype.toJSON = function() {
    var values = Object.assign({}, this.get());
    return values;
  };

  return Schedule;
};
