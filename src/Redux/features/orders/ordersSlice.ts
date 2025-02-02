import { createSlice } from "@reduxjs/toolkit";
import { TProductData } from "../cart/cartSlice";

type TOrder = {
  orders: TProductData[];
};
const initialState: TOrder = {
  orders: [],
};
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder(state, action) {
      state.orders.push(action.payload);
    },
    deleteOrder(state, action) {
      state.orders = state.orders.filter(
        (order) => order._id !== action.payload
      );
    },
  },
});

export const { addOrder, deleteOrder } = orderSlice.actions;
export default orderSlice.reducer;
