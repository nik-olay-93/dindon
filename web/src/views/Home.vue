<template>
  <div class="home">
    <ul v-for="(video, index) in videos" :key="index">
      <custom-video :video="video" />
    </ul>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Video from "../entites/video/entity.video";
import exploreQuery from "../entites/video/queries/exploreVideos";
import customVideo from "../components/customVideo.vue";

@Options({
  components: { customVideo },
})
export default class Home extends Vue {
  videos: Video[] = [];

  async beforeMount(): Promise<void> {
    this.videos = await exploreQuery();
  }
}
</script>
