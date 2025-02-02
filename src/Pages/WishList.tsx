import { BsCart4 } from "react-icons/bs";
import { GoHeart } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router";
import bicle from "../assets/images/hero4.jpg";
import { addToCart } from "../Redux/features/cart/cartSlice";
import { removeFromWishList } from "../Redux/features/wishList/wishListSlice";
import { useAppDispatch, useAppSelector } from "../Redux/hook";

const WishList = () => {
  const dispatch = useAppDispatch();
  const { wishList } = useAppSelector((state) => state.wishList);
  return (
    <section className="max-width mt-10">
      <div className="flex items-center flex-col">
        <p className="uppercase text-gray-500 text-sm">
          <Link to={"/"} className="hover:text-primary duration-300">
            Home
          </Link>{" "}
          - <span className="text-primary">WishList</span>
        </p>
        <GoHeart className="text-5xl my-3 text-blackish/90" />
        <h1 className="text-5xl font-bold text-blackish/90">My Wishlist</h1>
      </div>

      <div className="mt-14 bg-white p-8 rounded-lg drop-shadow-sm">
        <div className="overflow-x-auto pb-4">
          <div className="flex justify-between gap-1 mb-3 pb-4 border-b border-gray-200 min-w-[800px]">
            <h3 className="flex-1 min-w-[350px] text-base font-medium text-blackish">
              Product
            </h3>
            <h3 className="w-[150px] text-center text-base font-medium text-blackish">
              Unit Price
            </h3>
            <h3 className="w-[150px] text-center text-base font-medium text-blackish">
              Stock Status
            </h3>
            <h3 className="max-w-[250px] min-w-[180px] flex-1 text-base font-medium text-blackish"></h3>
          </div>
          <div className="space-y-6">
            {wishList.length > 0 ? (
              wishList.map((product) => (
                <div
                  key={product._id}
                  className="flex justify-between items-center gap-1 min-w-[800px]"
                >
                  <div className="flex-1 flex items-center gap-4 min-w-[350px]">
                    <button
                      type="button"
                      onClick={() => dispatch(removeFromWishList(product._id))}
                      className="text-2xl text-primary cursor-pointer hover:opacity-60 duration-300"
                    >
                      <RiDeleteBin6Line />
                    </button>
                    <img
                      src={bicle}
                      alt={product.name}
                      className="w-32 max-h-28 bg-cover rounded-lg shrink-0"
                    />
                    <div>
                      <p className="text-xs tracking-wider text-gray-500 uppercase">
                        {product.brand}
                      </p>
                      <h3 className="text-xl font-semibold mb-1">
                        {product.name}
                      </h3>
                    </div>
                  </div>
                  <div className="w-[150px] flex justify-center">
                    <p className="text-lg text-primary font-semibold text-center">
                      ${product.price}
                    </p>
                  </div>
                  <div className="w-[150px] flex justify-center">
                    {product.inStock ? (
                      <p className="text-sm text-green-600 font-semibold">
                        In Stock
                      </p>
                    ) : (
                      <p className="text-sm text-red-600 font-semibold">
                        Out Of Stock
                      </p>
                    )}
                  </div>
                  <div className="max-w-[250px] min-w-[180px] flex-1 flex justify-center">
                    <button
                      onClick={() => dispatch(addToCart(product))}
                      className="cursor-pointer justify-center flex items-center gap-2 font-semibold text-xs md:text-sm bg-body border border-gray-200 hover:bg-primary duration-300 hover:text-white px-6 py-3 rounded-full drop-shadow-sm"
                    >
                      <BsCart4 className="text-xl" />
                      Add To Cart
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center pt-4">No items in wishlist</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WishList;
