import { ref, watch } from 'vue';

import { baseApi } from './base-api';
import { Character, ApiPaginatedResponse } from '@/models';

interface ParamsType {
  page?: number;
  name?: string;
}

const cache = new Map<string, ApiPaginatedResponse<Character>>();
const characterCache = new Map<number, Character>();

export function useGetCharacters(params?: ParamsType) {
  const data = ref<ApiPaginatedResponse<Character> | null>(null);
  const error = ref<Error | null>(null);
  const loading = ref<boolean>(true);

  function fetchCharacters(queryParams?: ParamsType) {
    const cacheKey = JSON.stringify(queryParams);

    // Check if the data is already cached
    if (cache.has(cacheKey)) {
      data.value = cache.get(cacheKey)!;
      loading.value = false;
      return;
    }

    loading.value = true;
    baseApi
      .get<ApiPaginatedResponse<Character>>('/character', {
        params: queryParams,
      })
      .then(response => {
        data.value = response.data || null;

        // Cache the response
        if (response.data) {
          cache.set(cacheKey, response.data);
        }
      })
      .catch(apiError => {
        error.value = apiError;
      })
      .finally(() => {
        loading.value = false;
      });
  }

  fetchCharacters(params);

  function refetch(newParams?: ParamsType) {
    fetchCharacters({ ...(params || {}), ...(newParams || {}) });
  }

  watch(
    () => params,
    newParams => {
      fetchCharacters(newParams);
    },
  );

  return { data, error, loading, refetch, characterCache };
}
