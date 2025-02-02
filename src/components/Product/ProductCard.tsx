import { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import { FaCircleCheck } from "react-icons/fa6";
import { HiViewfinderCircle } from "react-icons/hi2";
import { IoHeart } from "react-icons/io5";
import bicle from "../../assets/images/hero4.jpg";
import { addToCart, TProductData } from "../../Redux/features/cart/cartSlice";
import { addToWishList } from "../../Redux/features/wishList/wishListSlice";
import { useAppDispatch } from "../../Redux/hook";
import ViewDetailsModal from "../ViewDetailsModal";

const ProductCard = ({ product }: { product: TProductData }) => {
  const dispatch = useAppDispatch();
  const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false);

  const handleToggleModal = () => {
    setShowDetailsModal((prev) => !prev);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow group relative">
      <img
        className="w-full max-h-[280px] object-cover bg-body mix-blend-multiply"
        src={bicle}
        alt="Image"
      />
      <div className="px-1">
        <h2 className="mt-2 mb-1 text-xl font-semibold line-clamp-2">
          {product?.name}
        </h2>
        <p className="text-base font-medium">Brand : {product.brand}</p>
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-primary">${product.price}</p>
          {product?.inStock ? (
            <p className="flex items-center text-green-400 gap-1 font-semibold text-sm">
              <FaCircleCheck />
              <span>In Stock</span>
            </p>
          ) : (
            <p className="flex items-center text-red-400 gap-1 font-semibold text-sm">
              <AiFillCloseCircle className="text-base" />
              <span>Out Of Stock</span>
            </p>
          )}
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => dispatch(addToCart(product))}
          className="cursor-pointer w-full justify-center flex items-center gap-2 font-semibold text-xs md:text-sm bg-body border border-gray-200 hover:bg-primary duration-300 hover:text-white px-4 py-3 rounded-lg"
        >
          <BsCart4 className="text-xl" />
          Add To Cart
        </button>
        <button
          type="button"
          onClick={handleToggleModal}
          className="cursor-pointer w-full justify-center flex items-center gap-2 font-semibold text-xs md:text-sm bg-body border border-gray-200 hover:bg-primary duration-300 hover:text-white px-4 py-3 rounded-lg"
        >
          <HiViewfinderCircle className="text-xl" />
          View Details
        </button>
      </div>

      {/* on hover wishlist icon */}
      <div className="absolute top-7 right-7 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible duration-300 translate-x-[50px] group-hover:translate-x-0">
        <button
          type="button"
          onClick={() => dispatch(addToWishList(product))}
          className="bg-white shadow rounded-sm size-8 text-black hover:text-red-600 mb-2 flex items-center justify-center text-lg duration-300  cursor-pointer"
        >
          <IoHeart />
        </button>
      </div>

      {/* on view details modal showing */}
      {showDetailsModal && (
        <ViewDetailsModal product={product} onClose={handleToggleModal} />
      )}
    </div>
  );
};

export default ProductCard;
