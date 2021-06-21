<template>
  <div class="cVideo">
    <p>{{ video.title }} by {{ video.creator.username }}</p>
    <video loop autoplay muted>
      <source :src="source" />
    </video>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import Video from "../entites/video/entity.video";

class Props {
  video!: Video;
}

export default class customVideo extends Vue.with(Props) {
  get source(): string {
    return `http://localhost:3000/video/single/${this.video.id}`;
  }
}
</script>
