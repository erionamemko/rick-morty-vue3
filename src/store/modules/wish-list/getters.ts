import { Getters } from './types';

export const getters: Getters = {
  getWishList(state) {
    return state.characters;
  },
};
