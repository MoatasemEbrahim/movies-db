import React, {
  FC, useState, useEffect, useRef, useContext,
} from 'react';
import moviesAPIs from '../../apis/moviesApis';
import MovieCard from '../shared/MovieCard/MovieCard';
import { GlobalContext } from '../../Contexts/GlobalContext';
import styles from './Movies.module.scss';

enum MoviesFilter {
  'Popular' = 'popular',
  'Top Rated' = 'top_rated',
  'Upcoming' = 'upcoming',
}

const Movies:FC = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [moviesFilter, setMoviesFilter] = useState<MoviesFilter>(MoviesFilter.Popular);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const { moviesGenres } = useContext(GlobalContext);
  const loader = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const newMovies = await moviesAPIs.getMovies(moviesFilter, currentPage);
        const newMoviesFilteredMovies = newMovies.map(
          ({
            id, title, poster_path, release_date, vote_average, genre_ids,
          }) => ({
            id,
            title,
            poster_path,
            release_date,
            vote_average,
            genres: genre_ids.map((genreId) => moviesGenres[genreId]),
          }),
        );
        setMovies((prevMovies) => [...prevMovies, ...newMoviesFilteredMovies]);
      } catch (error) {
        console.warn(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [moviesFilter, currentPage, moviesGenres]);

  const handleFilterChange = (newFilter:MoviesFilter) => () => {
    setMovies([]);
    setCurrentPage(1);
    setMoviesFilter(newFilter);
  };

  const handleScrolling = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setCurrentPage((page) => page + 1);
    }
  };
  useEffect(() => {
    const options = { root: null, rootMargin: '10px', threshold: 1.0 };

    const observer = new IntersectionObserver(handleScrolling, options);
    if (loader.current) {
      observer.observe(loader.current);
    }
  }, []);

  return (
    <div>
      <div className={styles.filters}>
        {Object.entries(MoviesFilter).map(
          ([key, value]) => <button key={value} type="button" onClick={handleFilterChange(value)}>{key}</button>,
        )}
      </div>
      <div className={styles.loading}>{loading && <p>Loading ...</p>}</div>
      <div className={styles.movies}>
        {movies.map(({
          id, title, poster_path, release_date, vote_average, genres,
        }) => (
          <MovieCard
            key={id}
            id={id}
            title={title}
            img={poster_path}
            date={release_date}
            vote={vote_average}
            genres={genres}
          />
        ))}
      </div>
      <div className={styles['load-more']} ref={loader}>
        {!loading && <h2>Loading ...</h2>}
      </div>
    </div>
  );
};

export default Movies;

interface IMovie {
  id: string,
  title: string,
  poster_path: string,
  release_date: string,
  vote_average: number,
  genres: string[],
}
