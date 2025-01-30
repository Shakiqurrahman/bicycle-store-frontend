import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TProductData = {
  _id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  brand: string;
};

type CartState = {
  showCartDrawer: boolean;
  cartItems: TProductData[];
};

const initialState: CartState = {
  showCartDrawer: false,
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCartDrawer: (state) => {
      state.showCartDrawer = !state.showCartDrawer;
    },

    addToCart: (state, action: PayloadAction<TProductData>) => {
      const existingItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.cartItems.push(action.payload);
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
    },
  },
});

export const { toggleCartDrawer, addToCart, removeFromCart } =
  cartSlice.actions;
export default cartSlice.reducer;
