<template>
  <div>
    <h1>home page teacher</h1>
    {{teachers}}
    {{name}}
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      name: "teacher"
    };
  },
  computed: {
    teachers() {
      return this.$store.state.teacher.list;
    }
  },
  methods: {
    ...mapActions({
      initTeacher: "teacher/getAll"
    })
  },
  created() {
    this.initTeacher({ name: "felipeteacher" });
  }
};
</script>

<style>
</style>