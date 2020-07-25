<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ on: menu, attrs }">
      <v-tooltip bottom>
        <template v-slot:activator="{ on: tooltip }">
          <v-btn
            class="mx-2 mb-3"
            fab
            dark
            small
            color="primary"
            v-bind="attrs"
            v-on="{ ...tooltip, ...menu }"
          >
            <v-icon dark>mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>New School</span>
      </v-tooltip>
    </template>

    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title
        >New School</v-card-title
      >
      <v-card-text>
        <v-container>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-text-field
                prepend-icon="mdi-home-city"
                v-model="school.name"
                label="Name"
                outlined
                dense
                required
              />
            </v-row>
            <v-row>
              <v-text-field
                prepend-icon="mdi-map-marker"
                v-model="school.address"
                label="Address"
                outlined
                dense
              />
            </v-row>
            <v-row>
              <v-text-field
                prepend-icon="mdi-city"
                v-model="school.neighborhood"
                label="Neighborhood"
                outlined
                dense
              />
            </v-row>
            <h2>Lessons</h2>
            <v-row>
              <v-col cols="2">
                <v-autocomplete
                  return-object
                  item-text="name"
                  v-model="lesson.day"
                  :items="days"
                  label="Day"
                  outlined
                  dense
                ></v-autocomplete>
              </v-col>
              <v-col cols="2">
                <v-autocomplete
                  v-model="lesson.grade"
                  :items="grades"
                  label="Grade"
                  outlined
                  dense
                ></v-autocomplete>
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
                <v-btn color="primary" @click="addLesson">Add lesson</v-btn>
              </v-col>
            </v-row>
            {{ school }}
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
                      <tr
                        v-for="les in school.lessons"
                        v-bind:key="JSON.stringify(les)"
                      >
                        <td>{{ les.day.name }}</td>
                        <td>{{ les.grade }}</td>
                        <td>{{ les.startTime }}</td>
                        <td>{{ les.endTime }}</td>
                        <td>
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                              <v-icon
                                @click="removeLesson(les)"
                                color="error"
                                dark
                                v-bind="attrs"
                                v-on="on"
                                >mdi-delete-empty</v-icon
                              >
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
                <v-btn
                  :disabled="!valid"
                  color="success"
                  @click="submitForm"
                  dense
                  >Create</v-btn
                >
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {
      valid: true,
      dialog: false,
      school: {
        name: "",
        address: "",
        neighborhood: "",
        lessons: []
      },
      lesson: { day: {}, grade: "", startTime: "", endTime: "", createdAt: "" },
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 10) || "Name must be less than 10 characters"
      ]
    };
  },
  computed: {
    ...mapGetters({
      schoolTypes: "school/schoolTypes",
      grades: "lesson/getGrades",
      days: "lesson/getDays"
    })
  },
  methods: {
    ...mapActions({
      new: "school/new"
    }),
    ...mapMutations({
      setSnack: "snackbar/setSnack"
    }),
    removeLesson(lesson) {
      this.school.lessons = this.school.lessons.filter(
        le => le.createdAt !== lesson.createdAt
      );
    },
    addLesson() {
      if (
        this.lesson.day.id === "" ||
        this.lesson.grade === "" ||
        this.lesson.startTime === "" ||
        this.lesson.endTime === ""
      ) {
        this.setSnack(
          "Required fields: fields: day, grade, start time and end time"
        );
        return false;
      } else {
        this.lesson.createdAt = new Date().getTime();
        const newLesson = { ...this.lesson };

        this.school.lessons.push(newLesson);

        this.lesson.grade = "";
        this.lesson.startTime = "";
        this.lesson.endTime = "";
      }
    },
    setTimeMorning(val) {
      this.school.mondayMorningTime = val;
    },
    setTimeAfternoon(val) {
      this.school.mondayAfternoonTime = val;
    },
    save(date) {
      this.$refs.menu.save(date);
    },
    async submitForm() {
      if (this.$refs.form.validate()) {
        const resp = await this.new(this.school);
        this.setSnack(resp.data.msg);
        if (resp.data.code === 200) this.dialog = false;
      }
    }
  }
};
</script>

<style></style>
