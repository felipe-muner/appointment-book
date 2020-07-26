<template>
  <div>
    {{schools}}
    <v-container>
      {{selected}}
      <v-row no-gutters>
        <v-col>
          <v-autocomplete
            return-object
            cache-items
            v-model="selected"
            :items="schools"
            item-text="name"
            label="Select a school"
            outlined
            dense
          ></v-autocomplete>
        </v-col>
      </v-row>

      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row>
          <v-col>
            <v-switch v-model="selected.active" label="Active"></v-switch>
          </v-col>
        </v-row>
        <v-row>
          <v-text-field
            prepend-icon="mdi-home-city"
            v-model="selected.name"
            label="Name"
            outlined
            dense
            required
          />
        </v-row>
        <v-row>
          <v-text-field
            prepend-icon="mdi-map-marker"
            v-model="selected.address"
            label="Address"
            outlined
            dense
          />
        </v-row>
        <v-row>
          <v-text-field
            prepend-icon="mdi-city"
            v-model="selected.neighborhood"
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
                  <tr v-for="les in selected.Lessons" v-bind:key="JSON.stringify(les)">
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
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import Vue from "vue";
export default {
  data() {
    return {
      selected: { Lessons: [] },
      valid: true,
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
      ],
    };
  },
  computed: {
    ...mapGetters({
      schools: "school/getList",
    }),
  },
  methods: {
    ...mapActions({
      update: "school/update",
      initSchool: "school/getAll",
      deleteLesson: "lesson/deleteLesson",
    }),
    ...mapMutations({
      setSnack: "snackbar/setSnack",
    }),
    async submitForm() {
      if (this.$refs.form.validate()) {
        const resp = await this.update(this.selected);
        this.setSnack(resp.data.msg);
        if (resp.data.code === 200) {
          this.selected = { Lessons: [] };
          await this.initSchool();
          this.$emit("close-dialog");
        }
      }
    },
    async handleRemoveLesson(lessonID) {
      const resp = await this.deleteLesson(lessonID);

      if (1 === resp.data.data) {
        this.selected.Lessons = this.selected.Lessons.filter(
          (l) => l.lessonID !== lessonID
        );
      }
    },
  },
};
</script>

<style></style>
