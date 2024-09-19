import { ref, Ref } from 'vue';

interface ApiWrapperOptions<DataType = any> {
  fetcher: (
    params?: Record<string, string | number | boolean>,
  ) => Promise<DataType | null>;
}

export function useApiWrapper<DataType = any>({
  fetcher,
}: ApiWrapperOptions<DataType>) {
  const data = ref<DataType | null>(null) as Ref<DataType | null>;
  const error = ref<Error | null>(null);
  const loading = ref<boolean>(true);

  function initFetcher() {
    loading.value = true;
    fetcher()
      .then(response => {
        data.value = response;
      })
      .catch(fetcherError => {
        error.value = fetcherError as Error;
      })
      .finally(() => {
        loading.value = false;
      });
  }

  initFetcher();

  return { data, error, loading, fetcher };
}
