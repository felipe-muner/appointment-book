<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      v-if="$auth.loggedIn"
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in functionalitiesMenu"
          :key="i"
          :to="item.Functionality.action"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.Functionality.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.Functionality.name" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <nuxt-link to="/admin">
        <v-btn class="ml-5" color="info" v-if="$auth.user && $auth.user.UserID === 1">Admin Area</v-btn>
      </nuxt-link>
      <v-spacer />
      <div v-if="$auth.loggedIn">
        <MenuLoggedInfo />
      </div>
      <div v-else>
        <nuxt-link to="/login">
          <v-btn color="accent">Login</v-btn>
        </nuxt-link>
        <nuxt-link to="/register" class="ml-4">
          <v-btn color="success">Register...</v-btn>
        </nuxt-link>
      </div>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
        <SnackBarLogin />
      </v-container>
    </v-main>

    <v-footer :fixed="fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import SnackBarLogin from "~/components/SnackBarLogin";
import MenuLoggedInfo from "~/components/MenuLoggedInfo";

export default {
  components: {
    SnackBarLogin,
    MenuLoggedInfo
  },
  data() {
    return {
      clipped: true,
      drawer: true,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
      items: [
        {
          icon: "mdi-apps",
          title: "Welcome",
          to: "/"
        },
        {
          icon: "mdi-card-account-details",
          title: "Inspire",
          to: "/inspire"
        },
        {
          icon: "mdi-book-open",
          title: "About",
          to: "/about"
        },
        {
          icon: "mdi-chart-bubble",
          title: "Admin",
          to: "/admin"
        },
        {
          icon: "mdi-chart-bubble",
          title: "Sindec",
          to: "/sindec"
        }
      ]
    };
  },
  computed: {
    functionalitiesMenu() {
      return this.$auth.user.functionalities;
    }
  },
  mounted() {
    console.log("mounted");
  }
};
</script>
<style>
a {
  text-decoration: none;
}
</style>
