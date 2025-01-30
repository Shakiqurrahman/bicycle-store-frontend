import { Drawer } from "antd";
import {
  toggleCartDrawer,
  TProductData,
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
            <button className="bg-primary w-full text-sm tracking-wider rounded-full uppercase font-semibold text-white py-3">
              View Cart
            </button>
            <button className="bg-[#1b8cdc] w-full text-sm tracking-wider rounded-full uppercase font-semibold text-white py-3">
              Checkout
            </button>
          </div>
        }
        open={showCartDrawer}
        onClose={() => dispatch(toggleCartDrawer())}
      >
        <div>
          {cartItems.length > 0 ? (
            cartItems.map((product: TProductData, idx: number) => (
              <div key={idx} className="flex items-center gap-4 py-2">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-16 h-16 rounded-lg"
                />
                <div>
                  <h3 className="text-sm font-semibold">{product.title}</h3>
                  <p className="text-xs text-gray-500">
                    Price: ${product.price}
                  </p>
                </div>
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
