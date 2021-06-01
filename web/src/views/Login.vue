<template>
  <div class="loginform">
    <input v-model="username" />
    <input v-model="password" />
    <button @click.prevent="onSubmit" type="submit">Login</button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import loginQuery from "../entites/queries/login";
import { useStore } from "../store";
import router from "../router/index";

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
    const response = await loginQuery(this.m_username, this.m_password);
    if (response.field === "") {
      this.store.dispatch("updateUser");
      router.push("/");
    }
  }
}
</script>

<style lang="scss" scoped>
.loginform {
  display: flex;
  flex-flow: column;
  align-items: center;
  input {
    margin-top: 2px;
    margin-bottom: 2px;
  }
}
</style>
