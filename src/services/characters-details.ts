import { ref } from 'vue';

import { baseApi } from './base-api';
import { Character } from '@/models';

const characterCache = new Map<number, Character>();
const episodesCache = new Map<string, any[]>();

export function useGetCharacterDetails(characterId: number) {
  const character = ref<Character | null>(null);
  const loading = ref<boolean>(true);
  const error = ref<Error | null>(null);

  async function fetchCharacterDetails() {
    if (characterCache.has(characterId)) {
      character.value = characterCache.get(characterId)!;
      loading.value = false;
      return;
    }

    loading.value = true;
    try {
      const response = await baseApi.get<Character>(
        `/character/${characterId}`,
      );
      character.value = response.data;
      characterCache.set(characterId, response.data);
    } catch (apiError) {
      error.value = apiError;
    } finally {
      loading.value = false;
    }
  }

  async function fetchEpisodes(episodeUrls: string[]) {
    const episodePromises = episodeUrls.map(async (url: string) => {
      const episodeId = url.split('/').pop();

      if (episodesCache.has(episodeId!)) {
        return episodesCache.get(episodeId!);
      }
      const episodeResponse = await baseApi.get(url);
      episodesCache.set(episodeId!, episodeResponse.data);

      return episodeResponse.data;
    });

    return Promise.all(episodePromises);
  }

  return { character, loading, error, fetchCharacterDetails, fetchEpisodes };
}
