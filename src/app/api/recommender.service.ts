import { MoviesResponseDto } from "../common/types";
import { HttpClientType } from "./http.client";
import { fetchData } from "./movie.service";

export const getTopRatedMovies = (params: { page: number }) =>
  fetchData<MoviesResponseDto>(`/movies/top-rated/${params.page}`, undefined , HttpClientType.RECOMMENDER);

export const getRecommendationsForMovie = (id: string, page: number = 1) => fetchData<MoviesResponseDto>(`/movie/${id}/${page}`, undefined , HttpClientType.RECOMMENDER)
