import { ReactNode } from "react";
import { useNavigate } from "react-router";
import {
  logout,
  TUser,
  useCurrentToken,
} from "../Redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../Redux/hook";
import { verifyToken } from "../utils/verifyToken";

type TProtectedRoute = {
  children: ReactNode;
  role: string | undefined;
};
const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const navigate = useNavigate();
  const token = useAppSelector(useCurrentToken);
  let user;

  if (token) {
    user = verifyToken(token);
  }

  const dispatch = useAppDispatch();

  if (role !== undefined && role !== (user as TUser).role) {
    dispatch(logout());
    navigate("/login", { replace: true });
  }
  if (!token) {
    navigate("/login", { replace: true });
  }

  return children;
};

export default ProtectedRoute;
