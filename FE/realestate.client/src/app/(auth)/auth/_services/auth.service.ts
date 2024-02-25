import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { url } from "inspector";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5083/",
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "connect/token",
        method: "POST",
        body: Object.keys(credentials)
          .map(
            (key) =>
              encodeURIComponent(key) +
              "=" +
              encodeURIComponent(credentials[key])
          )
          .join("&"),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }),
    }),
    refresh: builder.mutation({
      query: (credentials) => ({
        url: "connect/token",
        method: "POST",
        body: Object.keys(credentials)
          .map(
            (key) =>
              encodeURIComponent(key) +
              "=" +
              encodeURIComponent(credentials[key])
          )
          .join("&"),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "api/user/register",
        method: "POST",
        body: {
          ...credentials,
        },
      }),
    }),
    validateOtp: builder.mutation({
      query: (credential) => ({
        url: "api/user/validate-otp",
        method: "PUT",
        params: {
          otp: credential.otp,
          userId: credential.userId,
        },
      }),
    }),
    refreshOtp: builder.mutation({
      query: (credentials) => ({
        url: "api/user/refresh-otp",
        method: "PUT",
        params: {
          username: credentials,
        },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "connect/logout",
        method: "POST",
        params: {},
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useValidateOtpMutation,
  useRefreshOtpMutation,
  useRefreshMutation,
  useLogoutMutation,
} = authApi;

export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/",
  }),
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (credentials) => ({
        url: "api/login",
        method: "POST",
        body: Object.keys(credentials)
          .map(
            (key) =>
              encodeURIComponent(key) +
              "=" +
              encodeURIComponent(credentials[key])
          )
          .join("&"),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }),
    }),
  }),
});
export const { useSignInMutation } = loginApi;
