<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <div>
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
    </div>
  </v-form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      valid: true,
      startDate: "2020-10-13",
      endDate: "2020-10-13",
      selectedList: ["emails to send", "emails to send2"],
    };
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
    },
    async handleSendEmail() {
      this.send({ selectedList: this.selectedList });
    },
  },
};
</script>

<style></style>
