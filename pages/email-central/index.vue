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
      <v-row no-gutters>
        <v-data-table
          :headers="headers"
          :items="selectedList"
          :expanded.sync="expanded"
          item-key="name"
          show-expand
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Expandable Table</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
          </template>
          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">
              <div
                v-for="sched in item.Schedules"
                v-bind:key="sched.scheduleID"
              >{{sched.Teachers[0].name}} - {{sched.grade}} - {{sched.start}} - {{sched.end}}</div>
            </td>
          </template>
        </v-data-table>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      expanded: [],
      headers: [
        {
          text: "School Name",
          align: "start",
          sortable: false,
          value: "name",
        },
      ],
      valid: true,
      startDate: "2020-10-13",
      endDate: "2020-10-13",
      groupBySearch: "school",
      selectedList: [],
    };
  },
  computed: {},
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

<style></style>
