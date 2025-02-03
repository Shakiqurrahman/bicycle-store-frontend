import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router";
import { TUser, useCurrentToken } from "../Redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../Redux/hook";
import { verifyToken } from "../utils/verifyToken";

type TProtectedRoute = {
  children: ReactNode;
};
const AdminRoutes = ({ children }: TProtectedRoute) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector(useCurrentToken);

  let jwtPayload;
  if (token) {
    jwtPayload = verifyToken(token);
  }
  const isAdmin = (jwtPayload as TUser)?.role === "admin";

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
  }, [token, dispatch, navigate, isAdmin]);

  return children;
};

export default AdminRoutes;
