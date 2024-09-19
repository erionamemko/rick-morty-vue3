import { ref } from 'vue';

import { Character, Episode } from '@/models';
import { useGetCharacterDetails } from '@/services';

export function useCharacterDetails() {
  const selectedCharacter = ref<Character | null>(null);
  const episodes = ref<Episode[]>([]);
  const showEpisodesLoading = ref<boolean>(false);
  const isModalVisible = ref<boolean>(false);

  async function fetchCharacterDetails(characterId: number) {
    const { character, loading, fetchCharacterDetails } =
      useGetCharacterDetails(characterId);
    await fetchCharacterDetails();

    if (!loading.value) {
      selectedCharacter.value = character.value;
      isModalVisible.value = true;
    }
  }

  async function fetchEpisodes() {
    if (selectedCharacter.value) {
      showEpisodesLoading.value = true;
      const { fetchEpisodes } = useGetCharacterDetails(
        selectedCharacter.value.id,
      );
      episodes.value = await fetchEpisodes(selectedCharacter.value.episode);
      showEpisodesLoading.value = false;
    }
  }

  function closeModal() {
    isModalVisible.value = false;
    episodes.value = [];
  }

  return {
    selectedCharacter,
    episodes,
    showEpisodesLoading,
    isModalVisible,
    fetchCharacterDetails,
    fetchEpisodes,
    closeModal,
  };
}
