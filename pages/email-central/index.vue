<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row no-gutters>
        <v-col cols="2" class="mr-3">
          <v-text-field
            v-model="startDate"
            label="Initial Date:"
            type="date"
            outlined
            dense
            @blur="copyInitialDate"
          />
        </v-col>
        <v-col cols="2" class="mr-3">
          <v-text-field v-model="endDate" label="Final Date:" type="date" outlined dense />
        </v-col>
        <v-col cols="2" class="mr-3">
          <v-btn :disabled="!valid" color="primary" @click="handleSearch" dense>Search</v-btn>
        </v-col>
        <v-col>
          <v-btn cols="2" color="warning" @click="handleSendEmail" dense>Send emails</v-btn>
        </v-col>
      </v-row>
    </v-form>
    <v-row>
      {{selectedList}}
      <br />
      <br />
      {{selectedListTeacher}}
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
            <tr v-for="les in selectedList" v-bind:key="JSON.stringify(les)">
              <!-- <td>{{ les.School.name }}</td>
              <td>{{ les.Teacher.name }}</td>
              <td>{{ les.grade }}</td>
              <td>{{ les.lessonTime }}</td>-->
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
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      valid: true,
      startDate: "2020-10-13",
      endDate: "2020-10-13",
      selectedList: [],
      selectedListTeacher: [],
    };
  },
  computed: {
    // ...mapGetters({
    //   schools: "school/getList",
    // }),
  },
  methods: {
    ...mapActions({
      search: "email/search",
      send: "email/send",
    }),
    copyInitialDate(el) {
      this.endDate = this.startDate;
    },
    async handleSearch() {
      const resp = await this.search({
        startDate: this.startDate,
        endDate: this.endDate,
      });

      console.log(resp.data.data.selectedList);
      this.selectedList = resp.data.data.selectedList;
      this.selectedListTeacher = resp.data.data.searchListTeacher;
    },
    async handleSendEmail() {
      this.send({ selectedList: this.selectedList });
    },
  },
};
</script>

<style></style>
