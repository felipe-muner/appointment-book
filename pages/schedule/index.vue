
<template>
  <client-only>
    
  <div>
    <!-- {{grade}} -->
    <!-- {{ grade }} -->
    <!-- <hr /> -->
    <!-- {{lessonsArray('indexList')}} -->
    <!-- {{ date }}-->
    {{school}}
    <h1>Schedule</h1>
    <CopySchedule :date="date" />
    <br />
    {{ new Date(date).getDay() }}
    <!-- {{ days.find(d => d.id === new Date(this.date).getDay()).name }} -->
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
        <!-- @click:clear="callItBack()" -->
        <v-col>
          <v-autocomplete
            clearable
            :rules="requiredRules"
            return-object
            @click:clear="$nextTick(() => school = { Lessons: [] })"
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
            multiple
            chips
            deletable-chips
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
    <div>      
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th>School</th>
              <th>Teacher</th>
              <th>Grade</th>
              <th>Time</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="les in lessonsArray('indexList')" v-bind:key="les.ScheduleID">
              <td>{{ les.Schools[0].name }}</td>
              <td>{{ les.Teachers[0].name }}</td>
              <td>{{ les.grade }}</td>
              <td>{{ les.lessonTime }}</td>
              <td>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      @click="removeLesson(les.scheduleID)"
                      color="error"
                      dark
                      v-bind="attrs"
                      v-on="on"
                    >mdi-delete-empty</v-icon>
                  </template>
                  <span>remove</span>
                </v-tooltip>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>    
    </div>
  </div>
  </client-only>
</template>

<script>

import { mapGetters, mapActions } from "vuex";
import CopySchedule from "@/components/schedule/CopySchedule";

export default {
  components: {
    CopySchedule,
  },
  data() {
    return {
      date: new Date().toISOString().slice(0, 10),
      grade: [],
      school: { Lessons: [] },
      teacher: {},
      valid: true,
      requiredRules: [(v) => !!v || "Field is required"],
    };
  },
  computed: {
    ...mapGetters({
      schools: "school/getList",
      teachers: "teacher/getList",
      days: "lesson/getDays",
      lessonsArray: "schedule/getList",
    }),
    isDisabled() {
      return !this.school;
    },
    lessonMatchDay() {

      if (!this.school || !this.date) {
        return [];
      }
      
      let lessons = this.school.Lessons.filter(
        (l) =>
          l.day ===
          this.days.find((d) => d.id === new Date(this.date).getDay()).name
      );

      lessons = lessons.map(l => {
        l.textToDisplay = l.grade + " -> " + l.startTime + " - " + l.endTime
        return {...l}
      })

      return lessons
    },
  },
  watch: {
    school: async function (val) {
      if (val) await this.handleFetchLessons();
    },
    date: async function (val) {
      await this.handleFetchLessons();  
    },
  },
  methods: {
    ...mapActions({
      initSchool: "school/getAll",
      initTeacher: "teacher/getAll",
      new: "schedule/new",
      fetchLessons: "schedule/fetchLessons",
      deleteLesson: "schedule/deleteLesson",
    }),
    async handleFetchLessons() {
      if(this.date){
        await this.fetchLessons({
          date: this.date,
          school: this.school,
          list: "indexList",
        });
      }      
    },
    async removeLesson(scheduleID) {
      await this.deleteLesson({ scheduleID, list: "indexList" });
    },
    async submitForm() {
      if (this.$refs.form.validate()) {
        let newSchedule = {
          date: this.date,
          school: this.school,
          grade: this.grade,
          teacher: this.teacher,
        };
        await this.new(newSchedule);
        this.teacher = {};
        this.grade = [];
        await this.handleFetchLessons();
      }
    },
  },
  created() {
    this.initSchool();
    this.initTeacher();
    this.handleFetchLessons();
  },
};
</script>

<style></style>
