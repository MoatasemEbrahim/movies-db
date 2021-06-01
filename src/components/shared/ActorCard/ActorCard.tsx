import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './ActorCard.module.scss';

const ActorCard:FC<IProps> = ({
  character, name, profile_path,
}:IProps) => (
  <div className={styles.card}>
    <Link to="#">
      <img src={`https://image.tmdb.org/t/p/w500${profile_path}?api_key=4f298a53e552283bee957836a529baec`} alt={name} />
      <div className={styles.info}>
        <h3>{character}</h3>
        <p>{name}</p>
      </div>
    </Link>
  </div>
);

export default ActorCard;

interface IProps {
  character: string,
  name: string,
  profile_path: string
}
