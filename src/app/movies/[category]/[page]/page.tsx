// import { Helmet } from 'react-helmet';

import MovieList from '../../../components/movie-list';
import { getInitialPage } from '../../../common/helper';
// import { WEBSITE_NAME } from '../../../common/constants';
import LoadingSpinner from '../../../components/loading';
import { findAllGenres } from '../../../api/genreService';
import { getMovies } from '../../../api/movieService';

export default async function Page({ params }: { params: { category: string; page: string } }) {
  const { category, page } = params;
  const currentPage = parseInt(page, 10);

  const [genres, movieResponse] = await Promise.all([
    findAllGenres(),
    getMovies({ category, page: currentPage }),
  ]);

  if (!genres?.length || !movieResponse.results?.length || !movieResponse.total_pages) return <LoadingSpinner />;

  // const route = routeFilters.find((item) => item.key === category);
  const initialPage = getInitialPage(page);

  return (
    <>
      {/* <Helmet>
        <title>{`${route!.value} / ${WEBSITE_NAME}`}</title>
      </Helmet> */}
      <MovieList
        movies={movieResponse.results}
        genres={genres}
        pageCount={movieResponse.total_pages}
        initialPage={initialPage}
        category={category}
      />
    </>
  );
}
