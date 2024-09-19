import type { WishListState } from './types';
import { Character } from '@/models';
import { encryptStorage } from '@/utils';

const prevState = encryptStorage.getItem<Character[]>('wish-list') || [];

export const state: WishListState = {
  characters: prevState,
};
