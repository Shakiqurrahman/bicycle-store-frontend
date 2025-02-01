import toast from "react-hot-toast";
import { LuUser } from "react-icons/lu";
import { MdLogout, MdViewCompact } from "react-icons/md";
import { Link, useNavigate } from "react-router";
import { useLogoutMutation } from "../../Redux/features/auth/authApi";
import { logout } from "../../Redux/features/auth/authSlice";
import { useAppDispatch } from "../../Redux/hook";

type DropdownProfileProps = {
  close: () => void;
};
const DropdownProfile = ({ close }: DropdownProfileProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [logoutUser] = useLogoutMutation();

  const handleLogout = async () => {
    close();
    dispatch(logout());
    toast.success("Logout Successfully");
    navigate("/sign-in");
    await logoutUser(null).unwrap();
  };
  return (
    <div className="shadow-xl mt-3 py-2 bg-white text-black absolute top-full -right-2 rounded-lg border border-gray-300 before:absolute before:top-[-0.5rem] before:right-[1.5rem] before:size-4 before:bg-white before:rotate-[45deg] before:border-l before:border-t before:border-l-gray-300 before:border-t-gray-300 text-sm sm:text-base text-nowrap flex flex-col items-start">
      <Link
        to="/me"
        onClick={close}
        className="flex gap-2 items-center px-4 py-2 hover:bg-body duration-300"
      >
        <LuUser className="text-lg" />
        View Profile
      </Link>
      <Link
        to="/orders"
        onClick={close}
        className="flex gap-2 items-center px-4 py-2 hover:bg-body duration-300"
      >
        <MdViewCompact className="text-lg" />
        View Orders
      </Link>
      <button
        onClick={handleLogout}
        className="cursor-pointer px-4 py-2 flex items-center gap-2 w-full text-left hover:bg-body duration-300"
      >
        <MdLogout className="text-lg" /> Logout
      </button>
    </div>
  );
};

export default DropdownProfile;
