<script setup lang="ts">
import {
  ListContainer,
  PageWrapper,
  EmptyState,
  CharacterCardSummary,
  CharacterModal,
} from '@/components';
import { useCharacterDetails } from '@/composables/useCharacterDetails';
import { useStore } from '@/store';

const store = useStore();

const {
  selectedCharacter,
  episodes,
  showEpisodesLoading,
  isModalVisible,
  fetchCharacterDetails,
  fetchEpisodes,
  closeModal,
} = useCharacterDetails();

function onShowDetails(characterId: number) {
  fetchCharacterDetails(characterId);
}
</script>

<template>
  <PageWrapper title="Favorites">
    <ListContainer v-if="!!store.state.wishList.characters.length">
      <CharacterCardSummary
        v-for="(character, index) in store.state.wishList.characters"
        :key="character.id"
        :index="index"
        :character="character"
        @show-details="onShowDetails(character.id)"
      />
    </ListContainer>
    <EmptyState v-else />

    <CharacterModal
      :character="selectedCharacter"
      :visible="isModalVisible"
      :episodes="episodes"
      :loading="showEpisodesLoading"
      @toggle-episodes="fetchEpisodes"
      @close="closeModal"
    />
  </PageWrapper>
</template>
