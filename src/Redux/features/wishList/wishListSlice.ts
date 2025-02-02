import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { TProductData } from "../cart/cartSlice";

type TWishList = {
  wishList: TProductData[];
};

const initialState: TWishList = {
  wishList: [],
};

const wishListSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    addToWishList: (state, action: PayloadAction<TProductData>) => {
      const { _id } = action.payload;
      const existingProduct = state.wishList.find(
        (product) => product._id === _id
      );
      if (existingProduct) {
        toast.error("Product already in your wishlist!");
        return;
      }
      state.wishList.push(action.payload);
      toast.success("Added to your wishlist!");
    },
    removeFromWishList: (state, action: PayloadAction<string>) => {
      state.wishList = state.wishList.filter(
        (product) => product._id !== action.payload
      );
      toast.success("Removed from your wishlist!");
    },
  },
});

export const { addToWishList, removeFromWishList } = wishListSlice.actions;
export default wishListSlice.reducer;
