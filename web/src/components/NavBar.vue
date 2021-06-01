<template>
  <div class="navBar">
    <div v-if="username">{{ username }}</div>
    <div class="buttons">
      <router-link class="routeLink" to="/login">Login</router-link>
      <router-link class="routeLink" to="/register">Register</router-link>
      <a v-on:click="onLogout">Logout</a>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { useStore } from "../store";
import logoutQuery from "../entites/queries/logout";

@Options({
  components: {},
})
export default class NavBar extends Vue {
  store = useStore();

  get username(): string | undefined {
    const username = this.store.state.user?.username;

    return username;
  }

  async onLogout(): Promise<void> {
    await logoutQuery();
    this.store.dispatch("updateUser");
  }
}
</script>

<style lang="scss" scoped>
.navBar {
  background-color: red;
}

.buttons {
  display: flex;
  flex-flow: row;
  justify-content: center;
}

.routeLink {
  margin-left: 2px;
  margin-right: 2px;
}
</style>
