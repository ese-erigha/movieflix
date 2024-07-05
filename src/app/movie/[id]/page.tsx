import { Metadata, ResolvingMetadata } from 'next';

import { WEBSITE_NAME } from '../../common/constants';
import { getMovie, getActors, getMovieImages } from '../../api/movie.service';
import { getRecommendationsForMovie } from '../../api/recommender.service';
import { findAllGenres } from '../../api/genre.service';
import BackDrop from '../../components/movie/backdrop';
import Description from '../../components/movie/description';
import Cast from '../../components/movie/cast';
import Gallery from '../../components/movie/gallery';
import RecommendationList from '../../components/movie/recommendation-list';

interface Props {
  params: { id: string; };
  searchParams: { recMovie: string; };
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

export default async function Page({ params, searchParams }: Props) {
  const { id } = params;
  const { recMovie } = searchParams;
  const [movie, actorsResponse, imagesResponse, recommendationsResponse, genres] =
    await Promise.all([
      getMovie(id),
      getActors(id),
      getMovieImages(id),
      getRecommendationsForMovie(recMovie),
      findAllGenres(),
    ]);

  if (!movie || !actorsResponse || !imagesResponse) 
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <></>;

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
