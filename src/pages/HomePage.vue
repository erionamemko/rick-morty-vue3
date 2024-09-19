<script setup lang="ts">
import { ref } from 'vue';

import {
  CharacterCardSummary,
  ListContainer,
  PageWrapper,
  PaginationComponent,
  SearchBar,
  CharacterModal,
} from '@/components';
import { useCharacterDetails } from '@/composables/useCharacterDetails';
import { useGetCharacters } from '@/services';

const currentPage = ref<number>(1);
const searchQuery = ref<string>('');
const showPagination = ref<boolean>(true);

const { data, loading, refetch } = useGetCharacters({
  page: currentPage.value,
  name: searchQuery.value,
});

const {
  selectedCharacter,
  episodes,
  showEpisodesLoading,
  isModalVisible,
  fetchCharacterDetails,
  fetchEpisodes,
  closeModal,
} = useCharacterDetails();

function onPageChange(newPage: number) {
  currentPage.value = newPage;
  refetch({ page: newPage, name: searchQuery.value });
}

function onSearch(query: string) {
  searchQuery.value = query;
  refetch({ page: 1, name: query });
}
</script>

<template>
  <PageWrapper
    title="Explore the Multiverse: Meet the Iconic Characters of Rick and Morty!"
  >
    <SearchBar class="search" @search="onSearch" />
    <ListContainer :loading="loading">
      <CharacterCardSummary
        v-for="(character, index) in data?.results"
        :key="character.id"
        :index="index"
        :character="character"
        @show-details="fetchCharacterDetails(character.id)"
      />
    </ListContainer>
    <PaginationComponent
      v-if="showPagination"
      :loading="loading"
      :pages="data?.info?.pages"
      :count="data?.info?.count"
      :next="data?.info?.next"
      :prev="data?.info?.prev"
      :page="currentPage"
      @page-change="onPageChange"
    />
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
