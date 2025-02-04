import { FiHome } from "react-icons/fi";
import { IoAdd } from "react-icons/io5";
import { LuChartLine } from "react-icons/lu";
import { PiBicycleLight, PiUsersFourLight } from "react-icons/pi";
import ManageUsers from "../Pages/Dashboard/ManageUsers";

export const adminPathsData = [
  {
    icon: FiHome,
    name: "Dashboard",
    path: "",
    element: `<div> Hello brother</div>`,
  },
  {
    icon: LuChartLine,
    name: "Order Management",
    path: "order-management",
    element: `<div> Hello brother</div>`,
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
    element: `<div> Hello brother</div>`,
  },
  {
    icon: IoAdd,
    name: "Add Bicycle",
    path: "add-bicycle",
    element: `<div> Hello brother</div>`,
  },
];

export const adminPaths = adminPathsData.map((data) => {
  return {
    path: data.path,
    element: data.element,
  };
});

export const dashboardLinks = adminPathsData.map((data) => {
  return {
    path: data.path,
    icon: data.icon,
    name: data.name,
  };
});
