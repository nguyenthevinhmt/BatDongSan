import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
      extraOptions: (builder: any) => {
        builder.onError((error: any, { dispatch, queryFulfilled }: any) => {
          // Xử lý lỗi ở đây
          if (error.status === 400) {
            // Xử lý lỗi 400 ở đây
            console.error("Bad Request:", error);

            // Có thể dispatch action hoặc thực hiện các xử lý khác
            // dispatch(someBadRequestAction(error));
          }
        });
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
