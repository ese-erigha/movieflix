'use client';

import { Genre, RecMovie } from '../../common/types';
import MovieCard from '../movie-card';

type Props = {
  movies: RecMovie[];
  genres: Genre[];
};
export default function RecommendationList(props: Props) {
  const { movies, genres } = props;

  if(!movies.length || !genres.length) return <div/>

  return (
    <div className="movie-recommendations">
      <h3 className="list-title list-title-dark mb-4">Recommendations</h3>
      <div data-testid="movie-list" className="d-flex flex-wrap">
        {movies.map((movie) => (
          <MovieCard genres={genres} movie={movie} key={`m${movie.id}`} />
        ))}
      </div>
    </div>
  );
}
