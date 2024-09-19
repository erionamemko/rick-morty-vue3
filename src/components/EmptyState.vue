<script setup lang="ts">
import { computed } from 'vue';

import emptyRick from '@/assets/empty-rick.png';
import mortyUnknown from '@/assets/morty-unknown.png';
import rickAndMortyFuck from '@/assets/rick-and-morty-fuck.png';
import rickUnknown from '@/assets/rick-unknown.png';

const image = computed(() => {
  const images = [emptyRick, mortyUnknown, rickAndMortyFuck, rickUnknown];
  const index = Math.floor(Math.random() * images.length);

  return {
    src: images[index],
    width: index === 0 ? 110 : 300,
  };
});
</script>

<template>
  <div class="empty-container">
    <img
      :src="image.src"
      alt="empty state"
      :style="`width: ${image.width}px`"
    />
    <h3>Oh no, Morty!</h3>
    <p class="empty-container__text">
      It seems you haven't added anything to your favorites yet! <br />
      It's as if we've traveled to a parallel universe where your tastes don't
      exist! <br />
      Add something interesting! <br /><br />
      Don't let this page become a black hole of boredom. Go explore, find your
      treasures, and fill it with wonders!
    </p>
  </div>
</template>

<style scoped lang="scss">
.empty-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & img {
    width: 200px;
    height: auto;
    max-width: 96%;
  }
  &__text {
    text-align: center;
    margin-top: 10px;
  }
}
</style>
