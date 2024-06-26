'use client';

import Image from 'react-bootstrap/Image';
import tmdbLogo from '../../assets/img/tmdb_logo.png';

export default function Footer() {
  return (
    <footer className="footer text-center mt-4 mb-4 white">
      <span>&#169; 2024 made</span>
      {/* <i className="fa fa-heart heart space-left-7" aria-hidden="true" /> */}
      <span className="space-left-7">by</span>
      <a href="https://github.com/ese-erigha/movieflix" className="space-left-7">
        ese-erigha
      </a>
      <a
        data-testid="tmdb-link"
        href="https://developers.themoviedb.org/3/getting-started/introduction"
        rel="noopener noreferrer"
        target="_blank"
        className="space-left-15"
      >
        <Image alt="tmdb log" data-testid="tmdb-logo" src={tmdbLogo.src} />
      </a>
    </footer>
  );
}
