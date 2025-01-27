import { BsCart4 } from "react-icons/bs";
import { IoSearchSharp } from "react-icons/io5";
import { Link, NavLink } from "react-router";
import logo from "../assets/images/bicycle logo.png";
const Header = () => {
  return (
    <header className="max-width">
      <div className="flex justify-between items-center py-3">
        <div>
          <img src={logo} alt="Bicycle Store" className="w-20" />
        </div>
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
                About
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
        <div className="flex gap-8">
          <div className="flex items-center gap-4 ">
            <IoSearchSharp className="size-6 text-gray-700 cursor-pointer" />
            <BsCart4 className="size-[25px] text-gray-700 cursor-pointer" />
          </div>
          <Link to={"/sign-in"}>
            <button className="bg-primary hover:bg-primary/85 text-white font-medium py-3 px-8 rounded-lg duration-300 cursor-pointer">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
