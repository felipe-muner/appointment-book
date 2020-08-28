<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row>
        <v-col class="mr-3" cols="2">
          <v-text-field
            v-model="monthYear"
            label="Month"
            type="month"
            outlined
            dense
            :rules="requiredRule"
          />
        </v-col>
        <v-col>
          <v-btn :disabled="!valid" color="primary" @click="handleSearch" dense>Search</v-btn>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-expansion-panels :multiple="true" v-model="openPanel">
          <v-expansion-panel v-for="(item, i) in teachers" :key="i" @click="closePanel(i)">
            <v-expansion-panel-header class="header-style">
              <span>{{ item.name }}</span>
              <span>Salary: {{item.finalSalaryFormatted}} DNG</span>
              <span>Worked Shifts:{{item.workedShifts}}</span>
              <span>Total Shifts:{{item.totalShifts}}</span>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-data-table
                :items="item.shiftArray"
                item-key="scheduleID"
                class="elevation-1"
                disable-pagination
                hide-default-footer
              >
                <template v-slot:header>
                  <thead>
                    <tr>
                      <th>Day</th>
                      <th>Shift</th>
                      <th>Lessons</th>
                      <th>Total Minutes</th>
                    </tr>
                  </thead>
                </template>
                <template v-slot:body="{ items }">
                  <tbody>
                    <tr v-for="item in items" :key="JSON.stringify(item)">
                      <td>{{ item.day }}</td>
                      <td>{{ item.shift }}</td>
                      <td>
                        <div v-html="item.textToDisplay"></div>
                      </td>
                      <td>{{ item.totalMinutes }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-data-table>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  watchQuery: true,
  asyncData({ query, app }) {
    app.store.dispatch("calculator/initCalculator");
  },
  data() {
    return {
      monthYear: "2020-10",
      valid: true,
      requiredRule: [(v) => !!v || "Month is required"],
      openPanel: [],
    };
  },
  computed: {
    ...mapGetters({
      teachers: "calculator/getList",
    }),
  },
  watch: {
    teachers(newVal) {
      this.openPanel = [...Array(newVal.length).keys()];
    },
  },
  methods: {
    ...mapActions({
      search: "calculator/search",
    }),

    async handleSearch() {
      if (this.$refs.form.validate()) {
        const resp = await this.search({
          monthYear: this.monthYear,
        });
      }
    },
  },
};
</script>

<style>
.header-style {
  background: #ccc;
}
</style>
