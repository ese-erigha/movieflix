import { cache } from 'react';
import { getGenres } from './movie.service';

export const findAllGenres = cache(async () => {
  const movieGenres = await getGenres();
  return movieGenres.genres || [];
});
