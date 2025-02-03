import { TUser, useCurrentToken } from "../Redux/features/auth/authSlice";
import { useAppSelector } from "../Redux/hook";
import { verifyToken } from "./verifyToken";

export const useIsAdmin = (): boolean => {
  const token = useAppSelector(useCurrentToken);

  if (!token) return false;

  const decodedData = verifyToken(token) as TUser;
  return decodedData?.role === "admin";
};
