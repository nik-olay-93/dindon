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
  private router = useRouter();
  private file: File | undefined;
  private _title = "";

  public get title(): string {
    return this._title;
  }
  public set title(value: string) {
    this._title = value;
  }

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
    const response = await createVideo(this.file, this._title);
    if (response) {
      this.router.push(`/video/${response}`);
    }
  }
}
</script>
