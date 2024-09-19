<template>
  <div>
    <transition name="fade">
      <div
        v-if="showNotification"
        class="notification"
        :class="notificationType"
      >
        {{ notificationMessage }}
      </div>
    </transition>

    <button class="favorite-toggle-button" @click.prevent.stop="toggleWishList">
      <img :src="icon" alt="Favorite" class="favorite-icon" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

import wishListedIcon from '@/assets/icons/heart_fullfiled.svg';
import unWishListedIcon from '@/assets/icons/heart_outline.svg';
import { Character } from '@/models';
import { useStore } from '@/store';
import { ActionEnums } from '@/store/modules/wish-list/types';

const props = defineProps<{
  character: Character;
}>();

const store = useStore();

const isInWishList = computed(() => {
  return !!store?.state?.wishList?.characters?.find(
    char => char.id === props.character.id,
  );
});

const icon = computed(() => {
  return isInWishList.value ? wishListedIcon : unWishListedIcon;
});

const showNotification = ref(false);
const notificationMessage = ref('');
const notificationType = ref('');

const toggleWishList = () => {
  const action = isInWishList.value
    ? ActionEnums.ACTION_REMOVE_FROM_WISH_LIST
    : ActionEnums.ACTION_ADD_TO_WISH_LIST;

  store.dispatch(action, props.character).then(() => {
    showNotification.value = true;
    notificationMessage.value = isInWishList.value
      ? `${props.character.name} has been added to favorites!`
      : `${props.character.name} has been removed from favorites!`;
    notificationType.value = isInWishList.value ? 'added' : 'removed';

    setTimeout(() => {
      showNotification.value = false;
    }, 2000);
  });
};
</script>

<style scoped>
.favorite-toggle-button {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}

.favorite-icon {
  width: 30px;
  height: 30px;
}

.notification {
  position: fixed;
  top: 61%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 255, 0, 0.8);
  color: white;
  padding: 8px 10px;
  border-radius: 5px;
  transition: opacity 0.5s ease;
  z-index: 1000;
  font-size: 0.7rem;
  width: 100%;
}

.notification.added {
  background-color: green;
}

.notification.removed {
  background-color: red;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
