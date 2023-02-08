import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';
import { countryApi } from './country';
import slices from './sliceApp';

const store = configureStore({
  reducer: {
    slices,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [countryApi.reducerPath]: countryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(apiSlice.middleware)
      .concat(countryApi.middleware),
});

export default store;
