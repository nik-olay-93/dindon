<template>
  <div class="navBar">
    <div v-if="username">{{ username }}</div>
    <button v-on:click="onUpdate">Update username</button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { useStore } from "../store";

@Options({
  components: {},
})
export default class NavBar extends Vue {
  store = useStore();

  get username(): string | undefined {
    const username = this.store.state.user?.username;

    return username;
  }

  async updateUsername() {
    await this.store.dispatch("updateUser");
  }
}
</script>

<style lang="scss" scoped>
.navBar {
  background-color: red;
}
</style>
