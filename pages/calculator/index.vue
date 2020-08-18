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
          <v-expansion-panel v-for="(item, i) in teachers" :key="i">
            <v-expansion-panel-header class="header-style">{{ item.name }}</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-data-table
                :headers="setHeader"
                :items="item.shiftArray"
                item-key="scheduleID"
                class="elevation-1"
                disable-pagination
                hide-default-footer
              ></v-data-table>
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
      monthYear: "2020-09",
      valid: true,
      requiredRule: [(v) => !!v || "Month is required"],
    };
  },
  computed: {
    ...mapGetters({
      teachers: "calculator/getList",
      openPanel: "calculator/openPanel",
    }),
    setHeader() {
      return [
        {
          text: "Day",
          align: "start",
          sortable: false,
          value: "day",
        },
        { text: "Shift", value: "shift" },
        { text: "Lessons", value: "lessons" },
        { text: "Total minutes", value: "totalMinutes" },
      ];
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
