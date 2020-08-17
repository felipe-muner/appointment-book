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
  drawShift(firstDay, lastDay) {
    let allDays = [];
    for (let d = firstDay; d <= lastDay; d.setDate(d.getDate() + 1)) {
      let morningShift = {
        day: moment(d).format("YYYY-MM-DD"),
        shift: "morning",
        lessons: [],
        totalMinutes: 0
      };
      let shiftAfternoon = {
        day: moment(d).format("YYYY-MM-DD"),
        shift: "afternoon",
        lessons: [],
        totalMinutes: 0
      };
      allDays.push(morningShift, shiftAfternoon);
    }
    return allDays;
  },
  setUpLessons() {}
};
