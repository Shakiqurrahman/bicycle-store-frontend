import { TUserData } from "../Redux/features/auth/authSlice";
import { TProductData } from "../Redux/features/cart/cartSlice";

export const OrderStatus = {
  Pending: "Pending",
  Ongoing: "Ongoing",
  Cancelled: "Cancelled",
  Completed: "Completed",
} as const;

type TOrderStatus = keyof typeof OrderStatus;

export type TOrderData = {
  _id: string;
  product: TProductData;
  quantity: number;
  totalPrice: string;
  status: TOrderStatus;
  createdAt: string;
  updatedAt: string;
  user: TUserData;
};
