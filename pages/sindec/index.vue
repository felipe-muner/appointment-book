<template>
  <v-flex xs12 sm12 md12>
    <v-data-table
      dense
      v-model="selected"
      :headers="headers"
      :items="sindecs"
      item-key="SindecID"
      class="elevation-1"
      show-select
    >
      <template v-slot:top>
        <FormSindec />
      </template>
      <template v-slot:header.data-table-select="{ props, on }">
        <v-simple-checkbox
          color="primary"
          v-model="props.value"
          v-on="on"
          :indeterminate="props.indeterminate"
        />
      </template>
      <template v-slot:body="{ items }">
        <tbody>
          <tr v-for="item in items" :key="item.SindecID">
            <td>
              <v-checkbox v-model="selected" :value="item"></v-checkbox>
            </td>
            <td>{{ item.estado.nome }}</td>
            <td>{{ item.uf.nome }}</td>
            <td>
              <v-container fill-height fluid class="pa-0">
                <v-row align="center" justify="center" v-for="link in item.link" :key="link.LinkID">
                  <v-col class="pa-0" cols="1">
                    <ToggleActive :item="item" :link="link" />
                  </v-col>
                  <v-col cols="11" align="left" justify="left">
                    {{
                    link.Link
                    }}
                  </v-col>
                </v-row>
              </v-container>
            </td>
            <td>
              <v-row>
                <EditSindec :item="item" />
                <DeleteSindec :item="item" />
              </v-row>
            </td>
          </tr>
        </tbody>
      </template>
    </v-data-table>
  </v-flex>
</template>

<script>
import FormSindec from "~/components/sindec/FormSindec";
import DeleteSindec from "~/components/sindec/DeleteSindec";
import EditSindec from "~/components/sindec/EditSindec";
import ToggleActive from "~/components/sindec/ToggleActive";

import { mapState } from "vuex";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  transition: "default",
  components: {
    FormSindec,
    DeleteSindec,
    EditSindec,
    ToggleActive
  },
  computed: {
    ...mapState("sindec", ["sindecs"])
    // ...mapGetters({
    //   sindecsFormatted: "sindec/sindecsFormatted"
    // })  NO USE
  },
  methods: {
    // ...mapActions({
    //   toggleActivity: "sindec/toggleActivity"
    // })
    // ...mapActions({
    //   add: "increment" // map `this.add()` to `this.$store.dispatch('increment')`
    // })
  },
  data() {
    return {
      selected: [],
      headers: [
        {
          text: "Estado",
          value: "estado.nome",
          width: "20%"
        },
        { text: "UF", value: "uf.nome", width: "10%" },
        {
          text: "Link",
          value: "link[0].LinkID",
          width: "50%",
          sortable: false
        },
        { text: "", value: "", width: "20%", sortable: false }
      ]
    };
  },
  mounted() {
    // console.log(this.$router);
    // console.log(this.$store);
    // console.log(this.$i18n);
  }
};
</script>
<style scoped>
.btn-width {
  width: 10%;
}
</style>
