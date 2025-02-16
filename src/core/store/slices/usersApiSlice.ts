import { OTP_URL, USERS_URL } from "../../../shared/constants/constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${OTP_URL}/verify`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${OTP_URL}`,
        method: "POST",
        body: data,
      }),

    }),
    profile:builder.mutation({
      query:(data)=>({
        url:`${USERS_URL}/profile`,
        method:"PUT",
        body:data,
      })
    }),

  }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation,useProfileMutation } = usersApiSlice;
