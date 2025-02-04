import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => ({
        url: "/orders",
        method: "GET",
      }),
      providesTags: ["order"],
    }),
    updateOrderStatus: builder.mutation({
      query: ({ orderId, status }) => ({
        url: `/orders/${orderId}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["order"],
    }),

    createOrder: builder.mutation({
      query: (orderData) => ({
        url: `/orders/order/create`,
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["order"],
    }),

    cancelOrder: builder.mutation({
      query: (orderId) => ({
        url: `orders/${orderId}/cancel`,
        method: "PATCH",
      }),
      invalidatesTags: ["order"],
    }),

    verifyPayment: builder.query({
      query: (order_id) => ({
        url: "/orders/order/verify",
        params: { order_id },
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useUpdateOrderStatusMutation,
  useCreateOrderMutation,
  useCancelOrderMutation,
  useVerifyPaymentQuery,
} = orderApi;
