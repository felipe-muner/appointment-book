<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <template v-slot:activator="{ on: menu, attrs }">
      <v-tooltip bottom>
        <template v-slot:activator="{ on: tooltip }">
          <v-btn
            class="mx-2 mb-3"
            fab
            dark
            small
            color="warning"
            v-bind="attrs"
            v-on="{ ...tooltip, ...menu }"
          >
            <v-icon dark>mdi-pencil</v-icon>
          </v-btn>
        </template>
        <span>Update School</span>
      </v-tooltip>
    </template>

    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>Update School</v-card-title>
      <v-card-text>
        <v-container>
          <UpdateForm v-on:close-dialog="dialog = false" />
        </v-container>
      </v-card-text>

      <v-divider></v-divider>
    </v-card>
  </v-dialog>
</template>

<script>
import UpdateForm from "@/components/school/UpdateForm";

export default {
  components: {
    UpdateForm,
  },
  data() {
    return {
      dialog: false,
    };
  },
};
</script>

<style></style>
