import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  selectCurrentUser,
  TUser,
  useCurrentToken,
} from "../Redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../Redux/hook";
import { verifyToken } from "../utils/verifyToken";

type TProtectedRoute = {
  children: ReactNode;
};
const IsAdmin = ({ children }: TProtectedRoute) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const token = useAppSelector(useCurrentToken);
  const user = useAppSelector(selectCurrentUser);

  let jwtPayload;

  if (token) {
    jwtPayload = verifyToken(token);
  }
  const isAdmin =
    (jwtPayload as TUser)?.role === "admin" && user?.role === "admin";

  useEffect(() => {
    if (!token || !isAdmin) {
      navigate("/");
      return;
    }
  }, [token, dispatch, navigate, isAdmin]);

  return children;
};

export default IsAdmin;
