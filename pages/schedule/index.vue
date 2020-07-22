<template>
  <div>
    <h1>Schedule</h1>
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
            :items="school.Lessons"
            item-text="day"
            label="Grade"
            outlined
            dense
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
      date: "",
      school: "",
      teacher: "",
      valid: true,
      requiredRules: [v => !!v || "Field is required"]
    };
  },
  computed: {
    ...mapGetters({
      schools: "school/getList",
      teachers: "teacher/getList"
    })
  },
  methods: {
    ...mapActions({
      initSchool: "school/getAll",
      initTeacher: "teacher/getAll",
      new: "schedule/new"
    }),
    async submitForm() {
      if (this.$refs.form.validate()) {
        this.new({
          date: this.date,
          school: this.school,
          teacher: this.teacher
        });
      }
    }
  },
  created() {
    this.initSchool();
    this.initTeacher();
  }
};
</script>

<style>
</style>