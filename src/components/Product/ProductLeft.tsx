import { Input, Slider } from "antd";
import { useState } from "react";
import {
  makePriceFilter,
  resetPriceFilter,
  setPriceRange,
  setSearchTerm,
  setSelectedCategory,
  setSelectedStock,
  StockStatus,
} from "../../Redux/features/product/productSlice";
import { useAppDispatch, useAppSelector } from "../../Redux/hook";
import { categories } from "../../utils/categories";

const { Search } = Input;

const ProductLeft = () => {
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState("");

  const { selectedCategory, selectedStock, isPriceFilter, priceRange } =
    useAppSelector((state) => state.product);

  const onSearch = (value: string) => {
    dispatch(setSearchTerm(value));
  };

  return (
    <div className="w-full">
      <div className="bg-white p-5 rounded-lg">
        {/* Search */}
        <div className="mb-5">
          <h2 className="text-xl text-blackish font-semibold pb-3 mb-4 border-b border-gray-200">
            Search
          </h2>
          <Search
            className="custom-search"
            placeholder="Search by brand, bicycle name or category"
            size="large"
            enterButton
            allowClear
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onSearch={onSearch}
          />
        </div>

        {/* Categories */}
        <div className="mb-5">
          <h2 className="text-xl font-semibold pb-3 mb-4 border-b border-gray-200">
            Categories
          </h2>
          <ul className="pl-5 space-y-1">
            {categories.map((c) => (
              <li
                onClick={() => dispatch(setSelectedCategory(c.name))}
                className={`list-disc hover:text-primary duration-300 cursor-pointer ${
                  selectedCategory === c.name ? "text-primary" : ""
                }`}
                key={c.id}
              >
                {c.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Price Filter */}
        <div className="mb-5">
          <h2 className="text-xl text-blackish font-semibold pb-3 mb-4 border-b border-gray-200">
            Filter by price
          </h2>
          <Slider
            range
            defaultValue={priceRange}
            min={0}
            max={500}
            onChange={(value) => dispatch(setPriceRange(value as [number, number]))}
            tooltip={{ formatter: (value) => `$${value}` }}
          />
          <div className="mt-5 text-gray-700 font-medium flex flex-wrap items-center gap-2 justify-between">
            <p>
              Price : ${priceRange[0]} - ${priceRange[1]}
            </p>
            <div className="space-x-3">
              <button
                type="button"
                onClick={() => dispatch(resetPriceFilter())}
                className={`bg-white border border-primary/85 text-primary font-medium py-2 px-6 rounded-lg duration-300 cursor-pointer select-none tracking-wide ${
                  !isPriceFilter ? "opacity-0" : "opacity-100"
                }`}
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => dispatch(makePriceFilter())}
                className="bg-primary hover:bg-primary/85 text-white font-medium py-2.5 px-6 rounded-lg duration-300 cursor-pointer select-none tracking-wide "
              >
                Filter
              </button>
            </div>
          </div>
        </div>

        {/* Stock */}
        <div>
          <h2 className="text-xl font-semibold pb-3 mb-4 border-b border-gray-200">
            Stock
          </h2>
          <div className="space-y-2">
            {["inStock", "lowStock", "outOfStock"].map((status) => (
              <label key={status} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-primary size-4"
                  checked={selectedStock === status}
                  onChange={() =>
                    dispatch(
                      setSelectedStock(
                        selectedStock === status
                          ? null
                          : (status as StockStatus)
                      )
                    )
                  }
                />
                <span className="text-gray-700 font-medium select-none">
                  {status.replace(/([A-Z])/g, " $1")}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductLeft;
