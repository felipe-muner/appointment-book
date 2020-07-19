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
        <span>Update Teacher</span>
      </v-tooltip>
    </template>

    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>Update Teacher</v-card-title>
      <v-card-text>
        <v-container>
          <v-row no-gutters>
            <v-col>
              <v-autocomplete
                return-object
                cache-items
                v-model="selected"
                :items="teachers"
                item-text="textToDisplay"
                label="Select a teacher"
                outlined
                dense
              ></v-autocomplete>
            </v-col>
          </v-row>
          <UpdateForm :selected="selected" v-on:close-dialog="dialog = false" />
        </v-container>
      </v-card-text>

      <v-divider></v-divider>
    </v-card>
  </v-dialog>
</template>

<script>
import UpdateForm from "@/components/teacher/UpdateForm";

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
    teachers() {
      let teacherList = this.$store.state.teacher.list;
      teacherList.forEach(
        t => (t.textToDisplay = t.teacherID + " - " + t.name + " - " + t.email)
      );
      return teacherList;
    }
  }
};
</script>

<style></style>
