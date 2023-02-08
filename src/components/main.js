import Script from 'next/script';
import { useEffect } from 'react';
import style from '../../styles/main.module.css';
import Item from './item';

function Container({ data = [] }) {
  useEffect(() => {
    <script
      onError={(e) => {
        console.error('Script failed to load', e);
      }}>
      (adsbygoogle = window.adsbygoogle || []).push({});
    </script>;
  }, []);
  return (
    <div className={style.container}>
      {data?.map((product) => (
        <Item key={product.id} data={product} style={style} />
      ))}
    </div>
  );
}

export default Container;
