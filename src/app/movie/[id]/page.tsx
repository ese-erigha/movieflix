import { Metadata, ResolvingMetadata } from 'next';

import { WEBSITE_NAME } from '../../common/constants';
import LoadingSpinner from '../../components/loading';
import { getMovie, getActors, getMovieImages, getRecommendations } from '../../api/movie.service';
import { findAllGenres } from '../../api/genre.service';
import BackDrop from '../../components/movie/backdrop';
import Description from '../../components/movie/description';
import Cast from '../../components/movie/cast';
import Gallery from '../../components/movie/gallery';
import RecommendationList from '../../components/movie/recommendation-list';

interface Props {
  params: { id: string; };
}

export async function generateMetadata(
  { params }: Props, 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  const { id } = params;

  const movie = await getMovie(id);

  return {
    title: `${movie.title} / ${WEBSITE_NAME}`,
    description: `${movie.overview}`,
    icons: {
      icon: '/favicon.png',
    },
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const [movie, actorsResponse, imagesResponse, recommendationsResponse, genres] =
    await Promise.all([
      getMovie(id),
      getActors(id),
      getMovieImages(id),
      getRecommendations(id),
      findAllGenres(),
    ]);

  if (!movie || !actorsResponse || !imagesResponse) return <LoadingSpinner />;

  return (
    <>
      <BackDrop {...movie} />
      <div className="d-flex flex-column">
        <Description {...movie} />
        <Gallery images={imagesResponse.backdrops} />
        <Cast actors={actorsResponse.cast} />
        <RecommendationList genres={genres} movies={recommendationsResponse.results} />
      </div>
    </>
  );
}
