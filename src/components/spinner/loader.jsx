import React from 'react';
import classes from './style.module.css';

function Loader({ size }) {
  const value = size === 'large' ? '50vh' : '1%';
  return (
    <div
      style={{ marginTop: value, marginBottom: value }}
      className={classes['spinner-border']}></div>
  );
}

export default Loader;
