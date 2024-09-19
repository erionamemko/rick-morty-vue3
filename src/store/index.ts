/* eslint-disable symbol-description */
import { InjectionKey } from 'vue';

import { createStore, Store, useStore as baseUseStore, ModuleTree } from 'vuex';

import { wishList, WishListState } from './modules';

export type State = {
  wishList: WishListState;
};

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  modules: {
    wishList,
  } as unknown as ModuleTree<State>,
});

export function useStore() {
  return baseUseStore(key);
}
