import { Genre, RecMovie, RouteFilter } from './types';

export const routeFilters: RouteFilter[] = [
  // { key: 'popular', value: 'Popular' },
  // { key: 'now_playing', value: 'Now Playing' },
  { key: 'top_rated', value: 'Top Rated' },
  // { key: 'upcoming', value: 'Upcoming' },
];

export const getPathsFromCurrentLocation = (pathname: string) => {
  const paths = pathname.split('/');
  const basePath = paths[1].toLowerCase();
  const param = paths[2] ?? null;
  return { basePath, param };
};

export const formatVote = (vote: number) => parseFloat(vote.toFixed(1));

export const buildGenreText = (genres: Genre[], movie: RecMovie) => {
  const genreIds = movie.genre_ids || (movie.genres ? movie.genres.map((genre)=> genre.id): []);
  
  if (!genreIds.length) return '';
  return genreIds
    .map((id) => {
      const item = genres.find((genre) => genre.id === id);
      return item ? item.name : null;
    })
    .join(', ');
};

export const getInitialPage = (page?: string) => (page ? parseInt(page, 10) - 1 : 0);

export const generateUid = (low: number = 1, high: number = 611) => {
  const min = Math.ceil(low);
  const max = Math.floor(high);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
