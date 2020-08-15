<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row>
        {{monthYear}}
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
    </v-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      monthYear: "",
      valid: true,
      requiredRule: [(v) => !!v || "Month is required"],
    };
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

<style></style>
