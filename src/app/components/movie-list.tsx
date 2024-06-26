'use client';

import { useRouter } from 'next/navigation';

import ReactPaginate from 'react-paginate';
import MovieCard from './movie-card';
import { Genre, RecMovie } from '../common/types';

export type Props = {
  movies: RecMovie[];
  genres: Genre[];
  pageCount: number;
  initialPage: number;
  category?: string;
  user?: string;
};

export default function MovieList(props: Props) {
  const { movies, genres, pageCount, initialPage, category, user } = props;
  const router = useRouter();

  const pageChangeHandler = ({ selected }: { selected: number }) => {
    let url = `/user/${user}/${selected + 1}`;
    if(category){
      url = `/movies/${category}/${selected + 1}`
    }
    router.push(url);
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
