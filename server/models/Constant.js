"use strict";

module.exports = (sequelize, DataTypes) => {
  const Constant = sequelize.define(
    "Constant",
    {
      constantID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: DataTypes.STRING,
      value: DataTypes.STRING
    },
    {
      timestamps: false,
      freezeTableName: true
    }
  );
  Constant.associate = function(models) {
    // associations can be defined here
  };

  Constant.prototype.toJSON = function() {
    var values = Object.assign({}, this.get());
    return values;
  };

  return Constant;
};
