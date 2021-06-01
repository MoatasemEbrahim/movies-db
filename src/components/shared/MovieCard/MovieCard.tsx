import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import Tag from '../Tag/Tag';
import Rating from '../Rating/Rating';
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
          {genres.map((genre) => <Tag key={`${id}-${genre}`} genre={genre} />)}
        </div>
        <div className={styles.rating}>
          <Rating rating={vote} />
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
