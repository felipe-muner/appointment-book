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
          <v-col class="px-0">
            <v-simple-table>
              <template v-slot:default>
                <tbody>
                  <tr>
                    <td class="px-0" style="width:35%">
                      <v-text-field
                        hide-details
                        label="Monday Morning"
                        v-model="selectedToUpdate.mondayMorning"
                        outlined
                        dense
                        type="number"
                        min="0"
                        step="1"
                      />
                    </td>
                    <td style="width:15%">
                      <v-text-field
                        hide-details
                        label="Start at"
                        v-model="selectedToUpdate.mondayMorningTime"
                        outlined
                        dense
                        type="time"
                      />
                    </td>
                    <td class="px-0" style="width:35%">
                      <v-text-field
                        hide-details
                        label="Monday Afternoon"
                        v-model="selectedToUpdate.mondayAfternoon"
                        outlined
                        dense
                        type="number"
                      />
                    </td>
                    <td style="width:15%">
                      <v-text-field
                        hide-details
                        label="Start at"
                        v-model="selectedToUpdate.mondayAfternoonTime"
                        outlined
                        dense
                        type="time"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td class="px-0" style="width:35%">
                      <v-text-field
                        hide-details
                        label="Tuesday Morning"
                        v-model="selectedToUpdate.tuesdayMorning"
                        outlined
                        dense
                        type="number"
                        min="0"
                        step="1"
                      />
                    </td>
                    <td style="width:15%">
                      <v-text-field
                        hide-details
                        label="Start at"
                        v-model="selectedToUpdate.tuesdayMorningTime"
                        outlined
                        dense
                        type="time"
                      />
                    </td>
                    <td class="px-0" style="width:35%">
                      <v-text-field
                        hide-details
                        label="Tuesday Afternoon"
                        v-model="selectedToUpdate.tuesdayAfternoon"
                        outlined
                        dense
                        type="number"
                      />
                    </td>
                    <td style="width:15%">
                      <v-text-field
                        hide-details
                        label="Start at"
                        v-model="selectedToUpdate.tuesdayAfternoonTime"
                        outlined
                        dense
                        type="time"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td class="px-0" style="width:35%">
                      <v-text-field
                        hide-details
                        label="Wednesday Morning"
                        v-model="selectedToUpdate.wednesdayMorning"
                        outlined
                        dense
                        type="number"
                        min="0"
                        step="1"
                      />
                    </td>
                    <td style="width:15%">
                      <v-text-field
                        hide-details
                        label="Start at"
                        v-model="selectedToUpdate.wednesdayMorningTime"
                        outlined
                        dense
                        type="time"
                      />
                    </td>
                    <td class="px-0" style="width:35%">
                      <v-text-field
                        hide-details
                        label="Wednesday Afternoon"
                        v-model="selectedToUpdate.wednesdayAfternoon"
                        outlined
                        dense
                        type="number"
                      />
                    </td>
                    <td style="width:15%">
                      <v-text-field
                        hide-details
                        label="Start at"
                        v-model="selectedToUpdate.wednesdayAfternoonTime"
                        outlined
                        dense
                        type="time"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td class="px-0" style="width:35%">
                      <v-text-field
                        hide-details
                        label="Thursday Morning"
                        v-model="selectedToUpdate.thursdayMorning"
                        outlined
                        dense
                        type="number"
                        min="0"
                        step="1"
                      />
                    </td>
                    <td style="width:15%">
                      <v-text-field
                        hide-details
                        label="Start at"
                        v-model="selectedToUpdate.thursdayMorningTime"
                        outlined
                        dense
                        type="time"
                      />
                    </td>
                    <td class="px-0" style="width:35%">
                      <v-text-field
                        hide-details
                        label="Thursday Afternoon"
                        v-model="selectedToUpdate.thursdayAfternoon"
                        outlined
                        dense
                        type="number"
                      />
                    </td>
                    <td style="width:15%">
                      <v-text-field
                        hide-details
                        label="Start at"
                        v-model="selectedToUpdate.thursdayAfternoonTime"
                        outlined
                        dense
                        type="time"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td class="px-0" style="width:35%">
                      <v-text-field
                        hide-details
                        label="Friday Morning"
                        v-model="selectedToUpdate.fridayMorning"
                        outlined
                        dense
                        type="number"
                        min="0"
                        step="1"
                      />
                    </td>
                    <td style="width:15%">
                      <v-text-field
                        hide-details
                        label="Start at"
                        v-model="selectedToUpdate.fridayMorningTime"
                        outlined
                        dense
                        type="time"
                      />
                    </td>
                    <td class="px-0" style="width:35%">
                      <v-text-field
                        hide-details
                        label="Friday Afternoon"
                        v-model="selectedToUpdate.fridayAfternoon"
                        outlined
                        dense
                        type="number"
                      />
                    </td>
                    <td style="width:15%">
                      <v-text-field
                        hide-details
                        label="Start at"
                        v-model="selectedToUpdate.fridayAfternoonTime"
                        outlined
                        dense
                        type="time"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td class="px-0" style="width:35%">
                      <v-text-field
                        hide-details
                        label="Saturday Morning"
                        v-model="selectedToUpdate.saturdayMorning"
                        outlined
                        dense
                        type="number"
                        min="0"
                        step="1"
                      />
                    </td>
                    <td style="width:15%">
                      <v-text-field
                        hide-details
                        label="Start at"
                        v-model="selectedToUpdate.saturdayMorningTime"
                        outlined
                        dense
                        type="time"
                      />
                    </td>
                    <td class="px-0" style="width:35%">
                      <v-text-field
                        hide-details
                        label="Saturday Afternoon"
                        v-model="selectedToUpdate.saturdayAfternoon"
                        outlined
                        dense
                        type="number"
                      />
                    </td>
                    <td style="width:15%">
                      <v-text-field
                        hide-details
                        label="Start at"
                        v-model="selectedToUpdate.saturdayAfternoonTime"
                        outlined
                        dense
                        type="time"
                      />
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
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
      update: "school/update",
      initSchool: "school/getAll"
    }),
    ...mapMutations({
      setSnack: "snackbar/setSnack"
    }),
    async submitForm() {
      if (this.$refs.form.validate()) {
        const resp = await this.update(this.selectedToUpdate);
        this.setSnack(resp.data.msg);
        if (resp.data.code === 200) {
          this.initSchool();
          this.$emit("close-dialog");
        }
      }
    }
  }
};
</script>

<style></style>
