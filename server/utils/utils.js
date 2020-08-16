const moment = require("moment");

module.exports = {
  formatDDMMYYYY: dt => {
    return moment(dt).format("DD/MM/YYYY");
  },
  extractDate: dt => {
    return moment(dt).format("YYYY-MM-DD");
  },
  extractTime: dt => {
    return moment(dt).format("HH:mm");
  },
  getDaysInMonth(firstDay, lastDay) {
    let allDays = [];
    for (let d = firstDay; d <= lastDay; d.setDate(d.getDate() + 1)) {
      allDays.push(new Date(d));
    }
  },
  drawArrayShitf() {}
};
