import { Character } from '@/models';

import { Actions, ActionEnums } from './types';

export const actions: Actions = {
  [ActionEnums.ACTION_ADD_TO_WISH_LIST]: ({ commit }, data: Character) => {
    commit(ActionEnums.MUTATE_ADD_TO_WISH_LIST, data);
  },
  [ActionEnums.ACTION_REMOVE_FROM_WISH_LIST]: ({ commit }, data: Character) => {
    commit(ActionEnums.MUTATE_REMOVE_FROM_WISH_LIST, data);
  },
};
