import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type StockStatus = "inStock" | "lowStock" | "outOfStock";

interface ProductFilterState {
  searchTerm: string;
  selectedCategory: string | null;
  priceRange: [number, number];
  selectedStock: StockStatus | null;
  isPriceFilter: boolean;
}

const initialState: ProductFilterState = {
  searchTerm: "",
  selectedCategory: null,
  priceRange: [200, 300],
  selectedStock: null,
  isPriceFilter: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },
    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.priceRange = action.payload;
    },
    setSelectedStock: (state, action: PayloadAction<StockStatus | null>) => {
      state.selectedStock = action.payload;
    },
    makePriceFilter: (state) => {
      state.isPriceFilter = true;
    },
    resetPriceFilter: (state) => {
      state.isPriceFilter = false;
    },
  },
});

export const {
  setSearchTerm,
  setSelectedCategory,
  setPriceRange,
  setSelectedStock,
  makePriceFilter,
  resetPriceFilter,
} = productSlice.actions;

export default productSlice.reducer;
