import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import { baseApi } from "./api/baseApi";
import authReducer from "./features/auth/authSlice";
import cartReducer from "./features/cart/cartSlice";
import orderReducer from "./features/orders/ordersSlice";
import wishListReducer from "./features/wishList/wishListSlice";

const createPersistConfig = (key: string) => ({
  key,
  storage,
});

const persistedAuthReducer = persistReducer(
  createPersistConfig("auth"),
  authReducer
);
const persistedCartReducer = persistReducer(
  createPersistConfig("cart"),
  cartReducer
);
const persistedWishListReducer = persistReducer(
  createPersistConfig("wishList"),
  wishListReducer
);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedAuthReducer,
    cart: persistedCartReducer,
    wishList: persistedWishListReducer,
    orders: orderReducer,
  },

  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
