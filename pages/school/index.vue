<template>
  <div>
    <h1>School List</h1>
    <New />
    <Update />

    <template>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="schools"
        item-key="schoolID"
        show-select
        class="elevation-1"
      ></v-data-table>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import New from "@/components/school/New";
import Update from "@/components/school/Update";

export default {
  components: {
    New,
    Update
  },
  data() {
    return {
      dialog: false,
      name: "school",
      selected: [],
      headers: [
        { text: "ID", value: "schoolID" },
        {
          text: "Name",
          align: "start",
          value: "name"
        },
        { text: "Neighborhood", value: "neighborhood" },
        { text: "Address", value: "address" },
        { text: "Active", value: "active" }
      ]
    };
  },
  computed: {
    schools() {
      return this.$store.state.school.list;
    }
  },
  methods: {
    ...mapActions({
      initSchool: "school/getAll"
    })
  },
  created() {
    this.initSchool();
  }
};
</script>

<style></style>
