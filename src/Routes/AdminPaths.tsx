import { FiHome } from "react-icons/fi";
import { IoAdd } from "react-icons/io5";
import { LuChartLine } from "react-icons/lu";
import { PiBicycleLight, PiUsersFourLight } from "react-icons/pi";
import AddBicycle from "../Pages/Dashboard/AddBicycle";
import BycycleManagement from "../Pages/Dashboard/BycycleManagement";
import Dashboard from "../Pages/Dashboard/Dashboard";
import EditBycle from "../Pages/Dashboard/EditBycle";
import ManageUsers from "../Pages/Dashboard/ManageUsers";
import OrderManagement from "../Pages/Dashboard/OrderManagement";

export const adminPathsData = [
  {
    icon: FiHome,
    name: "Dashboard",
    path: "",
    element: <Dashboard />,
  },
  {
    icon: LuChartLine,
    name: "Order Management",
    path: "order-management",
    element: <OrderManagement />,
  },
  {
    icon: PiUsersFourLight,
    name: "User Management",
    path: "user-management",
    element: <ManageUsers />,
  },
  {
    icon: PiBicycleLight,
    name: "Bicycle Management",
    path: "bicycle-management",
    element: <BycycleManagement />,
  },
  {
    icon: IoAdd,
    name: "Add Bicycle",
    path: "add-bicycle",
    element: <AddBicycle />,
  },
  {
    path: "bicycle-management/:id",
    element: <EditBycle />,
  },
];

export const adminPaths = adminPathsData.map((data) => {
  return {
    path: data.path,
    element: data.element,
  };
});

export const dashboardLinks = adminPathsData
  .filter((d) => d.name)
  .map((data) => {
    return {
      path: data.path,
      icon: data.icon,
      name: data.name,
    };
  });
