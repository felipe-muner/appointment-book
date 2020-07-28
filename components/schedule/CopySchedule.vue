<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <template v-slot:activator="{ on: menu, attrs }">
      <v-tooltip right>
        <template v-slot:activator="{ on: tooltip }">
          <v-btn
            class="mx-2 mb-3"
            fab
            dark
            small
            color="indigo"
            v-bind="attrs"
            v-on="{ ...tooltip, ...menu }"
          >
            <v-icon dark>mdi-pencil</v-icon>
          </v-btn>
        </template>
        <span>Copy schedule</span>
      </v-tooltip>
    </template>
    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>Copy schedule</v-card-title>
      <v-card-text>
        {{lessonsInSchedule.map(les => les.scheduleID)}}
        <v-container>
          <v-row>
            <v-col cols="3">
              <v-text-field v-model="oldDate" label="Copy data from:" type="date" outlined dense />
            </v-col>
            <v-col cols="3">
              <v-text-field v-model="newDate" label="to date:" type="date" outlined dense />
            </v-col>
          </v-row>
          <v-row no-gutters>
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
                  <tr v-for="les in lessonsInSchedule" v-bind:key="JSON.stringify(les)">
                    <td>{{ les.School.name }}</td>
                    <td>{{ les.Teacher.name }}</td>
                    <td>{{ les.grade }}</td>
                    <td>{{ les.lessonTime }}</td>
                    <td>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon
                            @click="handleRemoveLesson(les.scheduleID)"
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
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    date: {
      type: String,
      required: true,
    },
    school: {
      type: Object,
    },
  },
  data() {
    return {
      dialog: false,
      oldDate: this.date,
      newDate: "",
      mutableSchool: JSON.parse(JSON.stringify(this.school)),
      lessonsInSchedule: [],
    };
  },
  methods: {
    ...mapActions({
      fetchLessonsToCopy: "schedule/fetchLessonsToCopy",
    }),
    async handleRemoveLesson(scheduleID) {
      this.lessonsInSchedule = this.lessonsInSchedule.filter(
        (les) => les.scheduleID !== scheduleID
      );
    },
  },
  watch: {
    dialog(newVal) {
      if (newVal) {
        this.mutableSchool = JSON.parse(JSON.stringify(this.school));
      }
    },
    async oldDate(newVal) {
      if (newVal) {
        const resp = await this.fetchLessonsToCopy({
          date: this.oldDate,
        });
        this.lessonsInSchedule = resp.data.data;
      }
    },
  },
};
</script>

<style></style>