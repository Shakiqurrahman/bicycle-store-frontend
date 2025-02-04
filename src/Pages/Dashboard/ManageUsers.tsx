import { Select } from "antd";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { GoDotFill } from "react-icons/go";
import { TUserData } from "../../Redux/features/auth/authSlice";
import {
  useGetAllUsersQuery,
  useUpdateUserStatusMutation,
} from "../../Redux/features/user/userApi";
import { formatDate } from "../../utils/formatDate";

const ManageUsers = () => {
  const { data: response, isLoading } = useGetAllUsersQuery(null);
  const [updateUserStatus] = useUpdateUserStatusMutation();

  const handleChange = async (value: string, id: string) => {
    const toastId = toast.loading("Updating User Status");
    const payload = {
      userId: id,
      isBlocked: value === "Block",
    };

    try {
      const res = await updateUserStatus(payload).unwrap();
      if (res.success) {
        toast.success("User updated Successfully", { id: toastId });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to update", { id: toastId });
    }
  };

  const allUsers = response?.data;
  return isLoading ? (
    <div className="h-[calc(100vh_-_160px)] flex justify-center items-center">
      <AiOutlineLoading3Quarters className="animate-spin text-4xl" />
    </div>
  ) : (
    <section className="mt-2">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 buser-b buser-gray-200">
          <h2 className="text-lg font-semibold">Manage Users</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Join Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {allUsers?.length > 0 ? (
                allUsers?.map((user: TUserData) => (
                  <tr key={user?._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user?.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user?.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {formatDate(user?.createdAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div
                        className={`border   ${
                          user?.isBlocked
                            ? "text-rose-600 border-rose-600 bg-[#ffeded]"
                            : "text-[#09cc57] border-[#09cc57] bg-[#edfff4]"
                        } inline-flex items-center px-2 py-0.5 rounded-[10px] text-sm gap-0.5`}
                      >
                        <GoDotFill className="text-xs" />
                        <span>{user?.isBlocked ? "Blocked" : "Active"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Select
                        defaultValue={user?.isBlocked ? "Blocked" : "Active"}
                        style={{ width: 120 }}
                        onChange={(value) => handleChange(value, user?._id)}
                        options={[
                          { value: "Active", label: "Active" },
                          { value: "Block", label: "Block" },
                        ]}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <p className="px-6 py-4 w-full">No users found!</p>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ManageUsers;
