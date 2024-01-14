import type { Metadata, ResolvingMetadata } from 'next';

import MovieList from '../../../components/movie-list';
import { getInitialPage, routeFilters } from '../../../common/helper';
import { WEBSITE_NAME } from '../../../common/constants';
import LoadingSpinner from '../../../components/loading';
import { findAllGenres } from '../../../api/genreService';
import { getMovies } from '../../../api/movieService';

interface Props {
  params: { category: string; page: string };
}

export function generateMetadata(
  { params }: Props,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _parent: ResolvingMetadata,
): Metadata {
  const { category } = params;
  const route = routeFilters.find((item) => item.key === category);
  return {
    title: `${route!.value} / ${WEBSITE_NAME}`,
    icons: {
      icon: '/favicon.png'
    },
  };
}

export default async function Page({ params }: Props) {
  const { category, page } = params;
  const currentPage = parseInt(page, 10);

  const [genres, movieResponse] = await Promise.all([
    findAllGenres(),
    getMovies({ category, page: currentPage }),
  ]);

  if (!genres?.length || !movieResponse.results?.length || !movieResponse.total_pages)
    return <LoadingSpinner />;

  const initialPage = getInitialPage(page);

  return (
    <MovieList
        movies={movieResponse.results}
        genres={genres}
        pageCount={movieResponse.total_pages}
        initialPage={initialPage}
        category={category}
      />
  );
}
