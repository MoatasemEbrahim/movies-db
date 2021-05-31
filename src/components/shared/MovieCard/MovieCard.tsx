import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import styles from './MovieCard.module.scss';

const MovieCard:FC<IProps> = ({
  id, title, img, date, vote, genres,
}:IProps) => (
  <div className={styles.card}>
    <Link to={`/movie/${id}`} className={styles.link}>
      <img src={`https://image.tmdb.org/t/p/w500${img}?api_key=4f298a53e552283bee957836a529baec`} alt={title} />
      <div className={styles.info}>
        <h4>{title}</h4>
        <p>{date}</p>
        <div className={styles.genres}>
          {genres.map((genre) => <span className={styles.genre} key={`${id}-${genre}`}>{genre}</span>)}
        </div>
        <div className={styles.voting}>
          <CircularProgressbar
            value={vote}
            maxValue={10}
            text={JSON.stringify(vote)}
            styles={buildStyles({
              pathColor: '#21C774',
              textColor: '#21C774',
              textSize: '2rem',
            })}
          />
        </div>
      </div>
    </Link>
  </div>
);

export default MovieCard;

interface IProps {
  id: string,
  title: string,
  img: string,
  date: string,
  vote: number,
  genres: string[]
}
