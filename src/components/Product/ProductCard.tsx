import { BsCart4 } from "react-icons/bs";
import { FaCircleCheck } from "react-icons/fa6";
import { HiViewfinderCircle } from "react-icons/hi2";
import { TProductData } from "../../Redux/features/cart/cartSlice";
import bicle from "../../assets/images/hero4.jpg";

const ProductCard = ({ product }: { product: TProductData }) => {
  // console.log(product);

  return (
    <div className="p-4 bg-white rounded-lg shadow">
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
          <p className="flex items-center text-green-400 gap-1 font-semibold text-sm">
            <FaCircleCheck />
            <span>In Stock</span>
          </p>
          {/* TODO: Out of stock */}
          {/* <p className="flex items-center text-red-400 gap-1 font-semibold text-sm">
        <AiFillCloseCircle className="text-base" />
        <span>Out Of Stock</span>
      </p> */}
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <button className="cursor-pointer w-full justify-center flex items-center gap-2 font-semibold text-xs md:text-sm bg-body border border-gray-200 hover:bg-primary duration-300 hover:text-white px-4 py-3 rounded-lg">
          <BsCart4 className="text-xl" />
          Add To Cart
        </button>
        <button className="cursor-pointer w-full justify-center flex items-center gap-2 font-semibold text-xs md:text-sm bg-body border border-gray-200 hover:bg-primary duration-300 hover:text-white px-4 py-3 rounded-lg">
          <HiViewfinderCircle className="text-xl" />
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
