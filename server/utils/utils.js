const moment = require("moment");

module.exports = {
  formatBirthday: (dt)=>{
    return moment(dt).format("DD/MM/YYYY")
  }
}