import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const countryApi = createApi({
  reducerPath: 'country',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://restcountries.com/v3.1/subregion/Eastern Africa',
  }),
  endpoints: (build) => ({
    getCountry: build.query({
      query: () => '/',
    }),
  }),
});

export const { useGetCountryQuery } = countryApi;
