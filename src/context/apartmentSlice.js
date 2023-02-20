import { apiSlice } from './apiSlice';

const apartmentSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postApartment: builder.mutation({
      query: (data) => ({
        url: '/apartment',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Apartment'],
    }),
    getApartments: builder.query({
      query: () => '/apartment',
    }),
    getUserApatments: builder.query({
      query: (owner) => `/apartment/owner/${owner}`,
    }),
    available: builder.mutation({
      query: (data) => ({
        url: '/apartment/activate',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Apartment'],
    }),

    updateApartment: builder.mutation({
      query: (data) => ({
        url: `/apartment/${data.id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Apartment'],
    }),

    subscrption: builder.mutation({
      query: (data) => ({
        url: '/checkout_sessions',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useAvailableMutation,
  useGetApartmentsQuery,
  useGetUserApatmentsQuery,
  usePostApartmentMutation,
  useUpdateApartmentMutation,
  useSubscrptionMutation,
} = apartmentSlice;
