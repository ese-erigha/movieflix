import { Metadata, ResolvingMetadata } from 'next';

import MovieList from '../../../components/movie-list';
import { getInitialPage } from '../../../common/helper';
import { WEBSITE_NAME } from '../../../common/constants';
import { findAllGenres } from '../../../api/genre.service';
import { getRecommendationsForUser } from '../../../api/recommender.service';

interface Props {
  params: { id: string; page: string; };
}

export function generateMetadata(
  { params }: Props, // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _parent: ResolvingMetadata,
): Metadata {
    const { id } = params;
  return {
    title: `Top rated for user - ${id} / ${WEBSITE_NAME}`,
    description: 'Movie Categories',
    icons: {
      icon: '/favicon.png',
    },
  };
}

export default async function Page({ params }: Props) {
  const { id, page } = params;
  const currentPage = parseInt(page, 10);

  const [genres, movieResponse] = await Promise.all([
    findAllGenres(),
    getRecommendationsForUser({ id, page: currentPage }),
  ]);

  if (!genres?.length || !movieResponse.results?.length || !movieResponse.total_pages)
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <></>;

  const initialPage = getInitialPage(page);

  return (
    <MovieList
      movies={movieResponse.results}
      genres={genres}
      pageCount={movieResponse.total_pages}
      initialPage={initialPage}
      user = { id }
    />
  );
}
