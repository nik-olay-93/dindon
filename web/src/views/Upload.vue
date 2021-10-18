<template>
  <div>
    <input type="file" @change="handleChange" />
    <input type="text" v-model="title" />
    <button @click.prevent="handleSubmit">Upload</button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { useRouter } from "vue-router";
import ErrorField from "../components/ErrorField.vue";
import createVideo from "../entites/video/queries/createVideo";

@Options({
  components: { ErrorField },
})
export default class Upload extends Vue {
  router = useRouter();
  file: File | undefined;
  title = "";

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
    const response = await createVideo(this.file, this.title);
    if (response) {
      this.router.push(`/video/${response}`);
    }
  }
}
</script>
