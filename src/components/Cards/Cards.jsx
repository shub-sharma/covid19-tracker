import React, { Component } from 'react';

import styles from './Cards.module.css';


const Cards = (props) => {
  if (!props) {
    return 'Spinner';
  }
  return (
    <div className={styles.container}>
      <h1>CARD</h1>
    </div>
  )


}
export default Cards;