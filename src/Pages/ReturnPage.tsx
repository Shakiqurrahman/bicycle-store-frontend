import { useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaRegCheckCircle } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { Link, useSearchParams } from "react-router";
import { useVerifyPaymentQuery } from "../Redux/features/orders/orderApi";

const ReturnPage = () => {
  const [searchParams] = useSearchParams();

  const { isLoading, data } = useVerifyPaymentQuery(
    searchParams.get("order_id"),
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const orderData = data?.data?.[0];
  useEffect(() => {
    if (!searchParams.get("order_id")) {
      window.location.href = "/";
    }
  }, [searchParams]);

  return isLoading ? (
    <div className="min-h-[40vh] flex justify-center items-center">
      <AiOutlineLoading3Quarters className="animate-spin text-4xl" />
    </div>
  ) : (
    <div className="min-h-[40vh] mt-10 max-width flex flex-col items-center justify-center">
      <div className="bg-white p-6 sm:p-10 rounded-2xl text-center">
        {orderData?.bank_status === "Success" ? (
          <FaRegCheckCircle className="text-3xl sm:text-4xl mx-auto mb-4 text-green-500" />
        ) : (
          <GiCancel className="text-3xl sm:text-4xl mx-auto mb-4 text-rose-500" />
        )}
        <h2 className="text-xl sm:text-2xl font-semibold mb-1">
          Payment{" "}
          {orderData?.bank_status === "Success" ? "Successful!" : "Failed"}
        </h2>
        <p>
          Your payment has been{" "}
          {orderData?.bank_status === "Success" ? "Successful!" : "Failed"}.
        </p>
        <Link
          to={"/"}
          className={`mt-4 block  text-white ${
            orderData?.bank_status === "Success"
              ? "bg-green-500 hover:bg-green-600"
              : "bg-blackish"
          }  py-2 px-4 rounded-lg duration-300`}
        >
          Finish
        </Link>
      </div>
    </div>
  );
};

export default ReturnPage;
