<template>
  <div>
    <div>
      <v-col class="pa-2">
        <v-radio-group ripple v-model="groupBySearch" row hide-details class="ma-0">
          <v-radio label="School" value="school"></v-radio>
          <v-radio label="Teacher" value="teacher"></v-radio>
        </v-radio-group>
      </v-col>
    </div>
    <div>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row no-gutters>
          <v-col class="mr-3" cols="2">
            <v-text-field
              v-model="startDate"
              label="Initial Date:"
              type="date"
              outlined
              dense
              @blur="copyInitialDate"
            />
          </v-col>
          <v-col class="mr-3" cols="2">
            <v-text-field v-model="endDate" label="Final Date:" type="date" outlined dense />
          </v-col>
          <v-col cols="1" class="mr-3">
            <v-btn :disabled="!valid" color="primary" @click="handleSearch" dense>Search</v-btn>
          </v-col>

          <v-col>
            <v-btn color="warning" @click="handleSendEmail" dense>Send emails</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </div>
    {{selected}}
    <hr />
    <v-row no-gutters>
      <v-expansion-panels :multiple="true" v-model="panel">
        <v-expansion-panel v-for="(item,i) in selectedListFormatted" :key="i">
          <v-expansion-panel-header
            class="header-style"
          >{{item.name}} - {{item.schoolID}} {{item.felipe}}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-data-table
              v-model="selected"
              :headers="headers"
              :items="item.Schedules"
              item-key="scheduleID"
              show-select
              class="elevation-1"
            ></v-data-table>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      singleSelect: false,
      selected: [],
      headers: [
        {
          text: "Teacher",
          align: "start",
          sortable: false,
          value: "Teachers[0].name",
        },
        { text: "Grade", value: "grade" },
        { text: "Date", value: "day" },
        { text: "Start", value: "startFormatted" },
        { text: "End", value: "endFormatted" },
      ],
      panel: [],
      valid: true,
      startDate: "2020-10-13",
      endDate: "2020-10-13",
      groupBySearch: "school",
      selectedList: [],
    };
  },
  computed: {
    selectedListFormatted() {
      const resp = this.selectedList.map((school) => {
        school.felipe = Math.random() * 10;
        school.Schedules.map((schedule) => {
          schedule.day = new Date(schedule.start).toISOString().split("T")[0];
          schedule.startFormatted = schedule.start.substring(11, 16);
          schedule.endFormatted = schedule.end.substring(11, 16);
        });
        return school;
      });
      return resp;
    },
    schedulesFormatted() {
      return;
    },
  },
  watch: {
    selectedList: {
      handler: function (val, oldVal) {
        this.panel = [...Array(this.selectedList.length).keys()];
      },
      deep: true,
    },
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
        groupBySearch: this.groupBySearch,
      });

      this.selectedList = resp.data.data.selectedList;
    },
    async handleSendEmail() {
      this.send({ selectedList: this.selectedList });
    },
  },
};
</script>

<style>
.header-style {
  background: #ccc;
}
</style>
