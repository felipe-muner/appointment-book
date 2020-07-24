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
      start: DataTypes.DATE,
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
    Schedule.belongsTo(models.School, {
      foreignKey: "school_id",
      sourceKey: "schoolID"
    });
    Schedule.belongsTo(models.Teacher, {
      foreignKey: "teacher_id",
      targetKey: "teacherID"
    });
    Schedule.belongsTo(models.Lesson, {
      foreignKey: "lesson_id",
      targetKey: "lessonID"
    });
  };

  Schedule.prototype.toJSON = function() {
    var values = Object.assign({}, this.get());
    return values;
  };

  return Schedule;
};
