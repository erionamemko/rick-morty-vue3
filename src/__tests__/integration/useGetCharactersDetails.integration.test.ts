import { describe, it, expect, vi } from 'vitest';
import { baseApi } from '@/services/base-api';
import { useGetCharacterDetails } from '@/services';
import { Character } from '@/models';

vi.mock('@/services/base-api', () => ({
  baseApi: {
    get: vi.fn(url => {
      if (url.startsWith('/character/')) {
        return Promise.resolve({
          data: { id: 1, name: 'Rick Sanchez' } as Character,
        });
      }
      return Promise.resolve({
        data: { id: 1, name: 'Rick Sanchez' },
      });
    }),
  },
}));

describe('useGetCharacterDetails', () => {
  it('should fetch character details correctly', async () => {
    const characterId = 1;
    const { character, loading, error, fetchCharacterDetails } =
      useGetCharacterDetails(characterId);

    await fetchCharacterDetails();
    await new Promise(setImmediate);

    expect(baseApi.get).toHaveBeenCalledWith(`/character/${characterId}`);

    expect(loading.value).toBe(false);
    expect(error.value).toBe(null);
    expect(character.value).toEqual({ id: 1, name: 'Rick Sanchez' });
  });

  it('should fetch episodes correctly', async () => {
    const { fetchEpisodes } = useGetCharacterDetails(1);
    const episodeUrls = ['https://example.com/episode/1'];

    const episodes = await fetchEpisodes(episodeUrls);

    expect(baseApi.get).toHaveBeenCalledWith('https://example.com/episode/1');
    expect(episodes).toEqual([{ id: 1, name: 'Rick Sanchez' }]);
  });
});
