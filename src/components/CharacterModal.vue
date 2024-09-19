<script setup lang="ts">
import { ref } from 'vue';

import CardComponent from './CardComponent.vue';
import FavoriteButton from './FavoriteButton.vue';
import { Character, Episode } from '@/models';

const props = defineProps<{
  character: Character | null;
  visible: boolean;
  loading: boolean;
  episodes: Array<Episode>;
}>();

const emit = defineEmits<{
  (event: 'close'): void;
  (event: 'toggle-episodes'): void;
}>();
const isExiting = ref(false);
const showEpisodes = ref(false);

function close() {
  isExiting.value = true;
  showEpisodes.value = false;
  emit('close');
}
function toggleEpisodes() {
  showEpisodes.value = !showEpisodes.value;

  if (showEpisodes.value) emit('toggle-episodes');
}
</script>

<template>
  <div v-if="visible && character" class="modal-overlay">
    <div class="portal"></div>
    <div :class="['modal-content', { 'slide-out': isExiting }]">
      <button class="close-button" @click="close">X</button>
      <CardComponent>
        <div
          v-if="character.image"
          class="modal-image"
          :style="{ backgroundImage: `url(${character.image})` }"
        ></div>
        <div class="character-section">
          <h2 class="character-name">{{ character.name }}</h2>
          <p class="character-description">
            Meet <span class="highlight">{{ character.name }}</span
            >,
            <span class="highlight">
              {{
                character.gender == 'unknown'
                  ? 'a being of unknown gender'
                  : character.gender
              }}
            </span>
            who is
            <span
              :class="{
                highlight: true,
                'status-alive': character.status === 'Alive',
                'status-dead': character.status === 'Dead',
                'status-unknown': character.status === 'unknown',
              }"
            >
              {{
                character.status == 'unknown'
                  ? 'in an unknown state of life'
                  : character.status
              }}
            </span>
            and belongs to the
            <span class="highlight">{{ character.species }}</span> race. This
            character has made an appearance in
            <span class="highlight">{{ character.episode.length }}</span>
            episodes of the multiverse.
          </p>
          <button
            :disabled="loading"
            class="toggle-button"
            :class="{ loading: loading }"
            @click="toggleEpisodes"
          >
            <span v-if="!loading">
              {{ showEpisodes ? 'Hide Episodes' : 'Show Episodes' }}
            </span>
          </button>

          <div v-if="showEpisodes && !loading" class="episodes-container">
            <ul class="episodes-list">
              <li v-for="episode in episodes" :key="episode.id">
                {{ episode.episode }} - {{ episode.name }}
              </li>
            </ul>
          </div>
        </div>
        <FavoriteButton :character="props.character" class="wish-list" />
      </CardComponent>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(0 0 0 / 83%);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.modal-image {
  width: 100%;
  background-color: #000000;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  @media (max-width: 768px) {
    height: 280px;
  }
}
.character-name {
  font-size: 1.5em;
  font-family: 'Comic Sans MS', cursive;
  color: #ffeb3b;
  margin: 16px 0;
}
.character-section {
  text-align: left;
  margin: 16px;
  @media (min-width: 768px) {
    margin-right: 24px;
  }
}
.character-description {
  font-size: 1.1em;
  color: #ffffff;
}

.highlight {
  font-weight: bold;
  color: #76ff03;
}

.status-alive {
  color: #76ff03;
}

.status-dead {
  color: red;
}
.status-unknown {
  color: #ff7947;
}

.portal {
  position: absolute;
  width: 600px;
  height: 600px;
  background: radial-gradient(
    circle,
    rgba(0, 255, 0, 0.7) 30%,
    rgba(0, 0, 0, 0) 60%
  );
  border-radius: 50%;
  animation: portal-appear 0.9s ease-in-out forwards;
  z-index: 0;
}

@keyframes portal-appear {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
  80% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}

.modal-content {
  background: #0000004a;
  border-radius: 8px;
  width: 80%;
  max-width: 600px;
  position: relative;
  text-align: center;
  animation: modal-slide-in 0.9s ease-in-out forwards;
  z-index: 1;
}

@keyframes modal-slide-in {
  0% {
    transform: translateY(-100%);
    opacity: 0;
    max-width: 50px;
    border-radius: 0;
    transform: rotate(0deg);
  }
  50% {
    transform: translateY(0);
    opacity: 1;
    max-width: 300px;
    border-radius: 100px;
    transform: rotate(360deg);
  }
  100% {
    transform: translateY(0);
    opacity: 1;
    max-width: 600px;
    border-radius: 100px;
    transform: rotate(360deg);
  }
}
.close-button {
  position: absolute;
  top: 6px;
  left: 8px;
  background: red;
  color: white;
  border: none;
  border-radius: 15%;
  width: 20px;
  height: 20px;
  cursor: pointer;
  z-index: 1;
  font-size: small;
  font-weight: bold;
  min-width: 28px;
  min-height: 24px;
}

.wish-list {
  position: absolute;
  z-index: 12;
  padding: 0;
  border: 0;
  bottom: 0;
  width: 40px;
  height: 40px;
  background-color: transparent;
  outline: 0;

  @media (max-width: 768px) {
    top: 54%;
    left: 83%;
  }

  & > img {
    width: 60px;
    height: 60px;
  }
}
.toggle-button {
  margin-top: 21px;
  padding: 8px 12px;
  background-color: #5bc303;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  width: 100%;
  height: 30px;
  font-size: 0.8rem;
}
.toggle-button:hover {
  background-color: #66cc02;
}
.toggle-button.loading::after {
  content: '';
  display: inline-block;
  position: absolute;
  width: 18px;
  height: 18px;
  border: 2px solid rgb(255 255 255);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin-90bdb218 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.episodes-container {
  height: 8rem;
  overflow-y: auto;
  margin-top: 10px;
  background-color: rgb(0, 0, 0);
  padding: 10px;
  border-radius: 5px;
  z-index: 111;
  top: 66px;
  left: 29%;
  width: 400px;

  @media (max-width: 768px) {
    position: absolute;
    height: 8.2rem;
    overflow-y: auto;
    margin-top: 14px;
    background-color: rgb(0, 0, 0);
    padding: 18px;
    border-radius: 5px;
    z-index: 10;
    top: 62%;
    left: 1%;
    width: 94%;
    box-shadow:
      rgba(17, 17, 26, 0.1) 0px 4px 16px,
      rgba(17, 17, 26, 0.1) 0px 8px 24px,
      rgba(17, 17, 26, 0.1) 0px 16px 56px;
  }
}

.episodes-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
/* Works on Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: #76ff03 black;
}

/* Works on Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 12px;
}

*::-webkit-scrollbar-track {
  background: black;
}

*::-webkit-scrollbar-thumb {
  background-color: #76ff03;
  border-radius: 10px;
  border: 3px solid black;
}
</style>
