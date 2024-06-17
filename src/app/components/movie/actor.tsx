/* eslint-disable @typescript-eslint/naming-convention */

'use client';

import { Personnel } from '../../common/types';
import { MOVIE_DB_IMAGE_URL } from '../../api/movie.service';

export default function Actor(actor: Personnel) {
  const { profile_path, name, character } = actor;
  return (
    <div className="movie-cast__item">
      {profile_path ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="movie-cast__img"
          alt={name}
          title={name}
          src={`${MOVIE_DB_IMAGE_URL.small + profile_path}`}
        />
      ) : (
        <div className="movie-cast__nophoto">NO PHOTO</div>
      )}
      <div className="movie-cast__info">
        <span>{name}</span>
        <br />
        <span className="small">{character}</span>
      </div>
    </div>
  );
}
