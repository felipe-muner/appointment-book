<template>
  <div>
    <h1>home page school</h1>
    {{schools}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "felipe"
    };
  },
  computed: {
    schools() {
      return this.$store.state.school.list;
    }
  },
  created() {}
};
</script>

<style>
</style>