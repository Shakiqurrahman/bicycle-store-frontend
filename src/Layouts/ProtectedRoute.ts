import { ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { logout, useCurrentToken } from "../Redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../Redux/hook";

type TProtectedRoute = {
  children: ReactNode;
};
const ProtectedRoute = ({ children }: TProtectedRoute) => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = useAppSelector(useCurrentToken);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!token) {
      // dispatch(logout());
      navigate("/sign-in", { state: { from: location }, replace: true });
      return;
    }
  }, [token, dispatch, navigate, location]);
  return children;
};

export default ProtectedRoute;
