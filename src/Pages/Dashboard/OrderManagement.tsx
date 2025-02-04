import { Select } from "antd";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { GoDotFill } from "react-icons/go";
import {
  useGetOrdersQuery,
  useUpdateOrderStatusMutation,
} from "../../Redux/features/orders/orderApi";
import { OrderStatus, TOrderData } from "../../types/orderTypes";
import { formatDate } from "../../utils/formatDate";

const OrderManagement = () => {
  const { data: response, isLoading } = useGetOrdersQuery(null);
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const handleChange = async (value: string, id: string) => {
    const toastId = toast.loading("Updating User Status");
    const payload = {
      orderId: id,
      status: value,
    };

    try {
      const res = await updateOrderStatus(payload).unwrap();
      if (res.success) {
        toast.success("Order updated Successfully", { id: toastId });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to update", { id: toastId });
    }
  };

  const allOrders = response?.data;
  return isLoading ? (
    <div className="h-[calc(100vh_-_160px)] flex justify-center items-center">
      <AiOutlineLoading3Quarters className="animate-spin text-4xl" />
    </div>
  ) : (
    <div className="mt-2">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-blackish">Manage Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Car Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {allOrders?.length > 0 ? (
                allOrders?.map((order: TOrderData) => (
                  <tr key={order?._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {new Date(order?.createdAt).toLocaleTimeString()}
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatDate(order.createdAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        Brand : {order?.product.brand}
                      </div>
                      <div className="text-sm text-gray-500">
                        Model : {order?.product.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {order?.user.name}
                      </div>
                      <div className="text-sm text-gray-900">
                        {order?.user.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        Quantity: {order?.quantity}
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        Total: ${order?.totalPrice.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div
                        className={`border   ${
                          order.status === "Pending"
                            ? "text-rose-600 border-rose-600 bg-[#ffeded]"
                            : "text-[#09cc57] border-[#09cc57] bg-[#edfff4]"
                        } inline-flex items-center px-2 py-0.5 rounded-[10px] text-sm gap-0.5`}
                      >
                        <GoDotFill className="text-xs" />
                        <span>{order.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === "Pending"
                            ? "text-blue-500 bg-blue-100"
                            : order.status === "Completed"
                            ? "text-green-500 bg-green-100"
                            : order.status === "Ongoing"
                            ? "text-yellow-500"
                            : "text-rose-600"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Select
                        defaultValue={order.status || "Pending"}
                        style={{ width: 120 }}
                        onChange={(value) => handleChange(value, order?._id)}
                        options={Object.entries(OrderStatus).map(
                          // eslint-disable-next-line @typescript-eslint/no-unused-vars
                          ([_key, value]) => ({
                            value,
                            label: value,
                          })
                        )}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <p className="px-6 py-4 w-full">No orders found!</p>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
