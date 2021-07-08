<template>
  <div class="home">
    <ul v-for="(video, index) in store.state.videos" :key="index">
      <custom-video :video="video" />
    </ul>
    <button @click.prevent="moreVideos">Fetch More</button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import customVideo from "../components/customVideo.vue";
import { useStore } from "../store";

@Options({
  components: { customVideo },
})
export default class Home extends Vue {
  store = useStore();

  async beforeMount(): Promise<void> {
    await this.store.getters.getAllVideos;
  }

  moreVideos(): void {
    this.store.dispatch("fetchVideos", 1);
  }
}
</script>
