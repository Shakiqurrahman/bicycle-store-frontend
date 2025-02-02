import { useEffect, useRef } from "react";
import { BsCart4 } from "react-icons/bs";
import { IoCard, IoHeart } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import bicle from "../assets/images/hero4.jpg";
import { addToCart, TProductData } from "../Redux/features/cart/cartSlice";
import { addToWishList } from "../Redux/features/wishList/wishListSlice";
import { useAppDispatch, useAppSelector } from "../Redux/hook";

type TmodalProps = {
  product: TProductData;
  onClose: () => void;
};
const ViewDetailsModal = ({ product, onClose }: TmodalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const isAlreadyAdded = useAppSelector((state) =>
    state.wishList.wishList.some((item) => item._id === product._id)
  );

  // Handle click outside the modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);
  return (
    <div className="fixed left-0 top-0 z-[999] flex h-screen w-full items-center justify-center bg-black/30 p-4 backdrop-blur-[4px]">
      <div
        ref={modalRef}
        className="relative max-w-[1000px] mx-auto bg-white w-full h-[60vh] rounded-2xl p-10! flex items-center gap-10"
      >
        <div
          onClick={onClose}
          className="cursor-pointer absolute top-4 right-4 rounded-sm text-2xl bg-gray-100 p-1 text-primary hover:bg-primary hover:text-white duration-300"
        >
          <MdClose />
        </div>
        <div className="flex-1 space-y-4">
          <img
            src={bicle}
            alt={product.name}
            className="w-full rounded-xl shrink-0 mx-auto"
          />
          <button
            type="button"
            onClick={() => dispatch(addToWishList(product))}
            className="w-full py-3 text-primary font-semibold  rounded-lg bg-white border hover:border-primary flex items-center justify-center gap-1 cursor-pointer border-gray-300 duration-300"
          >
            <IoHeart className="text-lg " />
            {isAlreadyAdded ? "Added to Wishlist" : "Add to Wishlist"}
          </button>
        </div>
        <div className="flex-1">
          <h3 className="text-3xl font-bold">{product.name}</h3>
          <p className="mb-1 font-semibold">Brand : {product.brand}</p>
          <p className="text-primary mb-4 text-lg font-semibold">
            Price : {product.price}
          </p>
          <p className="text-sm text-justify">{product.description}</p>
          <div className="flex items-center gap-4 mt-5">
            <button
              type="button"
              onClick={() => dispatch(addToCart(product))}
              className="w-full py-3 text-white font-semibold  rounded-lg duration-300 bg-gray-600 hover:bg-gray-500 flex items-center justify-center gap-2 cursor-pointer"
            >
              <BsCart4 className="text-lg" />
              Add to Cart
            </button>
            <button
              onClick={onClose}
              className="w-full py-3 text-white font-semibold rounded-lg duration-300 bg-primary hover:bg-primary/80 flex items-center justify-center gap-2 cursor-pointer"
            >
              <IoCard />
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetailsModal;
