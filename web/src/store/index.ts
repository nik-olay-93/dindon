import meQuery from "@/entites/user/queries/me";
import { User } from "@/entites/user/user.interface";
import Video from "@/entites/video/entity.video";
import exploreQuery from "@/entites/video/queries/exploreVideos";
import watchQuery from "@/entites/video/queries/watchVideo";
import { InjectionKey } from "@vue/runtime-core";
import { createStore, Store, useStore as baseUseStore } from "vuex";

export interface State {
  user: User | undefined;
  videos: Video[];
}

export const key: InjectionKey<Store<State>> = Symbol();

export default createStore<State>({
  state: {
    user: undefined,
    videos: [],
  },
  mutations: {
    setUser(state, user: User) {
      state.user = user;
    },
    appendVideos(state, videos: Video[]) {
      if (videos.length > 0) {
        state.videos = state.videos.concat(videos);
      }
    },
  },
  actions: {
    async updateUser(context) {
      const user = await meQuery();

      context.commit("setUser", user);
    },

    async fetchVideos({ commit, state }, count = 20) {
      const lastDate =
        Date.parse(
          state.videos[state.videos.length - 1]?.createdAt.toString()
        ).valueOf() ?? Date.now();
      const response = await exploreQuery(count, lastDate);

      commit("appendVideos", response);
    },

    async fetchSingleVideo({ commit, getters }, id: string) {
      if (getters.getVideoById(id) != undefined) {
        return;
      }
      const video = await watchQuery(id);
      if (video) {
        commit("appendVideos", [video]);
      }
    },
  },
  getters: {
    getVideoById: (state) => (id: string) => {
      return state.videos.find((video) => video.id == id);
    },
    getAllVideos: async (state) => {
      const { dispatch } = useStore();
      if (state.videos.length == 0) {
        dispatch("fetchVideos");
      }
      return state.videos;
    },
  },
  modules: {},
});

export function useStore(): Store<State> {
  return baseUseStore(key);
}
