<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <template v-slot:activator="{ on: menu, attrs }">
      <v-tooltip right>
        <template v-slot:activator="{ on: tooltip }">
          <v-btn
            class="mx-2 mb-3"
            fab
            dark
            small
            color="indigo"
            v-bind="attrs"
            v-on="{ ...tooltip, ...menu }"
          >
            <v-icon dark>mdi-pencil</v-icon>
          </v-btn>
        </template>
        <span>Copy schedule</span>
      </v-tooltip>
    </template>
    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>Copy schedule</v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <v-text-field v-model="oldDate" label="Copy data from:" type="date" outlined dense />
            </v-col>
            <v-col>
              <v-text-field v-model="newDate" label="to date:" type="date" outlined dense />
            </v-col>
            <v-col></v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    date: {
      type: String,
      required: true,
    },
    school: {
      type: Object,
    },
  },
  data() {
    return {
      dialog: false,
      oldDate: "",
      newDate: "",
      mutableSchool: JSON.parse(JSON.stringify(this.school)),
    };
  },
  watch: {
    dialog(newVal) {
      if (newVal) {
        this.mutableSchool = JSON.parse(JSON.stringify(this.school));
      }
    },
    oldDate(newVal) {
      if (newVal) console.log(newVal);
    },
  },
};
</script>

<style></style>
