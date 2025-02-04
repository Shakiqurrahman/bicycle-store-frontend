import { FaFacebookF, FaPinterestP } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router";
import logo from "../assets/images/bicycle logo.png";

const Footer = () => {
  return (
    <div className="mt-20 bg-white pt-[80px] pb-[20px]">
      <div className="max-width">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-20">
          <div>
            <div>
              <img className="w-[100px]" src={logo} alt="logo" />
            </div>
            <p className="my-5 text-gray-600">
              Our passionate team of cycling experts is dedicated to helping you
              find the perfect ride that suits your style and needs.
            </p>
            <div>
              <p className="text-black font-bold text-sm sm:text-base">
                SUPPORT MAIL :{" "}
                <Link
                  to={"mailto:customerservice@bicyclestore.com"}
                  className="font-medium text-black hover:text-primary duration-300"
                >
                  customerservice@bicyclestore.com
                </Link>
              </p>
            </div>
          </div>
          <div>
            <h1 className="mb-5 md:mb-2 font-bold">QUICK LINKS</h1>
            <ul className="flex items-center gap-5">
              <li>
                <Link
                  to={"/"}
                  className="text-gray-600 hover:text-primary duration-300 text-sm sm:text-base"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to={"/shop"}
                  className="text-gray-600 hover:text-primary duration-300 text-sm sm:text-base"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  to={"/about"}
                  className="text-gray-600 hover:text-primary duration-300 text-sm sm:text-base"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to={"/contact"}
                  className="text-gray-600 hover:text-primary duration-300 text-sm sm:text-base"
                >
                  Contact
                </Link>
              </li>
            </ul>
            <h1 className="mt-10 mb-2 font-bold">HEADQUARTERS</h1>
            <p className="text-gray-600 text-sm sm:text-base">
              9630 Aero Drive San Diego, CA 92123 United States
            </p>
          </div>
          <div>
            <h1 className="mb-2 font-bold">CUSTOMER SERVICE HOURS</h1>
            <p className="text-gray-600 mb-2 text-sm sm:text-base">
              Open: 8:00 AM - Close: 18:00 PM
            </p>
            <p className="text-gray-600 mb-8 text-sm sm:text-base">
              Saturday - Sunday Close
            </p>
            <h1 className="mb-4 font-bold">FOLLOW:</h1>
            <ul className="flex gap-3">
              <li>
                <Link
                  to={""}
                  className="text-white bg-black hover:bg-primary duration-300 size-10 flex items-center justify-center"
                >
                  <FaFacebookF />
                </Link>
              </li>
              <li>
                <Link
                  to={""}
                  className="text-white bg-black hover:bg-primary duration-300 size-10 flex items-center justify-center"
                >
                  <FaPinterestP />
                </Link>
              </li>
              <li>
                <Link
                  to={""}
                  className="text-white bg-black hover:bg-primary duration-300 size-10 flex items-center justify-center"
                >
                  <FaXTwitter />
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="text-center text-sm! sm:text-base border-t border-gray-300 pt-3 mt-10">
          Copyright &copy;2025 All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
