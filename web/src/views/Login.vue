<template>
  <form class="loginform" @submit.prevent="onSubmit">
    <input v-model="username" />
    <input v-model="password" type="password" />
    <error-field
      :field="eField"
      :message="eMessage"
      v-if="eMessage"
    ></error-field>
    <button type="submit">Login</button>
  </form>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import loginQuery from "../entites/user/queries/login";
import { useStore } from "../store";
import router from "../router/index";
import ErrorField from "../components/ErrorField.vue";

@Options({
  components: {
    ErrorField,
  },
})
export default class Register extends Vue {
  username = "";
  password = "";
  response = { message: "", field: "" };
  store = useStore();

  get eField(): string {
    return this.response.field;
  }

  get eMessage(): string {
    return this.response.message;
  }

  async onSubmit(): Promise<void> {
    this.response = await loginQuery(this.username, this.password);
    if (this.response.field === "") {
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
  button {
    margin-top: 2px;
  }
}
</style>
