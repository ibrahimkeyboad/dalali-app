import Head from 'next/head';
import React from 'react';

function HeadC({ title, description }) {
  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content={description} />
    </Head>
  );
}

export default HeadC;
