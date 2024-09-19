import { actions } from './actions';
import { getters } from './getters';
import { mutations } from './mutations';
import { state } from './state';

export type { WishListState } from './types';

export const wishList = {
  state,
  actions,
  getters,
  mutations,
};
