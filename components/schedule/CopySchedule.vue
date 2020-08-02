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
        <v-container>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row no-gutters>
              {{date}}
              <v-col cols="2" class="mr-3">
                <v-text-field v-model="oldDate" label="Copy data from:" type="date" outlined dense />
              </v-col>
              <v-col cols="2" class="mr-3">
                <v-text-field v-model="newDate" label="to date:" type="date" outlined dense />
              </v-col>
              <v-col>
                <v-btn :disabled="!valid" color="success" @click="submitForm" dense>Copy New Day</v-btn>
              </v-col>
            </v-row>
          </v-form>
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
                  <tr v-for="les in lessonsArray" v-bind:key="les.scheduleID">
                    <td>{{ les.Schools[0].name }}</td>
                    <td>{{ les.Teachers[0].name }}</td>
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
import { mapActions, mapMutations, mapGetters } from "vuex";
export default {
  props: {
    date: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      valid: true,
      dialog: false,
      oldDate: "",
      newDate: "",
    };
  },
  computed: {
    ...mapGetters({
      lessonsArray: "schedule/getLessons",
    }),
  },
  methods: {
    ...mapActions({
      fetchLessons: "schedule/fetchLessons",
      copySchedule: "schedule/copySchedule",
    }),
    ...mapMutations({
      setSnack: "snackbar/setSnack",
    }),
    async handleRemoveLesson(scheduleID) {},
    async submitForm() {
      if (this.$refs.form.validate()) {
        const resp = await this.copySchedule({
          newDate: this.newDate,
        });
        this.dialog = false;
        this.setSnack("Created Well");
        // if (resp.data.code === 200) this.dialog = false;
      }
    },
  },
  watch: {
    async oldDate(newVal) {
      if (newVal) {
        await this.fetchLessons({
          date: this.oldDate,
        });
      }
    },
    date(newVal) {
      this.oldDate = newVal;
    },
  },
  created() {
    this.oldDate = this.date;
  },
};
</script>

<style></style>
