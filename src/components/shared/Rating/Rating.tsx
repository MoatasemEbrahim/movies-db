import React, { FC } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import styles from './Rating.module.scss';

const Rating:FC<IProps> = ({ rating }:IProps) => (
  <span className={styles.rating}>
    <CircularProgressbar
      value={rating}
      maxValue={10}
      text={JSON.stringify(rating)}
      styles={buildStyles({
        pathColor: '#21C774',
        textColor: '#21C774',
        textSize: '2rem',
      })}
    />
  </span>
);

export default Rating;

interface IProps {
  rating: number
}
