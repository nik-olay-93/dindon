<template>
  <div>
    <input type="file" @change="handleChange" />
    <button @click.prevent="handleSubmit">Upload</button>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { useRouter } from "vue-router";
import createVideo from "../entites/video/queries/createVideo";

export default class Upload extends Vue {
  router = useRouter();
  file: File | undefined;

  handleChange(e: {
    target: { files: File[] };
    dataTransfer: { files: File[] };
  }): void {
    const files = e.target.files || e.dataTransfer.files;
    if (!files.length) {
      return;
    }
    this.file = files[0];
  }

  async handleSubmit(): Promise<void> {
    if (!this.file) {
      return;
    }
    const response = await createVideo(this.file);
    if (response) {
      this.router.push(`/watch/${response}`);
    }
  }
}
</script>
