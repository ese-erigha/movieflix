import { cache } from 'react';
import { getGenres } from './movieService';

export const findAllGenres = cache(async () => {
  const movieGenres = await getGenres();
  return movieGenres.genres || [];
});
