<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-center">login</div>
      <div>
        <UserAuthForm buttonText="Login" :submitForm="submitForm" />
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import UserAuthForm from "~/components/UserAuthForm.vue";

export default {
  transition: "default",
  components: {
    UserAuthForm
  },
  data() {
    return {};
  },
  methods: {
    ...mapMutations({
      setSnack: "snackbar/setSnack"
    }),
    async submitForm(userInfo) {
      try {
        await this.$auth.loginWith("local", { data: userInfo });
        this.setSnack(`Hello, ${userInfo.email}!`);
        this.$router.push("/");
      } catch (error) {
        this.setSnack("Something wrong, please contact the adm.");
      }
    }
  }
};
</script>
