import DProductCard from "../../components/Product/DProductCard";
import { TProductData } from "../../Redux/features/cart/cartSlice";
import { useGetAllProductsQuery } from "../../Redux/features/product/productApi";

const BycycleManagement = () => {
  const { data: response, isLoading } = useGetAllProductsQuery(null);

  const products = response?.data;
  return (
    <div>
      <h2 className="text-2xl font-semibold">All Products</h2>
      <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-3 mt-5">
        {isLoading && <p>Loading...</p>}
        {products?.map((product: TProductData, idx: number) => (
          <DProductCard key={idx} product={product} />
        ))}
      </div>
    </div>
  );
};

export default BycycleManagement;
