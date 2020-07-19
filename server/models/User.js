"use strict";

const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      userID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      name: DataTypes.STRING,
      birthday: DataTypes.DATE
    },
    {
      timestamps: false,
      freezeTableName: true,
      hooks: {
        beforeCreate: async user => {
          const hashPass = await bcrypt.hash(user.password, 10);
          user.password = hashPass;
        }
      }
    }
  );
  User.associate = function(models) {
    // associations can be defined here
  };

  User.prototype.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };

  User.prototype.toJSON = function() {
    var values = Object.assign({}, this.get());
    delete values.password;
    return values;
  };

  return User;
};
