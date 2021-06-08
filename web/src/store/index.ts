import meQuery from "@/entites/queries/me";
import { User } from "@/entites/user.interface";
import { InjectionKey } from "@vue/runtime-core";
import { createStore, Store, useStore as baseUseStore } from "vuex";

export interface State {
  user: User | undefined;
}

export const key: InjectionKey<Store<State>> = Symbol();

export default createStore<State>({
  state: {
    user: undefined,
  },
  mutations: {
    setUser(state, user: User) {
      state.user = user;
    },
  },
  actions: {
    async updateUser(context) {
      const user = await meQuery();

      context.commit("setUser", user);
    },
  },
  modules: {},
});

export function useStore(): Store<State> {
  return baseUseStore(key);
}
