import { Drawer } from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router";
import bicle from "../assets/images/hero4.jpg";
import {
  removeFromCart,
  TCartItem,
  toggleCartDrawer,
} from "../Redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../Redux/hook";

const CartDrawer = () => {
  const dispatch = useAppDispatch();
  const { showCartDrawer, cartItems } = useAppSelector((state) => state.cart);
  return (
    <div>
      <Drawer
        title={
          <h2 className="text-lg font-bold text-primary">
            Cart ( {cartItems.length} Item)
          </h2>
        }
        footer={
          <div className="flex items-center gap-4 py-2 sticky bottom-0 bg-white">
            <Link className="w-full" to={"/cart"}>
              <button
                onClick={() => dispatch(toggleCartDrawer())}
                className="cursor-pointer bg-primary  w-full text-sm tracking-wider rounded-full uppercase font-semibold text-white py-3"
              >
                View Cart
              </button>
            </Link>
            <button className="bg-[#1b8cdc] w-full text-sm tracking-wider rounded-full uppercase font-semibold text-white py-3">
              Checkout
            </button>
          </div>
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
                <div className="flex items-center gap-4">
                  <img
                    src={bicle}
                    alt={product.name}
                    className="w-20 max-h-16 rounded-sm"
                  />
                  <div>
                    <h3 className="text-sm font-semibold">{product.name}</h3>
                    <p className="text-xs text-gray-500">
                      Price: ${product.price}
                    </p>
                    <p>Quantity {product.buyingQuantity}</p>
                  </div>
                </div>
                <button
                  className="cursor-pointer text-lg tracking-wider text-primary hover:text-primary/80"
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
