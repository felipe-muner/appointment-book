<template>
  <div>
    <v-row no-gutters>
      <v-col>
        <v-autocomplete
          return-object
          cache-items
          v-model="selected"
          :items="teachers"
          item-text="textToDisplay"
          label="Select a teacher"
        ></v-autocomplete>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field
          v-model="selectedToUpdate.name"
          label="First name"
          @click="logField"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-form>
      {{ selectedToUpdate }}
    </v-form>
  </div>
</template>

<script>
export default {
  props: {
    teachers: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selected: {}
    };
  },
  computed: {
    selectedToUpdate() {
      return JSON.parse(JSON.stringify(this.selected));
    }
  },
  methods: {
    logField() {
      console.log(this.selectedToUpdate);
    }
  }
};
</script>

<style></style>
