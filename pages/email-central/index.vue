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
    <!-- {{searchedItems}} -->
    <v-row no-gutters>
      <v-expansion-panels :multiple="true" v-model="openPanel">
        <v-expansion-panel v-for="(item, i) in searchedItems" :key="i">
          <v-expansion-panel-header
            class="header-style"
          >{{ item.name }} - {{item.schoolID || item.teacherID}}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-data-table
              v-model="selected"
              :headers="setHeader"
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
      panel: [],
      valid: true,
      startDate: "2020-10-13",
      endDate: "2020-10-13",
      groupBySearch: "school",
    };
  },
  computed: {
    setHeader() {
      return [
        {
          text: "school" === this.groupBySearch ? "Teacher" : "School",
          align: "start",
          sortable: false,
          value:
            "school" === this.groupBySearch
              ? "Teachers[0].name"
              : "Schools[0].name",
        },
        { text: "Grade", value: "grade" },
        { text: "Day", value: "day" },
        { text: "Time", value: "lessonTime" },
      ];
    },
    ...mapGetters({
      searchedItems: "email/getList",
      openPanel: "email/openPanel",
    }),
    selected: {
      get() {
        return this.$store.state.email.selected;
      },
      set(value) {
        this.updateSelected(value);
      },
    },
  },
  methods: {
    ...mapActions({
      search: "email/search",
      send: "email/send",
      cleanSearch: "email/cleanSearch",
      updateSelected: "email/updateSelected",
    }),
    copyInitialDate(el) {
      if (!this.endDate) this.endDate = this.startDate;
    },
    async handleSearch() {
      const resp = await this.search({
        startDate: this.startDate,
        endDate: this.endDate,
        groupBySearch: this.groupBySearch,
      });
    },
    async handleSendEmail() {
      this.send({ selectedList: this.selectedList });
    },
  },
  watch: {
    groupBySearch(val) {
      this.cleanSearch();
    },
  },
};
</script>

<style>
.header-style {
  background: #ccc;
}
</style>
