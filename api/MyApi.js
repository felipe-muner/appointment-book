import Teacher from "./teacher";
import School from "./school";

const server = "http://localhost:8081";

export default {
  teacher: new Teacher(server),
  school: new School(server)
};
