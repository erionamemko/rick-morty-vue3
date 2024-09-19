<script setup lang="ts">
import { computed } from 'vue';

import FavoriteButton from './FavoriteButton.vue';
import { Character } from '@/models';

export interface CharacterCardSummaryProps {
  character: Character;
  index?: number;
  dataTestId?: string;
}

const props = defineProps<CharacterCardSummaryProps>();
const emit = defineEmits<{
  (event: 'show-details', character: Character): void;
}>();

const computedDataTestId = computed(() => {
  return props?.dataTestId || 'character-card-summary';
});

const showDetails = () => {
  emit('show-details', props.character);
};
</script>

<template>
  <div
    :id="`${computedDataTestId}${index !== undefined ? `-${index}` : ''}`"
    class="card"
    :index="index"
    @click.prevent="showDetails"
  >
    <div
      class="card-image"
      :style="{ backgroundImage: `url(${props.character.image})` }"
    ></div>
    <div class="card-title-wrapper">
      <div class="card-title">
        {{ props.character.name }}
      </div>
      <FavoriteButton :character="props.character" class="wish-list" />
    </div>
  </div>
</template>

<style scoped>
.card {
  overflow: hidden;
  border: 1px solid var(--color-primary);
  border-radius: 15px;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  transition: border-color 150ms linear;
  gap: var(--spacing-small);
  position: relative;
  cursor: pointer;
  :hover {
    background-color: black;
  }
}
.wish-list {
  & > img {
    width: 40px;
    height: 40px;
  }
}
.details-button {
  margin-top: 10px;
  padding: 12px 16px;
  background-color: var(--color-primary);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  width: 100%;
  margin: auto;
  text-align: center;
  font-weight: bold;
}

.details-button:hover {
  background-color: var(--color-primary);
}

.card-image {
  width: 100%;
  height: 200px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  box-shadow: rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset;
}

.card-title {
  text-align: center;
  font-weight: bold;
  margin-top: 10px;
  font-size: large;
}
.card-title-wrapper {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  display: flex;
  width: 100%;
  position: absolute;
  width: min-content;
  background: #00000087;
  margin: auto;
  width: 100%;
  bottom: 0;

  bottom: 0;
  padding-bottom: 8px;
  padding-left: 12px;
  padding-right: 5px;
  padding-top: 0;
  align-items: end;
}
</style>
