<template>
  <form @submit.prevent="onSubmit">
    <input v-model="username" />
    <input v-model="password" />
    <button type="submit">Register</button>
  </form>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import registerQuery from "../entites/queries/register";
import { useStore } from "../store";
import router from "../router/index";
import { useSSRContext } from "vue";

@Options({})
export default class Register extends Vue {
  private m_username = "";
  private m_password = "";
  store = useStore();

  get username(): string {
    return this.m_username;
  }

  set username(value: string) {
    this.m_username = value;
  }

  get password(): string {
    return this.m_password;
  }

  set password(value: string) {
    this.m_password = value;
  }
  async onSubmit(): Promise<void> {
    const response = await registerQuery(this.m_username, this.m_password);
    if (response.field === "") {
      this.store.dispatch("updateUser");
      router.push("/");
    }
  }
}
</script>

<style></style>
