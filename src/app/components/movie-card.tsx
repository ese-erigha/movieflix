'use client';

import Card from 'react-bootstrap/Card';
import noImage from '../../assets/img/noimage.png';
import { MOVIE_DB_IMAGE_URL } from '../api/movieService';
import { buildGenreText } from '../common/helper';
import { Genre, Movie } from '../common/types';

type Props = {
  movie: Movie;
  genres: Genre[];
};

export default function MovieCard(props: Props) {
  const { movie, genres } = props;
  const genreText = buildGenreText(genres, movie?.genre_ids);

  return (
    <Card className="movie-card">
      <a data-testid="link" href={`/movie/${movie.id}`}>
        <Card.Img
          id="image"
          alt={movie.title}
          className="fadeIn animated"
          variant="top"
          src={movie.poster_path ? `${MOVIE_DB_IMAGE_URL.medium}${movie.poster_path}` : noImage.src}
        />
        <Card.Body>
          {movie.vote_average > 0 && (
            <span className="card-rating text-center">{ parseFloat(movie.vote_average.toFixed(1))}</span>
          )}
          <Card.Title className="mr-4">{movie.title}</Card.Title>
          {genreText && (
            <p data-testid="genre" className="small mb-0">
              {genreText}
            </p>
          )}
        </Card.Body>
      </a>
    </Card>
  );
}
