import { createBrowserRouter } from "react-router";
import ProtectedRoute from "../Layouts/ProtectedRoute";
import PublicLayout from "../Layouts/PublicLayout";
import AboutPage from "../Pages/AboutPage";
import CartPage from "../Pages/CartPage";
import ContactUs from "../Pages/ContactUs";
import ErrorPage from "../Pages/ErrorPage";
import HomePage from "../Pages/HomePage";
import OrderPage from "../Pages/OrderPage";
import ProductPage from "../Pages/ProductPage";
import ProfilePage from "../Pages/ProfilePage";
import SignInPage from "../Pages/SignInPage";
import SignUpPage from "../Pages/SignUpPage";
import WishList from "../Pages/WishList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/me",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/shop",
        element: <ProductPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/wish-list",
        element: <WishList />,
      },
      {
        path: "/orders",
        element: <OrderPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
    ],
  },
  {
    path: "/sign-in",
    element: <SignInPage />,
  },
  {
    path: "/sign-up",
    element: <SignUpPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
