import { describe, it, expect, vi } from 'vitest';
import { baseApi } from '@/services/base-api';
import { useGetCharacters } from '@/services';

vi.mock('@/services/base-api', () => ({
  baseApi: {
    get: vi.fn().mockResolvedValue({
      data: {
        info: { count: 1, pages: 1, next: '', prev: '' },
        results: [{ id: 1, name: 'Rick Sanchez' }],
      },
    }),
  },
}));

describe('useGetCharacters', () => {
  it('should fetch characters correctly', async () => {
    const { data, error, loading } = useGetCharacters({
      page: 1,
      name: 'Rick',
    });

    await new Promise(setImmediate);

    expect(baseApi.get).toHaveBeenCalledWith('/character', {
      params: { page: 1, name: 'Rick' },
    });

    expect(loading.value).toBe(false);
    expect(error.value).toBe(null);
    expect(data.value).toEqual({
      info: { count: 1, pages: 1, next: '', prev: '' },
      results: [{ id: 1, name: 'Rick Sanchez' }],
    });
  });
});
