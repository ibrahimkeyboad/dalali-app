import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const url =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/api'
    : 'https://dalali-app.vercel.app/api';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: url,
  }),

  tagTypes: ['Apartment', 'House', 'Hostel', 'Frame', 'Auth'],
  endpoints: (build) => ({}),
});
