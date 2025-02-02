import { AiOutlineClose } from "react-icons/ai";
import { FiMinus, FiPlus } from "react-icons/fi";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
  selectTotalItems,
  TCartItem,
} from "../Redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../Redux/hook";
import bicle from "../assets/images/hero4.jpg";

const CartPage = () => {
  const totalItems = useAppSelector(selectTotalItems);
  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector((state) => state.cart);
  return (
    <section className="mt-10 max-width">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-1">Shopping Cart</h2>
        <p className="text-sm">
          <span className="font-medium">{totalItems} items</span>{" "}
          <span className="text-blackish">in your cart</span>
        </p>

        <div className="mt-8">
          <div className="mt-3 space-y-6 border-t border-gray-200 pt-6 overflow-x-auto">
            <div className="flex  items-center gap-1 min-w-[850px]">
              <h3 className="flex-1 text-base font-medium text-blackish">
                Product
              </h3>
              <h3 className="w-[115px] text-base font-medium text-blackish text-center">
                Quantity
              </h3>
              <h3 className="w-[250px] text-base font-medium text-blackish text-center">
                Total Price
              </h3>
              <h3 className="w-[115px] text-base font-medium text-blackish text-center">
                Actions
              </h3>
            </div>
            {cartItems?.length > 0 ? (
              cartItems?.map((product: TCartItem, idx: number) => (
                <>
                  <div
                    key={idx}
                    className="flex items-center gap-1 w-full min-w-[850px]"
                  >
                    <div className="flex-1 flex items-center gap-5">
                      <img
                        src={bicle}
                        alt={product.name}
                        className="w-40 max-h-32 bg-cover rounded-lg shrink-0"
                      />
                      <div>
                        <p className="text-xs tracking-wider text-gray-500 uppercase">
                          {product.brand}
                        </p>
                        <h3 className="text-xl font-semibold mb-1">
                          {product.name}
                        </h3>
                        <p className="text-sm text-primary font-medium">
                          Price: ${product.price}
                        </p>
                      </div>
                    </div>
                    <div className="w-[115px] flex justify-center items-center gap-4">
                      <button
                        onClick={() => dispatch(decrementQuantity(product._id))}
                        type="button"
                        className={`text-base font-semibold py-1.5 px-2 border rounded-sm border-gray-400 cursor-pointer shadow duration-300 ${
                          product.buyingQuantity <= 1 ? "opacity-40" : ""
                        }`}
                      >
                        <FiMinus />
                      </button>
                      <span className="text-lg font-semibold">
                        {product.buyingQuantity}
                      </span>
                      <button
                        onClick={() => dispatch(incrementQuantity(product._id))}
                        type="button"
                        className={`text-base font-semibold py-1.5 px-2 border rounded-sm border-gray-400 cursor-pointer shadow duration-300 ${
                          product.buyingQuantity === product.quantity
                            ? "opacity-40"
                            : ""
                        }`}
                      >
                        <FiPlus />
                      </button>
                    </div>
                    <div className="w-[250px] text-center">
                      <h3 className="text-xl font-bold text-blackish">
                        ${(product.price * product.buyingQuantity).toFixed(2)}
                      </h3>
                    </div>
                    <div className="w-[115px] flex justify-center">
                      <button
                        onClick={() => dispatch(removeFromCart(product._id))}
                        type="button"
                        className="text-sm flex items-center gap-2 border border-primary px-4 py-1.5 rounded-full text-primary duration-300 cursor-pointer"
                      >
                        Remove
                        <AiOutlineClose />
                      </button>
                    </div>
                  </div>
                </>
              ))
            ) : (
              <p className="text-center text-base">No items in cart</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
