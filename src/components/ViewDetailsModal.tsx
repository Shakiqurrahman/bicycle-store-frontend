import { useEffect, useRef } from "react";
import { MdClose } from "react-icons/md";
import { TProductData } from "../Redux/features/cart/cartSlice";

type TmodalProps = {
  product: TProductData;
  onClose: () => void;
};
const ViewDetailsModal = ({ product, onClose }: TmodalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

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
        className="relative max-width bg-white w-full h-[70vh] rounded-[30px] p-10"
      >
        <div
          onClick={onClose}
          className="cursor-pointer absolute top-4 right-4 rounded-sm text-2xl bg-gray-100 p-1 text-primary hover:bg-primary hover:text-white duration-300"
        >
          <MdClose />
        </div>
        <h2 className="text-3xl font-bold">Product Details</h2>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
      </div>
    </div>
  );
};

export default ViewDetailsModal;
