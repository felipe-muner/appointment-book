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
  getTest(id) {
    console.log(id);
    return [id];
  },
  drawShift(startDate, endDate, teacherID) {
    let allDays = [];
    //to avoid modifying the original date
    const current = new Date(startDate);
    while (current <= endDate) {
      let morningShift = {
        day: moment(current).format("YYYY-MM-DD"),
        shift: "Morning",
        lessons: [],
        totalMinutes: 0
      };
      let afternoonShift = {
        day: moment(current).format("YYYY-MM-DD"),
        shift: "Afternoon",
        lessons: [],
        totalMinutes: 0
      };
      allDays = [...allDays, morningShift, afternoonShift];
      current.setDate(current.getDate() + 1);
    }
    return allDays;
  },
  setUpLessons() {}
};
