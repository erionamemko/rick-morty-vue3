import {
  Mutation as XMutation,
  Action as XAction,
  Getter as XGetter,
} from 'vuex';

import { Character } from '@/models';

export interface WishListState {
  characters: Character[];
}

export type Mutation = XMutation<WishListState>;
export type Action = XAction<WishListState, WishListState>;
export type Getter = XGetter<WishListState, any>;

export enum ActionEnums {
  // GETTERS
  GETTER_WISH_LIST = 'wishList/GETTER_WISH_LIST',
  // ACTIONS
  ACTION_ADD_TO_WISH_LIST = 'wishList/ACTION_ADD_TO_WISH_LIST',
  ACTION_REMOVE_FROM_WISH_LIST = 'wishList/ACTION_REMOVE_FROM_WISH_LIST',
  // MUTATION
  MUTATE_ADD_TO_WISH_LIST = 'wishList/MUTATE_ADD_TO_WISH_LIST',
  MUTATE_REMOVE_FROM_WISH_LIST = 'wishList/MUTATE_REMOVE_FROM_WISH_LIST',
}

export type Actions = {
  [ActionEnums.ACTION_ADD_TO_WISH_LIST]: Action;
  [ActionEnums.ACTION_REMOVE_FROM_WISH_LIST]: Action;
};

export type Mutations = {
  [ActionEnums.MUTATE_ADD_TO_WISH_LIST]: Mutation;
  [ActionEnums.MUTATE_REMOVE_FROM_WISH_LIST]: Mutation;
};

export type Getters = {
  getWishList: Getter;
};
