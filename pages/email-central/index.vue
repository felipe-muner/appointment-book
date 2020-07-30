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
      <v-data-table
        :headers="headers"
        :items="desserts"
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
          <td :colspan="headers.length">More info about {{ item.name }}</td>
        </template>
      </v-data-table>
    </v-row>
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
          text: "Dessert (100g serving)",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Calories", value: "calories" },
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
        },
      ],
      valid: true,
      startDate: "2020-10-13",
      endDate: "2020-10-13",
      selectedList: [],
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

      this.selectedList = resp.data.data.selectedList;
    },
    async handleSendEmail() {
      this.send({ selectedList: this.selectedList });
    },
  },
};
</script>

<style></style>
