const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      userID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING
      },
      dateOfBirth: {
        type: DataTypes.DATE
      },
      email: {
        type: DataTypes.STRING,
        unique: true
      },
      password: DataTypes.STRING,
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1
      }
    },
    {
      freezeTableName: true,
      timestamps: false,
      hooks: {
        beforeCreate: async user => {
          const hashPass = await bcrypt.hash(user.password, 10);
          user.password = hashPass;
        }
      }
    }
  );

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
