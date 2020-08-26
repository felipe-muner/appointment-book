<template>
  <div>
    <client-only>
      <h1>Teacher List</h1>
      <New />
      <Update />

      <v-data-table :headers="headers" :items="teachers" item-key="teacherID" class="elevation-1"></v-data-table>
    
    </client-only>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import New from "@/components/teacher/New";
import Update from "@/components/teacher/Update";

export default {
  components: {
    New,
    Update
  },
  data() {
    return {
      dialog: false,
      name: "teacher",
      headers: [
        { text: "ID", value: "teacherID" },
        { text: "Email", value: "email" },
        {
          text: "Name",
          align: "start",
          value: "name"
        },
        { text: "Birthday", value: "formatBirthday" },
        { text: "Phone", value: "phone" },
        { text: "Salary", value: "salary" },
        { text: "TA", value: "isTeacherAssistant" },
        { text: "Active", value: "active" }
      ]
    };
  },
  computed: {
    teachers() {
      return this.$store.state.teacher.list;
    }
  },
  methods: {
    ...mapActions({
      initTeacher: "teacher/getAll"
    })
  },
  created() {
    this.initTeacher();
  }
};
</script>

<style></style>
