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
      birthday: DataTypes.DATE,
      phone: DataTypes.STRING,
      salary: DataTypes.DECIMAL(10, 2),
      workDays: DataTypes.STRING,
      isTeacherAssistant: DataTypes.BOOLEAN,
      active: DataTypes.BOOLEAN
    },
    {
      timestamps: false,
      freezeTableName: true
    }
  );
  Teacher.associate = function(models) {
    Teacher.hasMany(models.Schedule, {
      foreignKey: "teacher_id",
      sourceKey: "teacherID"
    });
  };

  Teacher.prototype.toJSON = function() {
    var values = Object.assign({}, this.get());
    return values;
  };

  return Teacher;
};
