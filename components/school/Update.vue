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
        <v-container>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col>
                <v-switch v-model="school.active" label="Active"></v-switch>
              </v-col>
            </v-row>
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
import { mapActions, mapMutations } from "vuex";
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
      mutableLessons: this.lessons,
      dialog: false,
      valid: true,
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
      ],
    };
  },
  methods: {
    ...mapActions({
      update: "school/update",
      deleteLesson: "lesson/deleteLesson",
      getLessons: "lesson/deleteLesson",
    }),
    ...mapMutations({
      setSnack: "snackbar/setSnack",
    }),
    async submitForm() {
      if (this.$refs.form.validate()) {
        const resp = await this.update(this.school);
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
