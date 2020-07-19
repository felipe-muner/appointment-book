<template>
  <div>
    <v-container>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row>
          <v-col>
            <v-switch v-model="selectedToUpdate.active" label="Active"></v-switch>
          </v-col>
        </v-row>
        <v-row>
          <v-text-field
            prepend-icon="mdi-home-city"
            v-model="selectedToUpdate.name"
            label="Name"
            outlined
            dense
            required
          />
        </v-row>
        <v-row>
          <v-text-field
            prepend-icon="mdi-map-marker"
            v-model="selectedToUpdate.address"
            :rules="emailRules"
            label="Address"
            outlined
            dense
          />
        </v-row>
        <v-row>
          <v-text-field
            prepend-icon="mdi-city"
            v-model="selectedToUpdate.neighborhood"
            label="Neighborhood"
            outlined
            dense
          />
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
import { mapActions, mapMutations } from "vuex";

export default {
  props: {
    selected: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      valid: true,
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 10) || "Name must be less than 10 characters"
      ]
    };
  },
  computed: {
    selectedToUpdate() {
      return JSON.parse(JSON.stringify(this.selected));
    }
  },
  methods: {
    ...mapActions({
      update: "school/update"
    }),
    ...mapMutations({
      setSnack: "snackbar/setSnack"
    }),
    async submitForm() {
      if (this.$refs.form.validate()) {
        const resp = await this.update(this.selectedToUpdate);
        this.setSnack(resp.data.msg);
        if (resp.data.code === 200) this.$emit("close-dialog");
      }
    }
  }
};
</script>

<style></style>
