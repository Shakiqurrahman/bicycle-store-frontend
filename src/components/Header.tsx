import { BsCart4 } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { Link, NavLink, useNavigate } from "react-router";
import logo from "../assets/images/bicycle logo - Copy.png";
import { logout, selectCurrentUser } from "../Redux/features/auth/authSlice";
import { toggleCartDrawer } from "../Redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../Redux/hook";
import CartDrawer from "./CartDrawer";
const Header = () => {
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/sign-in");
  };
  return (
    <header className="sticky top-0 z-[99] bg-white/50 backdrop-blur-md">
      <div className="max-width ">
        <div className="flex justify-between items-center py-4">
          <Link to={"/"} className="flex gap-2 items-center">
            <img src={logo} alt="Bicycle Store" className="w-12" />
            <h2 className="text-lg font-semibold text-primary">
              Bi-Cycle <span className="text-gray-500">Store</span>
            </h2>
          </Link>
          <nav>
            <ul className="flex gap-8">
              <li>
                <NavLink
                  to={"/"}
                  className="text-sm font-semibold text-gray-700 hover:text-primary duration-300"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/products"}
                  className="text-sm font-semibold text-gray-700 hover:text-primary duration-300"
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/about"}
                  className="text-sm font-semibold text-gray-700 hover:text-primary duration-300"
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/contact"}
                  className="text-sm font-semibold text-gray-700 hover:text-primary duration-300"
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className="flex gap-8 items-center">
            <div className="flex items-center gap-4 ">
              <IoSearchSharp className="size-6 text-gray-700 cursor-pointer" />
              <button type="button" className="border-none outline-none">
                <BsCart4
                  className="size-[25px] text-gray-700 cursor-pointer"
                  onClick={() => dispatch(toggleCartDrawer())}
                />
              </button>
            </div>
            {user ? (
              <div onClick={handleLogout}>
                <FaUser className="text-4xl p-1 rounded-full border cursor-pointer" />
              </div>
            ) : (
              <Link to={"/sign-in"}>
                <button className="bg-primary hover:bg-primary/85 text-white font-medium py-2.5 px-8 rounded-lg duration-300 cursor-pointer select-none">
                  Sign In
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
      <CartDrawer />
    </header>
  );
};

export default Header;
