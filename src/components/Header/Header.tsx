import { useEffect, useRef, useState } from "react";
import { BsCart4 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoHeart } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { Link, NavLink } from "react-router";
import logo from "../../assets/images/bicycle logo - Copy.png";
import defaultAvatar from "../../assets/images/no-profile-picture.svg";
import {
  selectCurrentUser,
  useCurrentToken,
} from "../../Redux/features/auth/authSlice";
import {
  selectTotalItems,
  toggleCartDrawer,
} from "../../Redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../../Redux/hook";
import CartDrawer from "../CartDrawer";
import DropdownProfile from "./DropdownProfile";
const Header = () => {
  const [showNavLinks, setShowNavLinks] = useState<boolean>(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const user = useAppSelector(selectCurrentUser);
  const token = useAppSelector(useCurrentToken);
  const [openProfile, setOpenProfile] = useState(false);
  const dispatch = useAppDispatch();

  const totalItems = useAppSelector(selectTotalItems);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!profileRef.current?.contains(e.target as Node))
        setOpenProfile(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (showNavLinks) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showNavLinks]);

  return (
    <header className="sticky top-0 z-[99] bg-white/90 backdrop-blur-md">
      <div className="max-width relative">
        <div className="flex justify-between items-center py-4">
          <Link to={"/"} className="flex gap-2 items-center">
            <img src={logo} alt="Bicycle Store" className="w-12" />
            <h2 className="text-base sm:text-lg font-semibold text-primary">
              Bi-Cycle <span className="text-gray-500">Store</span>
            </h2>
          </Link>
          <nav>
            <ul
              className={`md:flex ${
                showNavLinks
                  ? "flex flex-col absolute md:static top-20 md:top-0 bg-white w-full text-center left-0 py-10 md:py-0 duration-300 h-screen md:h-auto"
                  : "hidden absolute md:static top-0 duration-300"
              } md:flex-row gap-8`}
            >
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
          <div className="flex gap-4 items-center">
            <div className="flex gap-4 md:gap-8 items-center">
              <div className="flex items-center gap-2 md:gap-4 ">
                <NavLink
                  to={"/wish-list"}
                  className="hover:text-primary text-gray-700 duration-300"
                >
                  <IoHeart className="size-6 hidden sm:block" />
                </NavLink>

                <div
                  className="relative"
                  onClick={() => dispatch(toggleCartDrawer())}
                >
                  <button type="button" className="border-none outline-none">
                    <BsCart4 className="size-[25px] text-gray-700 cursor-pointer hover:text-primary duration-300" />
                  </button>
                  <span className="w-6 rounded-full flex justify-center items-center bg-primary px-1.5 py-1 text-xs absolute -top-3 -right-3 text-white">
                    {totalItems}
                  </span>
                </div>
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
            <button
              type="button"
              onClick={() => setShowNavLinks(!showNavLinks)}
              className="block md:hidden cursor-pointer text-xl text-white bg-primary p-1.5 rounded-sm"
            >
              {showNavLinks ? <MdClose /> : <GiHamburgerMenu />}
            </button>
          </div>
        </div>
      </div>
      <CartDrawer />
    </header>
  );
};

export default Header;
