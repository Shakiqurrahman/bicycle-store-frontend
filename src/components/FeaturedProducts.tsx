import { Link } from "react-router";
import { TProductData } from "../Redux/features/cart/cartSlice";
import { useGetAllProductsQuery } from "../Redux/features/product/productApi";
import ProductCard from "./ProductCard";

const FeaturedProducts = () => {
  const { data } = useGetAllProductsQuery(null);

  return (
    <section className="max-width mt-24">
      <h1 className="text-3xl font-bold"># Featured Products</h1>
      <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-3 mt-10">
        {data?.data?.map((product: TProductData, idx: number) => (
          <ProductCard key={idx} product={product} />
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <Link
          to={"/products"}
          className="bg-primary hover:bg-primary/85 text-white font-medium py-3 px-8 rounded-lg duration-300"
        >
          View All Products
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProducts;
