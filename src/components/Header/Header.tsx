import { useEffect, useRef, useState } from "react";
import { BsCart4 } from "react-icons/bs";
import { IoSearchSharp } from "react-icons/io5";
import { Link, NavLink } from "react-router";
import logo from "../../assets/images/bicycle logo - Copy.png";
import defaultAvatar from "../../assets/images/no-profile-picture.svg";
import {
  selectCurrentUser,
  useCurrentToken,
} from "../../Redux/features/auth/authSlice";
import { toggleCartDrawer } from "../../Redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../../Redux/hook";
import CartDrawer from "../CartDrawer";
import DropdownProfile from "./DropdownProfile";
const Header = () => {
  const profileRef = useRef<HTMLDivElement>(null);
  const user = useAppSelector(selectCurrentUser);
  const token = useAppSelector(useCurrentToken);
  const [openProfile, setOpenProfile] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!profileRef.current?.contains(e.target as Node))
        setOpenProfile(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-[99] bg-white/90 backdrop-blur-md">
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
                  to={"/shop"}
                  className="text-sm font-semibold text-gray-700 hover:text-primary duration-300"
                >
                  Shop
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
            {token ? (
              <div className="relative" ref={profileRef}>
                <img
                  onClick={() => setOpenProfile(!openProfile)}
                  className="flex-shrink-0 size-12 rounded-full bg-primary-300 object-center overflow-hidden  cursor-pointer"
                  src={user?.avatar ? user?.avatar : defaultAvatar}
                  alt={user?.name}
                />
                {openProfile && (
                  <DropdownProfile close={() => setOpenProfile(false)} />
                )}
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
