<template>
  <div>
    <v-container>
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
                v-model="selectedToUpdate.birthdayYYYYMMDD"
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
              v-model="selectedToUpdate.birthdayYYYYMMDD"
              :max="new Date().toISOString().substr(0, 10)"
              min="1950-01-01"
              @change="save"
            ></v-date-picker>
          </v-menu>
        </v-row>
        <v-row>
          <v-col class="text-right px-0">
            <v-btn :disabled="!valid" color="warning" @click="submitForm">Update</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";

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
      ],
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      date: null,
      menu: false
    };
  },
  computed: {
    selectedToUpdate() {
      return JSON.parse(JSON.stringify(this.selected));
    }
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    }
  },
  methods: {
    ...mapActions({
      update: "teacher/update"
    }),
    logObj() {
      console.log(this.selectedToUpdate);
    },
    save(date) {
      this.$refs.menu.save(date);
    },
    submitForm() {
      if (this.$refs.form.validate()) {
        this.update({
          teacherID: this.selectedToUpdate.teacherID,
          name: this.selectedToUpdate.name,
          email: this.selectedToUpdate.email,
          phone: this.selectedToUpdate.phone,
          birthday: this.selectedToUpdate.birthdayYYYYMMDD,
          isTeacherAssistant: this.selectedToUpdate.isTeacherAssistant,
          active: this.selectedToUpdate.active
        });
        this.$emit("close-dialog");
        // this.$refs.form.reset();
      }
    }
  }
};
</script>

<style></style>
