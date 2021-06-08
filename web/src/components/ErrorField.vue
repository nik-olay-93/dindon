<template>
  <div class="ErrorBox">
    <p>Error: {{ gMessage }}</p>
    <p>Location: {{ gField }}</p>
  </div>
</template>

<script lang="ts">
import { Vue, prop } from "vue-class-component";

class Props {
  field = prop<string>({ default: "" });
  message = prop<string>({ default: "" });
}

export default class ErrorField extends Vue.with(Props) {
  get gField(): string {
    return this.field ?? "";
  }

  get gMessage(): string {
    return this.message ?? "";
  }
}
</script>

<style lang="scss" scoped>
.ErrorBox {
  font-size: small;
  padding: 10px;
  border-style: solid;
  border-color: red;
  border-radius: 5px;
  border-width: 1px;
}
</style>
