/* eslint-disable no-param-reassign */
import { Mutations, ActionEnums } from './types';
import { Character } from '@/models';
import { encryptStorage } from '@/utils';

export const mutations: Mutations = {
  [ActionEnums.MUTATE_ADD_TO_WISH_LIST]: (state, character: Character) => {
    state.characters.push(character);
    encryptStorage.setItem('wish-list', state.characters);
  },
  [ActionEnums.MUTATE_REMOVE_FROM_WISH_LIST]: (state, character: Character) => {
    state.characters = state.characters.filter(c => c.id !== character.id);
    encryptStorage.setItem('wish-list', state.characters);
  },
};
