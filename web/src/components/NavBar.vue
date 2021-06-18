<template>
  <div class="navBar">
    <div v-if="username">{{ username }}</div>
    <div class="buttons">
      <router-link to="/">Home</router-link>
      <div v-if="!username">
        <router-link to="/login">Login</router-link>
        <router-link to="/register">Register</router-link>
      </div>
      <div v-else>
        <a class="routeLink" @click="onLogout">Logout</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { useStore } from "../store";
import logoutQuery from "../entites/user/queries/logout";

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
  font-weight: 600;
}

.buttons {
  display: flex;
  flex-flow: row;
  justify-content: center;
  a {
    margin-left: 2px;
    margin-right: 2px;

    text-decoration: none;

    &:hover {
      cursor: pointer;
    }

    &:visited {
      color: inherit;
    }
  }
}
</style>
