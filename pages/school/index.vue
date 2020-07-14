<template>
  <div>
    <h1>home page school</h1>
    {{school}}
    {{name}}
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      name: "school"
    };
  },
  computed: {
    school() {
      return this.$store.state.school.list;
    }
  },
  methods: {
    ...mapActions({
      initSchool: "school/getAll"
    })
  },
  created() {
    this.initSchool({ name: "felipeteacher" });
  }
};
</script>

<style>
</style>