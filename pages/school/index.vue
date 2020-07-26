<template>
  <div>
    <h1>School List</h1>
    {{schools[0].Lessons}}
    <New />
    <v-data-table :headers="headers" :items="schools" item-key="schoolID" class="elevation-1">
      <template v-slot:body="{ items }">
        <tbody>
          <tr v-for="item in items" :key="item.schoolID">
            <td>{{ item.schoolID }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.neighborhood }}</td>
            <td>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    :href="item.address"
                    target="_blank"
                  >
                    <v-icon dark>mdi-map</v-icon>
                  </v-btn>
                </template>
                <span>Tooltip</span>
              </v-tooltip>
            </td>
            <td>
              <Update :school="JSON.parse(JSON.stringify(item))" :lessons="item.Lessons" />
            </td>
            <td>{{ item.active }}</td>
          </tr>
        </tbody>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import New from "@/components/school/New";
import Update from "@/components/school/Update";

export default {
  components: {
    New,
    Update,
  },
  data() {
    return {
      dialog: false,
      name: "school",
      headers: [
        { text: "ID", value: "schoolID" },
        {
          text: "Name",
          align: "start",
          value: "name",
        },
        { text: "Neighborhood", value: "neighborhood" },
        { text: "Address", value: "address" },
        { text: "", value: "" },
        { text: "Active", value: "active" },
      ],
    };
  },
  computed: {
    schools() {
      return this.$store.state.school.list;
    },
  },
  methods: {
    ...mapActions({
      initSchool: "school/getAll",
    }),
  },
  created() {
    this.initSchool();
  },
};
</script>

<style></style>
