import { Input, Slider } from "antd";
import React, { useState } from "react";
import { categories } from "../../utils/categories";

const { Search } = Input;
// type SearchProps = GetProps<typeof Input.Search>;
type StockStatus = "inStock" | "lowStock" | "outOfStock";
type TCategory = (typeof categories)[number]["name"];

const ProductLeft = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<TCategory | null>(
    null
  );
  const [priceRange, setPriceRange] = useState([50, 200]);
  const [selectedStock, setSelectedStock] = useState<StockStatus | null>(null);

  const onSearch = (value: string) => {
    console.log("Search term:", value);
  };
  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const handleSliderChange = (value: Array<number>) => {
    setPriceRange(value);
  };

  const handleCategory = (option: TCategory | null) => {
    setSelectedCategory((prev) => (prev === option ? null : option));
  };
  const handleCheckboxChange = (option: StockStatus | null) => {
    setSelectedStock((prev) => (prev === option ? null : option));
  };

  return (
    <div className="w-full">
      <div className="bg-white p-5 rounded-lg">
        <div className="mb-5">
          <h2 className="text-xl text-blackish font-semibold pb-3 mb-4 border-b border-gray-200">
            Search
          </h2>
          <Search
            className="custom-search"
            placeholder="Search by brand, bicycle name or category"
            onSearch={onSearch}
            size="large"
            enterButton
            allowClear
            value={searchTerm}
            onChange={onSearchChange}
          />
        </div>

        <div className="mb-5">
          <h2 className="text-xl font-semibold pb-3 mb-4 border-b border-gray-200">
            Categories
          </h2>
          <ul className="pl-5 space-y-1">
            {categories.map((c) => (
              <li
                onClick={() => handleCategory(c.name)}
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

        <div className="mb-5">
          <h2 className="text-xl text-blackish font-semibold pb-3 mb-4 border-b border-gray-200">
            Filter by price
          </h2>
          <Slider
            range
            defaultValue={[50, 200]}
            min={0}
            max={500}
            onChange={handleSliderChange}
            tooltip={{ formatter: (value) => `$${value}` }}
          />
          <div className="mt-5 text-gray-700 font-medium flex items-center gap-2 justify-between">
            <p>
              Price : ${priceRange[0]} - ${priceRange[1]}
            </p>
            <button className="bg-primary hover:bg-primary/85 text-white font-medium py-2.5 px-8 rounded-lg duration-300 cursor-pointer select-none tracking-wide">
              Filter
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold pb-3 mb-4 border-b border-gray-200">
            Stock
          </h2>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="accent-primary size-4"
                checked={selectedStock === "inStock"}
                onChange={() => handleCheckboxChange("inStock")}
              />
              <span className="text-gray-700 font-medium select-none">
                In stock
              </span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="accent-primary size-4"
                checked={selectedStock === "lowStock"}
                onChange={() => handleCheckboxChange("lowStock")}
              />
              <span className="text-gray-700 font-medium select-none">
                Low stock
              </span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="accent-primary size-4"
                checked={selectedStock === "outOfStock"}
                onChange={() => handleCheckboxChange("outOfStock")}
              />
              <span className="text-gray-700 font-medium select-none">
                Out of stock
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductLeft;
