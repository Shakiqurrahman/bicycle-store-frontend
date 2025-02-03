import { useEffect, useRef, useState } from "react";
import { BsBellFill, BsSearch } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { Outlet } from "react-router";
import defaultAvatar from "../assets/images/no-profile-picture.svg";
import Sidebar from "../components/Dashboard/Sidebar";
import DropdownProfile from "../components/Header/DropdownProfile";
import { selectCurrentUser } from "../Redux/features/auth/authSlice";
import { useAppSelector } from "../Redux/hook";

const DashboardLayout = () => {
  const profileRef = useRef<HTMLDivElement>(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const user = useAppSelector(selectCurrentUser);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!profileRef.current?.contains(e.target as Node))
        setOpenProfile(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div>
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Navigation */}
        <header className="fixed top-0 right-0 left-0 lg:left-64 bg-white border-b border-gray-200 z-40">
          <div className="flex items-center justify-between h-20 px-4 md:mr-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md lg:hidden hover:bg-gray-100"
            >
              <GiHamburgerMenu className="w-5 h-5 text-gray-500" />
            </button>

            <div className="hidden md:flex flex-1 max-w-md ml-4">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <BsSearch className="size-4 text-gray-400" />
                </div>
                <input
                  type="search"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary duration-300"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <BsBellFill className="w-5 h-5 text-gray-500" />
              </button>
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
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="py-6 px-6 lg:px-8 mt-20">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
