<template>
  <div>
    <nav-bar></nav-bar>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import NavBar from "./components/NavBar.vue";
import { useStore } from "./store";

@Options({ components: { NavBar } })
export default class App extends Vue {
  store = useStore();

  mounted(): void {
    this.store.dispatch("updateUser");
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
