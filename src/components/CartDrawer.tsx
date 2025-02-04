import { Drawer } from "antd";
import toast from "react-hot-toast";
import { FiMinus, FiPlus } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router";
import { selectCurrentUser } from "../Redux/features/auth/authSlice";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
  selectGrandTotal,
  TCartItem,
  toggleCartDrawer,
} from "../Redux/features/cart/cartSlice";
import { useCreateOrderMutation } from "../Redux/features/orders/orderApi";
import { useAppDispatch, useAppSelector } from "../Redux/hook";

const CartDrawer = () => {
  const dispatch = useAppDispatch();
  const { showCartDrawer, cartItems } = useAppSelector((state) => state.cart);
  const user = useAppSelector(selectCurrentUser);
  const grandTotal = useAppSelector(selectGrandTotal);

  const [createOrder] = useCreateOrderMutation();

  const handlePayment = async () => {
    if (!user) {
      toast.error("Please Sign In to Proceed");
      return;
    }
    if (user?.role === "admin") {
      toast.error("Admins are not allowed to place orders.");
      return;
    }
    if (cartItems?.length > 1) {
      toast.error(
        "You can only process one order at a time. Please remove other items from the cart."
      );
      return;
    }
    const payload = {
      product: cartItems[0]?._id,
      quantity: cartItems[0]?.buyingQuantity,
      totalPrice: grandTotal,
      user: user._id,
    };
    const toastId = toast.loading("Placing Order");
    try {
      const response = await createOrder(payload).unwrap();
      if (response?.success) {
        toast.success("Order Placed", { id: toastId });
        window.location.href = response?.data;
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
      console.error("Error submitting test answers:", error);
    }
  };
  return (
    <div>
      <Drawer
        title={
          <h2 className="text-lg font-bold text-primary">
            Cart ( {cartItems.length} Item )
          </h2>
        }
        footer={
          <>
            {cartItems.length > 0 && (
              <h3 className="text-center text-base font-medium text-gray-600 uppercase mb-2">
                Grand Total :{" "}
                <span className="font-semibold text-blackish text-lg">
                  ${grandTotal.toFixed(2)}
                </span>
              </h3>
            )}
            <div className="flex items-center gap-4 py-2 sticky bottom-0 bg-white">
              <Link className="w-full" to={"/cart"}>
                <button
                  onClick={() => dispatch(toggleCartDrawer())}
                  type="button"
                  className="cursor-pointer bg-primary  w-full text-sm tracking-wider rounded-full uppercase font-semibold text-white py-3"
                >
                  View Cart
                </button>
              </Link>
              <button
                onClick={handlePayment}
                type="button"
                disabled={cartItems.length <= 0}
                className="bg-[#1b8cdc] w-full text-sm tracking-wider rounded-full uppercase font-semibold text-white py-3 disabled:bg-[#1b8cdc]/70 cursor-pointer disabled:cursor-no-drop"
              >
                Checkout
              </button>
            </div>
          </>
        }
        open={showCartDrawer}
        onClose={() => dispatch(toggleCartDrawer())}
      >
        <div className="space-y-4">
          {cartItems.length > 0 ? (
            cartItems.map((product: TCartItem, idx: number) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-4"
              >
                <div className="flex flex-row items-center gap-3 flex-1">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-16 max-h-16 rounded-sm"
                  />
                  <div>
                    <p className="text-xs text-gray-500">{product.brand}</p>
                    <h3
                      className="text-base font-semibold max-w-[125px] truncate"
                      title={product.name}
                    >
                      {product.name}
                    </h3>
                    <p className="text-sm text-primary font-semibold">
                      Price: ${product.price}
                    </p>
                  </div>
                </div>
                <div className="w-[85px] flex justify-center items-center gap-3">
                  <button
                    onClick={() => dispatch(decrementQuantity(product._id))}
                    type="button"
                    className={`text-xs font-semibold py-1 px-1.5 border rounded-sm border-gray-400 cursor-pointer shadow duration-300 ${
                      product.buyingQuantity <= 1 ? "opacity-40" : ""
                    }`}
                  >
                    <FiMinus />
                  </button>
                  <span className="text-base font-semibold">
                    {product.buyingQuantity}
                  </span>
                  <button
                    onClick={() => dispatch(incrementQuantity(product._id))}
                    type="button"
                    className={`text-xs font-semibold py-1 px-1.5 border rounded-sm border-gray-400 cursor-pointer shadow duration-300 ${
                      product.buyingQuantity === product.quantity
                        ? "opacity-40"
                        : ""
                    }`}
                  >
                    <FiPlus />
                  </button>
                </div>
                <button
                  className="w-5 cursor-pointer text-lg tracking-wider text-primary hover:text-primary/80"
                  onClick={() => dispatch(removeFromCart(product._id))}
                >
                  <RiDeleteBin6Line />
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-base">No items in cart</p>
          )}
        </div>
      </Drawer>
    </div>
  );
};

export default CartDrawer;
