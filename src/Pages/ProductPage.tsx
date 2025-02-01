import PageBanner from "../components/PageBanner";
import ProductCard from "../components/Product/ProductCard";
import ProductLeft from "../components/Product/ProductLeft";
import { TProductData } from "../Redux/features/cart/cartSlice";
import { useGetAllProductsQuery } from "../Redux/features/product/productApi";

const ProductPage = () => {
  const { data } = useGetAllProductsQuery(null);
  return (
    <section>
      <PageBanner pageName="Shop" title="Shop Now" />

      <div className="mt-10 sm:mt-20 max-width flex flex-col md:flex-row items-start gap-4">
        <div className="w-full md:w-[400px]">
          <ProductLeft />
        </div>
        <div className="flex-1 grid gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
          {data?.data?.map((product: TProductData, idx: number) => (
            <ProductCard key={idx} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
