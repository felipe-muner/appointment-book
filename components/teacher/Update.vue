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
            {{selected}}
            <hr />
            {{selectedToUpdate}}
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

          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col>
                <v-switch v-model="selectedToUpdate.isTeacherAssistant" label="TA"></v-switch>
              </v-col>
              <v-col>
                <v-switch v-model="selectedToUpdate.active" label="Active"></v-switch>
              </v-col>
            </v-row>
            <v-row>
              <v-text-field
                prepend-icon="mdi-teach"
                v-model="selectedToUpdate.name"
                label="Name"
                outlined
                dense
                required
              />
            </v-row>
            <v-row>
              <v-text-field
                prepend-icon="mdi-email"
                v-model="selectedToUpdate.email"
                :rules="emailRules"
                label="E-mail"
                outlined
                dense
              />
            </v-row>
            <v-row>
              <v-text-field
                prepend-icon="mdi-cellphone-sound"
                v-model="selectedToUpdate.phone"
                label="Phone"
                outlined
                dense
              />
            </v-row>
            <v-row>
              <v-text-field
                prepend-icon="mdi-currency-usd"
                v-model.number="selectedToUpdate.salary"
                label="Salary"
                outlined
                dense
              />
            </v-row>
            <v-row>
              <v-text-field
                prepend-icon="mdi-calendar"
                v-model="selectedToUpdate.birthdayYYYYMMDD"
                label="Birthday"
                type="date"
                outlined
                dense
              />
            </v-row>
            <v-row>
              <v-col class="text-right px-0">
                <v-btn :disabled="!valid" color="warning" @click="submitForm">Update</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      selected: {},
      selectedToUpdate: {},
      dialog: false,
      valid: true,
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
      ],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
    };
  },
  watch: {
    selected(newVal) {
      this.selectedToUpdate = { ...newVal };
    },
  },
  computed: {
    ...mapGetters({
      teachers: "teacher/getList",
    }),
  },
  methods: {
    ...mapMutations({
      setSnack: "snackbar/setSnack",
    }),
    ...mapActions({
      update: "teacher/update",
      initTeacher: "teacher/getAll",
    }),
    async submitForm() {
      if (this.$refs.form.validate()) {
        const resp = await this.update({ ...this.selectedToUpdate });
        this.setSnack(resp.data.msg);

        if (resp.data.code === 200) {
          await this.initTeacher();
          this.dialog = false;
        }
      }
    },
  },
};
</script>

<style></style>
