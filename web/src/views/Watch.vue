<template>
  <video autoplay muted><source :src="source" /></video>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { useRoute } from "vue-router";

export default class Watch extends Vue {
  router = useRoute();
  id = "";

  beforeMount(): void {
    this.id = this.router.params.id as string;
  }

  get source(): string {
    return `http://localhost:3000/video/single/${this.id}`;
  }
}
</script>
