import { AiFillCloseCircle } from "react-icons/ai";
import { FaCircleCheck } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router";
import { TProductData } from "../../Redux/features/cart/cartSlice";

const DProductCard = ({ product }: { product: TProductData }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow group relative">
      <img
        className="w-full h-[250px] object-cover bg-body mix-blend-multiply"
        src={product.imageUrl}
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
        <Link
          to={`${product._id}`}
          state={product}
          className="cursor-pointer w-full justify-center flex items-center gap-2 font-semibold text-xs md:text-sm bg-body border border-gray-200 hover:bg-primary duration-300 hover:text-white px-4 py-3 rounded-lg"
        >
          <FiEdit className="text-lg" />
          Edit
        </Link>
      </div>
    </div>
  );
};

export default DProductCard;
