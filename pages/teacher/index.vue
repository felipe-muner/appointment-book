<template>
  <div>
    <h1>Teacher List</h1>
    <New />
    <Update />

    <template>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="teachers"
        item-key="teacherID"
        show-select
        class="elevation-1"
      >
      </v-data-table>
    </template>
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
      selected: [],
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
    this.initTeacher({ name: "felipeteacher" });
  }
};
</script>

<style></style>
