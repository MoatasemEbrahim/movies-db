import React, { FC, ReactNode } from 'react';
import styles from './Tag.module.scss';

const Tag:FC<IProps> = ({ genre }:IProps) => (
  <span
    className={styles.genre}
  >
    {genre}
  </span>
);

export default Tag;

interface IProps {
  genre: ReactNode,
}
