<template>
  <div class="cVideo">
    <p>{{ video.title }}</p>
    <p>by {{ video.creator.username }}</p>
    <component :is="currentComponent" :to="videoUrl">
      <video loop autoplay muted>
        <source :src="source" />
      </video>
    </component>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Video from "../entites/video/entity.video";
import { RouterLink } from "vue-router";
import { Component } from "vue";

class Props {
  video!: Video;
  hasLink = false;
}

@Options({
  components: {
    RouterLink,
  },
})
export default class customVideo extends Vue.with(Props) {
  get source(): string {
    return `http://localhost:3000/video/single/${this.video.id}`;
  }

  get currentComponent(): Component | string {
    return this.hasLink ? RouterLink : "a";
  }

  get videoUrl(): string {
    return "/video/" + this.video.id;
  }
}
</script>

<style lang="scss" scoped>
.cVideo {
  video {
    max-width: 33%;
  }

  p {
    font-size: x-large;
  }
}
</style>
