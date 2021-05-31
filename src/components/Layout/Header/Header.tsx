import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

const Header:FC = () => (
  <div className={styles.header}>
    <h1><Link to="/" className={styles.logo}>TMDB</Link></h1>
  </div>
);

export default Header;
