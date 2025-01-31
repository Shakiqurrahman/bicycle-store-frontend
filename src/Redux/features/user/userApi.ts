import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => ({
        url: "/users/me",
        method: "get",
      }),
    }),

    changePassword: builder.mutation({
      query: (passwords) => ({
        url: "/users/change-password",
        method: "post",
        body: passwords,
      }),
    }),
  }),
});

export const { useGetMeQuery, useChangePasswordMutation } = userApi;
