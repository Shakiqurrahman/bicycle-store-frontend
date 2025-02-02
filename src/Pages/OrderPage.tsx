import { GoDotFill } from "react-icons/go";
import { Link } from "react-router";
import bicle from "../assets/images/hero4.jpg";
import { useGetOrdersQuery } from "../Redux/features/orders/orderApi";
import { TOrderData } from "../types/orderTypes";
import { formatDate } from "../utils/formatDate";

const OrderPage = () => {
  const { data: ordersData } = useGetOrdersQuery(null);
  return (
    <section className="max-width mt-10">
      <div className="flex items-center flex-col">
        <p className="uppercase text-gray-500 text-sm">
          <Link to={"/"} className="hover:text-primary duration-300">
            Home
          </Link>{" "}
          - <span className="text-primary">Orders</span>
        </p>
        <h1 className="text-5xl mt-4 font-bold text-blackish/90">My Orders</h1>
      </div>

      <div className="mt-14 bg-white p-8 rounded-lg drop-shadow-sm">
        <div className="overflow-x-auto pb-4">
          <div className="flex justify-between gap-1 mb-3 pb-4 border-b border-gray-200 min-w-[950px]">
            <h3 className="flex-1 min-w-[310px] text-sm font-medium text-blackish">
              Product
            </h3>
            <h3 className="w-[150px] text-center text-sm font-medium text-blackish">
              Payment
            </h3>
            <h3 className="w-[150px] text-center text-sm font-medium text-blackish">
              Total
            </h3>
            <h3 className="w-[150px] text-center text-sm font-medium text-blackish">
              Order Time
            </h3>

            <h3 className="w-[150px] text-sm font-medium text-blackish text-center">
              Order Status
            </h3>
          </div>
          <div className="space-y-6">
            {ordersData?.data?.length > 0 ? (
              ordersData?.data?.map((order: TOrderData) => (
                <div
                  key={order._id}
                  className="flex justify-between items-center gap-1 min-w-[950px]"
                >
                  <div className="flex-1 flex items-center gap-4 min-w-[310px]">
                    <img
                      src={bicle}
                      alt={order.product.name}
                      className="w-32 max-h-28 bg-cover rounded-lg shrink-0"
                    />
                    <div>
                      <p className="text-xs tracking-wider text-gray-500 uppercase">
                        Brand : {order.product.brand}
                      </p>
                      <h3 className="text-xl font-semibold mb-1">
                        {order.product.name}
                      </h3>
                      <p className="text-xs tracking-wider text-gray-500 uppercase">
                        Quantity : {order.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="w-[150px] flex justify-center">
                    <div className="border border-[#09cc57] text-[#09cc57] flex items-center bg-[#edfff4] px-2 py-0.5 rounded-[10px] text-sm gap-0.5">
                      <GoDotFill className="text-xs" />
                      <span>Paid</span>
                    </div>
                  </div>
                  <div className="w-[150px] flex justify-center">
                    <p className="text-lg text-primary font-semibold text-center">
                      ${Number(order.totalPrice).toFixed(2)}
                    </p>
                  </div>
                  <div className="w-[150px] flex justify-center flex-col items-center gap-1 text-sm font-semibold">
                    <p>{new Date(order.createdAt).toLocaleTimeString()}</p>
                    <p>{formatDate(order.createdAt)}</p>
                  </div>
                  <div className="w-[150px] flex justify-center">
                    <div className="border border-[#09cc57] text-[#09cc57] flex items-center bg-[#edfff4] px-2 py-0.5 rounded-[10px] text-sm gap-0.5">
                      <GoDotFill className="text-xs" />
                      <span>{order.status}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center pt-4 w-full max-w-[500px mx-auto">
                Your orders will appear here once you make a purchase!
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderPage;
