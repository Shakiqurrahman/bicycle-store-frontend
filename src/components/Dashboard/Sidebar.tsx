import { IoMdArrowRoundBack } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { Link, NavLink } from "react-router";
import logo from "../../assets/images/bicycle logo - Copy.png";
import { dashboardLinks } from "../../Routes/AdminPaths";

type TSidebarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
};
const Sidebar = ({ sidebarOpen, setSidebarOpen }: TSidebarProps) => {
  return (
    <div>
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-20 px-4 border-b border-gray-200">
          <Link to={"/"} className="flex gap-2 items-center">
            <img src={logo} alt="Bicycle Store" className="w-8" />
            <h2 className="text-base font-semibold text-primary">
              Bi-Cycle <span className="text-gray-500">Store</span>
            </h2>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-md lg:hidden hover:bg-gray-100"
          >
            <IoClose className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <nav className="p-4 space-y-1">
          {dashboardLinks?.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              end
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm rounded-lg transition-all duration-300 ${
                  isActive ? "bg-red-50" : "text-gray-700 hover:bg-primary/5"
                }`
              }
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </NavLink>
          ))}
        </nav>
        {/* log out button  */}
        <Link to={"/"} className="p-4 fixed bottom-2 w-full">
          <button
            type="button"
            className="flex items-center justify-center px-4 py-3 text-sm rounded-lg bg-gray-100 text-gray-700 hover:bg-blue-50 w-full"
          >
            <IoMdArrowRoundBack className="w-5 h-5 mr-3" />
            Go Home
          </button>
        </Link>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Sidebar;
