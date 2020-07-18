<template>
  <v-dialog v-model="dialog" width="50%">
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
          <v-row no-gutters>
            <v-col>
              <v-autocomplete
                return-object
                cache-items
                v-model="selected"
                :items="schools"
                item-text="textToDisplay"
                label="Select a school"
                outlined
                dense
              ></v-autocomplete>
            </v-col>
          </v-row>
          <UpdateForm :selected="selected" />
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
    UpdateForm
  },
  data() {
    return {
      selected: {},
      dialog: false
    };
  },
  computed: {
    schools() {
      let schoolList = this.$store.state.school.list;
      schoolList.forEach(t => (t.textToDisplay = t.schoolID + " - " + t.name));
      return schoolList;
    }
  }
};
</script>

<style></style>
