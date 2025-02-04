import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => ({
        url: "/users/me",
        method: "get",
      }),
      providesTags: ["user"],
    }),

    changePassword: builder.mutation({
      query: (passwords) => ({
        url: "/users/change-password",
        method: "post",
        body: passwords,
      }),
      invalidatesTags: ["user"],
    }),

    updateProfile: builder.mutation({
      query: (formData) => ({
        url: "/users/update",
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetMeQuery,
  useChangePasswordMutation,
  useUpdateProfileMutation,
} = userApi;
