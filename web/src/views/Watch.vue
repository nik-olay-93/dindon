<template>
  <custom-video v-if="video" :video="video" />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { useRoute } from "vue-router";
import customVideo from "../components/customVideo.vue";
import Video from "../entites/video/entity.video";
import store, { useStore } from "../store";

@Options({
  components: { customVideo },
})
export default class Watch extends Vue {
  router = useRoute();
  store = useStore();
  id = "";

  async beforeMount(): Promise<void> {
    this.id = this.router.params.id as string;
    await store.dispatch("fetchSingleVideo", this.id);
  }

  get video(): Video {
    return this.store.getters.getVideoById(this.id);
  }
}
</script>
