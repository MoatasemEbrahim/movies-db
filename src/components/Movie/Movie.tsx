import React, { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import moviesAPIs from '../../apis/moviesApis';
import Tag from '../shared/Tag/Tag';
import Rating from '../shared/Rating/Rating';
import ActorCard from '../shared/ActorCard/ActorCard';
import styles from './Movie.module.scss';

const Movie:FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [movieData, setMovieData] = useState<IMovie>();
  const { id: MovieId } = useParams();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await moviesAPIs.getMovieData(MovieId);
        const { cast } = await moviesAPIs.getMovieCredits(MovieId);
        setMovieData({ ...data, cast });
      } catch (error) {
        console.warn(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [MovieId]);

  const {
    title,
    genres,
    tagline,
    overview,
    cast,
    backdrop_path: backDropPath,
    poster_path: posterPath,
    vote_average: voteAverage,
  } = movieData || {};

  return (
    <div>
      {loading ? <p>Loading ...</p> : (
        <div>
          <div
            className={styles.cover}
            style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${backDropPath}?api_key=4f298a53e552283bee957836a529baec)` }}
          >
            <div className={styles.head}>
              <img src={`https://image.tmdb.org/t/p/w500${posterPath}?api_key=4f298a53e552283bee957836a529baec`} alt={title} />
              <div className={styles.info}>
                <h3 className={styles.title}>{title}</h3>
                <div className={styles.genres}>
                  {genres?.map(({ id, name }) => <Tag key={id} genre={name} />)}
                </div>
                <div className={styles.rating}>
                  <Rating rating={voteAverage} />
                </div>
                <p className={styles.tagline}>{tagline}</p>
                <div className={styles.overview}>
                  <h3>Overview</h3>
                  <p>{overview}</p>
                </div>
              </div>
            </div>
            <div className={styles.cast}>
              {cast?.map(({
                id, character, name, profile_path,
              }) => (
                <ActorCard
                  key={id}
                  character={character}
                  name={name}
                  profile_path={profile_path}
                  fallbackImg={posterPath}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Movie;

interface IMovie {
  title: string,
  backdrop_path: string,
  poster_path: string,
  vote_average: number,
  tagline: string,
  overview: string,
  genres: { id:number, name:string }[],
  cast: {
    id: number,
    character: string,
    name: string,
    profile_path: string
  }[]
}
