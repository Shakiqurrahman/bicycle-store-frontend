import PageBanner from "../components/PageBanner";
import ProductCard from "../components/Product/ProductCard";
import ProductLeft from "../components/Product/ProductLeft";
import { TProductData } from "../Redux/features/cart/cartSlice";
import { useGetAllProductsQuery } from "../Redux/features/product/productApi";
import { useAppSelector } from "../Redux/hook";

const ProductPage = () => {
  const { data } = useGetAllProductsQuery(null);

  const {
    searchTerm,
    selectedCategory,
    priceRange,
    selectedStock,
    isPriceFilter,
  } = useAppSelector((state) => state.product);

  const filteredProducts = data?.data?.filter((product: TProductData) => {
    let stockStatus: "inStock" | "lowStock" | "outOfStock";

    if (!product.inStock) {
      stockStatus = "outOfStock";
    } else if (product.quantity < 5) {
      stockStatus = "lowStock";
    } else {
      stockStatus = "inStock";
    }

    return (
      (!searchTerm ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!selectedCategory || product.category === selectedCategory) &&
      (isPriceFilter
        ? product.price >= priceRange[0] && product.price <= priceRange[1]
        : true) &&
      (!selectedStock || selectedStock === stockStatus)
    );
  });

  return (
    <section>
      <PageBanner pageName="Shop" title="Shop Now" />

      <div className="mt-10 sm:mt-20 max-width flex flex-col md:flex-row items-start gap-4">
        <div className="w-full md:w-[400px]">
          <ProductLeft />
        </div>
        <div className="flex-1 grid gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 relative">
          {filteredProducts?.length > 0 ? (
            filteredProducts?.map((product: TProductData, idx: number) => (
              <ProductCard key={idx} product={product} />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full mt-10">
              No products found!
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
