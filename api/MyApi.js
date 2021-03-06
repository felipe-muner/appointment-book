import Teacher from "./teacher";
import School from "./school";
import Schedule from "./schedule";
import Email from "./email";
import Calculator from "./calculator";

const server = "http://localhost:8081";

export default {
  teacher: new Teacher(server),
  school: new School(server),
  schedule: new Schedule(server),
  email: new Email(server),
  calculator: new Calculator(server)
};
