import { apiSlice } from './apiSlice';

const authSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => ({
        url: '/auth/signup',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Auth'],
    }),
    sendverify: builder.mutation({
      query: (phoneNnumber) => ({
        url: '/auth/sendverify',
        method: 'POST',
        body: phoneNnumber,
      }),
      invalidatesTags: ['Auth'],
    }),
    phoneverify: builder.mutation({
      query: (data) => ({
        url: '/auth/phoneverify',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Auth'],
    }),
    createProfie: builder.mutation({
      query: (profile) => ({
        url: '/auth/setprofile',
        method: 'POST',
        body: profile,
        invalidatesTags: ['Auth'],
      }),
    }),
    getUser: builder.query({
      query: (id) => `/users/${id}`,
      providesTags: ['Auth'],
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `/users/${data.id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
});

export const {
  useCreateProfieMutation,
  useGetUserQuery,
  useSendverifyMutation,
  usePhoneverifyMutation,
  useSignupMutation,
  useUpdateProfileMutation,
} = authSlice;
