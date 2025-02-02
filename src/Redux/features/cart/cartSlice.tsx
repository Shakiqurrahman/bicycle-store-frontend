import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { RootState } from "../../store";

export type TCartItem = TProductData & {
  buyingQuantity: number;
};

export type TProductData = {
  _id: string;
  type: string;
  name: string;
  brand: string;
  price: number;
  quantity: number;
  description: string;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
};

type CartState = {
  showCartDrawer: boolean;
  cartItems: TCartItem[];
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
      const { _id, quantity } = action.payload;

      if (quantity > 0) {
        const existingItem = state.cartItems.find((item) => item._id === _id);

        if (existingItem) {
          if (existingItem.buyingQuantity < quantity) {
            existingItem.buyingQuantity += 1;
            toast.success("Item added to cart!");
          } else {
            toast.error("No more stock available!");
          }
        } else {
          state.cartItems.push({
            ...action.payload,
            buyingQuantity: 1,
          });
          toast.success("Item added to cart!");
        }
      } else {
        toast.error(
          "This item is out of stock. Check similar products or try again later."
        );
      }
    },

    incrementQuantity: (state, action: PayloadAction<string>) => {
      const existingItem = state.cartItems.find(
        (item) => item._id === action.payload
      );

      if (existingItem) {
        if (existingItem.buyingQuantity < existingItem.quantity) {
          existingItem.buyingQuantity += 1;
        } else {
          toast.error("No more stock available!");
        }
      }
    },

    decrementQuantity: (state, action: PayloadAction<string>) => {
      const existingItem = state.cartItems.find(
        (item) => item._id === action.payload
      );

      if (existingItem) {
        if (existingItem.buyingQuantity > 1) {
          existingItem.buyingQuantity -= 1;
        } else {
          toast.error("You cannot reduce below 1. Remove item instead.");
        }
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
      toast.success("Item removed from cart!");
    },

    clearCart: (state) => {
      state.cartItems = [];
      toast.success("Cart cleared!");
    },
  },
});

export const {
  toggleCartDrawer,
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;

export const selectTotalItems = createSelector(
  (state: RootState) => state.cart.cartItems,
  (cartItems) => cartItems.length
);

export const selectGrandTotal = createSelector(
  (state: RootState) => state.cart.cartItems,
  (cartItems) =>
    cartItems.reduce(
      (total: number, item: TCartItem) =>
        total + item.price * item.buyingQuantity,
      0
    )
);
