'use client';

import { useEffect } from 'react';

export default function Error({ error }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('error', error);
  }, [error]);

  return (
    <div>
      <p>Something went wrong!</p>
      <p>{error}</p>
    </div>
  );
}
