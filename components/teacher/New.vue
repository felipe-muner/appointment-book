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
            color="primary"
            v-bind="attrs"
            v-on="{ ...tooltip, ...menu }"
          >
            <v-icon dark>mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>New Teacher</span>
      </v-tooltip>
    </template>

    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>New Teacher</v-card-title>

      <v-card-text>
        <v-container>
          {{teacher}}
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col>
                <v-switch v-model="teacher.isTeacherAssistant" label="TA"></v-switch>
              </v-col>
            </v-row>
            <v-row>
              <v-text-field
                prepend-icon="mdi-teach"
                v-model="teacher.name"
                :rules="nameRules"
                label="Name"
                outlined
                dense
              />
            </v-row>
            <v-row>
              <v-text-field
                prepend-icon="mdi-email"
                v-model="teacher.email"
                :rules="emailRules"
                label="E-mail"
                outlined
                dense
              />
            </v-row>
            <v-row>
              <v-text-field
                prepend-icon="mdi-cellphone-sound"
                v-model="teacher.phone"
                :rules="phoneRules"
                label="Phone"
                outlined
                dense
              />
            </v-row>
            <v-row>
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="teacher.birthday"
                    :rules="birthdayRules"
                    label="Birthday date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    outlined
                    dense
                  ></v-text-field>
                </template>
                <v-date-picker
                  ref="picker"
                  v-model="teacher.birthday"
                  :max="new Date().toISOString().substr(0, 10)"
                  min="1950-01-01"
                  @change="save"
                ></v-date-picker>
              </v-menu>
            </v-row>
            <v-row>
              <v-col class="text-right px-0">
                <v-btn :disabled="!valid" color="success" @click="submitForm" dense>Create</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapMutations } from "vuex";

export default {
  data() {
    return {
      valid: true,
      dialog: false,
      menu: false,
      teacher: {
        name: "qwe",
        email: "qwe@qwe.com",
        phone: "929292",
        birthday: "1970-10-10"
      },
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 10) || "Name must be less than 10 characters"
      ],
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      phoneRules: [v => !!v || "Phone is required"],
      birthdayRules: [v => !!v || "Birthday is required"]
    };
  },
  methods: {
    ...mapActions({
      new: "teacher/new"
    }),
    ...mapMutations({
      setSnack: "snackbar/setSnack"
    }),
    save(date) {
      this.$refs.menu.save(date);
    },
    async submitForm() {
      if (this.$refs.form.validate()) {
        const resp = await this.new(this.teacher);
        this.setSnack(resp.data.msg);
        if (resp.data.code === 200) this.dialog = false;
      }
    }
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    }
  }
};
</script>

<style></style>
