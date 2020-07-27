<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <template v-slot:activator="{ on: menu, attrs }">
      <v-tooltip bottom>
        <template v-slot:activator="{ on: tooltip }">
          <v-btn
            class="mx-2 mb-3"
            fab
            dark
            small
            color="warning"
            v-bind="attrs"
            v-on="{ ...tooltip, ...menu }"
          >
            <v-icon dark>mdi-pencil</v-icon>
          </v-btn>
        </template>
        <span>Update School</span>
      </v-tooltip>
    </template>

    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>Update School</v-card-title>
      <v-card-text>
        <hr />
        <br />
        <v-container>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col>
                <v-switch v-model="mutableSchool.active" label="Active"></v-switch>
              </v-col>
            </v-row>
            <v-row>
              <v-text-field
                prepend-icon="mdi-home-city"
                v-model="mutableSchool.name"
                label="Name"
                outlined
                dense
                required
              />
            </v-row>
            <v-row>
              <v-text-field
                prepend-icon="mdi-map-marker"
                v-model="mutableSchool.address"
                label="Address"
                outlined
                dense
              />
            </v-row>
            <v-row>
              <v-text-field
                prepend-icon="mdi-city"
                v-model="mutableSchool.neighborhood"
                label="Neighborhood"
                outlined
                dense
              />
            </v-row>
            <h2>Lessons</h2>
            <v-row>
              <v-col cols="2">
                <v-autocomplete
                  item-value="name"
                  item-text="name"
                  v-model="lesson.day"
                  :items="days"
                  label="Day"
                  outlined
                  dense
                ></v-autocomplete>
              </v-col>
              <v-col cols="2">
                <v-autocomplete v-model="lesson.grade" :items="grades" label="Grade" outlined dense></v-autocomplete>
              </v-col>

              <v-col cols="2">
                <v-text-field
                  prepend-icon="mdi-city"
                  type="time"
                  v-model="lesson.startTime"
                  label="Start Time"
                  outlined
                  dense
                />
              </v-col>
              <v-col cols="2">
                <v-text-field
                  prepend-icon="mdi-city"
                  type="time"
                  v-model="lesson.endTime"
                  label="End Time"
                  outlined
                  dense
                />
              </v-col>
              <v-col>
                <v-btn color="primary" @click="handleAddLesson">Add lesson</v-btn>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="6">
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th>Day</th>
                        <th>Grade</th>
                        <th>Start time</th>
                        <th>End time</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="les in mutableLessons" v-bind:key="JSON.stringify(les)">
                        <td>{{ les.day }}</td>
                        <td>{{ les.grade }}</td>
                        <td>{{ les.startTime }}</td>
                        <td>{{ les.endTime }}</td>
                        <td>
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                              <v-icon
                                @click="handleRemoveLesson(les.lessonID)"
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
              </v-col>
            </v-row>
            <v-row>
              <v-col class="text-right px-0">
                <v-btn :disabled="!valid" color="warning" @click="submitForm" dense>Update</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
      {{mutableLessons}}
      <hr />
      <v-divider></v-divider>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
export default {
  props: {
    school: {
      type: Object,
      required: true,
    },
    lessons: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      mutableSchool: { ...this.school }, // copy object without reference
      mutableLessons: this.lessons.slice(0),
      dialog: false,
      valid: true,
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
      ],
      lesson: { day: "", grade: "", startTime: "", endTime: "", createdAt: "" },
    };
  },
  watch: {
    mutableSchool: {
      // the callback will be called immediately after the start of the observation
      deep: true,
      handler(newVal, oldVal) {
        console.log("--watch school");
        console.log(newVal);
        console.log(oldVal);
        console.log("--watch");
      },
    },
  },
  computed: {
    ...mapGetters({
      schoolTypes: "school/schoolTypes",
      grades: "lesson/getGrades",
      days: "lesson/getDays",
    }),
  },
  methods: {
    ...mapActions({
      update: "school/update",
      deleteLesson: "lesson/deleteLesson",
      addLesson: "lesson/addLesson",
    }),
    ...mapMutations({
      setSnack: "snackbar/setSnack",
    }),
    async handleAddLesson() {
      if (
        this.lesson.day === "" ||
        this.lesson.grade === "" ||
        this.lesson.startTime === "" ||
        this.lesson.endTime === ""
      ) {
        this.setSnack(
          "Required fields: fields: day, grade, start time and end time"
        );
        return false;
      } else {
        let newLesson = { ...this.lesson };
        newLesson.school_ID = this.mutableSchool.schoolID;
        console.log(newLesson);
        console.log("to aqui");
        const resp = await this.addLesson(newLesson);
        console.log(resp.data);

        newLesson.lessonID = resp.data.data.lessonID;
        this.mutableLessons.push(newLesson);

        this.lesson.grade = "";
        this.lesson.startTime = "";
        this.lesson.endTime = "";
      }
    },
    async submitForm() {
      if (this.$refs.form.validate()) {
        const resp = await this.update(this.mutableSchool);
        this.setSnack(resp.data.msg);
        if (resp.data.code === 200) {
          this.dialog = false;
        }
      }
    },
    async handleRemoveLesson(lessonID) {
      const resp = await this.deleteLesson(lessonID);
      if (1 === resp.data.data) {
        this.mutableLessons = this.mutableLessons.filter(
          (les) => les.lessonID !== lessonID
        );
      }
    },
  },
};
</script>

<style></style>
