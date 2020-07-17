<template>
  <div>
    {{selected}}
    <h1>home page teacher</h1>
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
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      name: "teacher",
      selected: [],
      headers: [
        { text: 'ID', value: 'teacherID' },
        { text: 'Email', value: 'email' },
        {
          text: 'Name',
          align: 'start',
          value: 'name',
        },
        { text: 'Birthday', value: 'dateOfBirth' },
        { text: 'Phone', value: 'phone' },
        { text: 'TA', value: 'isTeacherAssistant' },
        { text: 'Active', value: 'active' },
      ],        
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

<style>
</style>