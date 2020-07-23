<template>
  <div>
    {{lessonMatchDay}}
    {{date}}
    <h1>Schedule</h1>
    {{new Date(date).getDay()}}
    {{ days.find(d=> d.id === new Date(this.date).getDay()).name }}
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row>
        <v-col>
          <v-text-field
            :rules="requiredRules"
            label="Date"
            v-model="date"
            outlined
            dense
            type="date"
          />
        </v-col>
        <v-col>
          <v-autocomplete
            :rules="requiredRules"
            return-object
            v-model="school"
            :items="schools"
            item-text="name"
            label="School"
            outlined
            dense
          ></v-autocomplete>
        </v-col>
        <v-col>
          <v-autocomplete
            :rules="requiredRules"
            return-object
            v-model="grade"
            :items="lessonMatchDay"
            item-text="textToDisplay"
            label="Grade"
            outlined
            dense
            :disabled="isDisabled"
          ></v-autocomplete>
        </v-col>
        <v-col>
          <v-autocomplete
            :rules="requiredRules"
            return-object
            v-model="teacher"
            :items="teachers"
            item-text="name"
            label="Teacher"
            outlined
            dense
          ></v-autocomplete>
        </v-col>
        <v-col>
          <v-btn :disabled="!valid" color="success" @click="submitForm" dense>Add</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      date: new Date().toISOString().slice(0, 10),
      grade: "",
      school: { Lessons: [] },
      teacher: "",
      valid: true,
      requiredRules: [(v) => !!v || "Field is required"],
    };
  },
  computed: {
    ...mapGetters({
      schools: "school/getList",
      teachers: "teacher/getList",
      days: "lesson/getDays",
    }),
    isDisabled() {
      return !this.school;
    },
    lessonMatchDay() {
      return this.school.Lessons.filter(
        (l) =>
          l.day ===
          this.days.find((d) => d.id === new Date(this.date).getDay()).name
      );
    },
  },
  watch: {
    school: function (val) {
      this.fetchLessons({
        date: this.date,
        school: this.school,
      });
    },
    lessonMatchDay: function (val) {
      val.forEach(
        (v) =>
          (v.textToDisplay =
            v.grade + " --- " + v.startTime + " - " + v.endTime)
      );
    },
  },
  methods: {
    ...mapActions({
      initSchool: "school/getAll",
      initTeacher: "teacher/getAll",
      new: "schedule/new",
      fetchLessons: "schedule/fetchLessons",
    }),
    async submitForm() {
      if (this.$refs.form.validate()) {
        this.new({
          date: this.date,
          school: this.school,
          grade: this.grade,
          teacher: this.teacher,
        });
      }
    },
  },
  created() {
    this.initSchool();
    this.initTeacher();
  },
};
</script>

<style>
</style>