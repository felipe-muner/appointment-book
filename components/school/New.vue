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
            color="primary"
            v-bind="attrs"
            v-on="{ ...tooltip, ...menu }"
          >
            <v-icon dark>mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>New School</span>
      </v-tooltip>
    </template>

    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>New School</v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-text-field
                prepend-icon="mdi-home-city"
                v-model="school.name"
                label="Name"
                outlined
                dense
                required
              />
            </v-row>
            <v-row>
              <v-text-field
                prepend-icon="mdi-map-marker"
                v-model="school.address"
                label="Address"
                outlined
                dense
              />
            </v-row>
            <v-row>
              <v-text-field
                prepend-icon="mdi-city"
                v-model="school.neighborhood"
                label="Neighborhood"
                outlined
                dense
              />
            </v-row>
            <v-row>
              <v-col cols="6" class="pa-0">
                <v-select
                  return-object
                  item-text="name"
                  prepend-icon="mdi-human-child"
                  :items="schoolTypes"
                  label="School Type"
                  v-model="school.type"
                  outlined
                  dense
                ></v-select>
              </v-col>
              <v-col cols="3" class="py-0 pr-0">
                <v-text-field
                  prepend-icon="mdi-alarm"
                  label="Morning - Start At"
                  v-model="school.startTimeMorning"
                  outlined
                  dense
                  type="time"
                  @input="setTimeMorning"
                />
              </v-col>
              <v-col cols="3" class="py-0 pr-0">
                <v-text-field
                  prepend-icon="mdi-alarm"
                  label="Afternoon - Start At"
                  v-model="school.startTimeAfternoon"
                  outlined
                  dense
                  type="time"
                  @input="setTimeAfternoon"
                />
              </v-col>
            </v-row>
            {{school}}
            <h2>Amount of Classes</h2>
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
                            v-model="school.mondayMorning"
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
                            v-model="school.mondayMorningTime"
                            outlined
                            dense
                            type="time"
                          />
                        </td>
                        <td class="px-0" style="width:35%">
                          <v-text-field
                            hide-details
                            label="Monday Afternoon"
                            v-model="school.mondayAfternoon"
                            outlined
                            dense
                            type="number"
                          />
                        </td>
                        <td style="width:15%">
                          <v-text-field
                            hide-details
                            label="Start at"
                            v-model="school.mondayAfternoonTime"
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
                            v-model="school.tuesdayMorning"
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
                            v-model="school.tuesdayMorningTime"
                            outlined
                            dense
                            type="time"
                          />
                        </td>
                        <td class="px-0" style="width:35%">
                          <v-text-field
                            hide-details
                            label="Tuesday Afternoon"
                            v-model="school.tuesdayAfternoon"
                            outlined
                            dense
                            type="number"
                          />
                        </td>
                        <td style="width:15%">
                          <v-text-field
                            hide-details
                            label="Start at"
                            v-model="school.tuesdayAfternoonTime"
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
                            v-model="school.wednesdayMorning"
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
                            v-model="school.wednesdayMorningTime"
                            outlined
                            dense
                            type="time"
                          />
                        </td>
                        <td class="px-0" style="width:35%">
                          <v-text-field
                            hide-details
                            label="Wednesday Afternoon"
                            v-model="school.wednesdayAfternoon"
                            outlined
                            dense
                            type="number"
                          />
                        </td>
                        <td style="width:15%">
                          <v-text-field
                            hide-details
                            label="Start at"
                            v-model="school.wednesdayAfternoonTime"
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
                            v-model="school.thursdayMorning"
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
                            v-model="school.thursdayMorningTime"
                            outlined
                            dense
                            type="time"
                          />
                        </td>
                        <td class="px-0" style="width:35%">
                          <v-text-field
                            hide-details
                            label="Thursday Afternoon"
                            v-model="school.thursdayAfternoon"
                            outlined
                            dense
                            type="number"
                          />
                        </td>
                        <td style="width:15%">
                          <v-text-field
                            hide-details
                            label="Start at"
                            v-model="school.thursdayAfternoonTime"
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
                            v-model="school.fridayMorning"
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
                            v-model="school.fridayMorningTime"
                            outlined
                            dense
                            type="time"
                          />
                        </td>
                        <td class="px-0" style="width:35%">
                          <v-text-field
                            hide-details
                            label="Friday Afternoon"
                            v-model="school.fridayAfternoon"
                            outlined
                            dense
                            type="number"
                          />
                        </td>
                        <td style="width:15%">
                          <v-text-field
                            hide-details
                            label="Start at"
                            v-model="school.fridayAfternoonTime"
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
                            v-model="school.saturdayMorning"
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
                            v-model="school.saturdayMorningTime"
                            outlined
                            dense
                            type="time"
                          />
                        </td>
                        <td class="px-0" style="width:35%">
                          <v-text-field
                            hide-details
                            label="Saturday Afternoon"
                            v-model="school.saturdayAfternoon"
                            outlined
                            dense
                            type="number"
                          />
                        </td>
                        <td style="width:15%">
                          <v-text-field
                            hide-details
                            label="Start at"
                            v-model="school.saturdayAfternoonTime"
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
import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {
      valid: true,
      dialog: false,
      school: {
        mondayMorningTime: "11:11",
        mondayAfternoonTime: "22:07",
        mondayMorning: 1,
        mondayAfternoon: 7,
        tuesdayMorning: "2",
        wednesdayMorning: "3",
        thursdayMorning: "4",
        fridayMorning: "5",
        saturdayMorning: "6",
        tuesdayAfternoon: 8,
        wednesdayAfternoon: "9",
        thursdayAfternoon: "10",
        fridayAfternoon: "11",
        saturdayAfternoon: "12",
        tuesdayMorningTime: "11:12",
        wednesdayMorningTime: "11:13",
        thursdayMorningTime: "11:14",
        fridayMorningTime: "11:15",
        saturdayMorningTime: "11:16",
        tuesdayAfternoonTime: "22:08",
        wednesdayAfternoonTime: "22:09",
        thursdayAfternoonTime: "22:10",
        fridayAfternoonTime: "22:11",
        saturdayAfternoonTime: "22:12"
      },
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 10) || "Name must be less than 10 characters"
      ]
    };
  },
  computed: {
    ...mapGetters({
      schoolTypes: "school/schoolTypes"
    })
  },
  methods: {
    ...mapActions({
      new: "school/new"
    }),
    ...mapMutations({
      setSnack: "snackbar/setSnack"
    }),
    setTimeMorning(val) {
      this.school.mondayMorningTime = val;
    },
    setTimeAfternoon(val) {
      this.school.mondayAfternoonTime = val;
    },
    save(date) {
      this.$refs.menu.save(date);
    },
    async submitForm() {
      if (this.$refs.form.validate()) {
        const resp = await this.new(this.school);
        this.setSnack(resp.data.msg);
        if (resp.data.code === 200) this.dialog = false;
      }
    }
  }
};
</script>

<style></style>
