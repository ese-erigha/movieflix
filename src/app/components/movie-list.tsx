'use client';

import { useRouter } from 'next/navigation';

import ReactPaginate from 'react-paginate';
import MovieCard from './movie-card';
import { Genre, Movie } from '../common/types';

export type Props = {
  movies: Movie[];
  genres: Genre[];
  pageCount: number;
  initialPage: number;
  category: string;
};

export default function MovieList(props: Props) {
  const { movies, genres, pageCount, initialPage, category } = props;
  const router = useRouter();

  const pageChangeHandler = ({ selected }: { selected: number }) => {
    router.push(`/movies/${category}/${selected + 1}`);
  };

  return (
    <>
      <div
        data-testid="movie-list"
        className="d-flex flex-wrap justify-content-md-between justify-content-center"
      >
        {movies.map((movie) => (
          <MovieCard key={`${movie.id}${movie.title}`} movie={movie} genres={genres} />
        ))}
      </div>
      <ReactPaginate
        previousLabel="&larr;"
        nextLabel="&rarr;"
        breakLabel="..."
        breakClassName="break-me"
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={pageChangeHandler}
        // eslint-disable-next-line react/jsx-boolean-value
        disableInitialCallback={true}
        initialPage={initialPage}
        containerClassName="pagination"
        activeClassName="active"
      />
    </>
  );
}
