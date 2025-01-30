import { ReactNode } from "react";
import { useNavigate } from "react-router";
import { useCurrentToken } from "../Redux/features/auth/authSlice";
import { useAppSelector } from "../Redux/hook";

type TProtectedRoute = {
  children: ReactNode;
};
const RedirectIfLoggedIn = ({ children }: TProtectedRoute) => {
  const navigate = useNavigate();
  const token = useAppSelector(useCurrentToken);
  console.log(token);
  
  if (token) {
    navigate("/", { replace: true });
  }

  return children;
};

export default RedirectIfLoggedIn;
