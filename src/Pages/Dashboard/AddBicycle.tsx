import { Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useCreateProductMutation } from "../../Redux/features/product/productApi";
import { categories } from "../../utils/categories";

const AddBicycle = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "",
    price: "",
    quantity: "",
    description: "",
    image: null as File | null,
    imagePreview: null as string | null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: null,
      imagePreview: null,
    }));

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("name", formData.name);
      productData.append("brand", formData.brand);
      productData.append("category", formData.category);
      productData.append("price", formData.price);
      productData.append("quantity", formData.quantity);
      productData.append("description", formData.description);

      if (formData.image) {
        productData.append("imageUrl", formData.image);
      }

      await createProduct(productData).unwrap();
      toast.success("Product created successfully");
      setFormData({
        name: "",
        brand: "",
        category: "",
        price: "",
        quantity: "",
        description: "",
        image: null,
        imagePreview: null,
      });

      // Reset file input field
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Failed to create product");
    }
  };

  return (
    <section className="mt-2 bg-white px-6 py-4 rounded-lg border border-gray-200">
      <h2 className="mt-3 text-center text-2xl font-semibold mb-6 sm:mb-10 text-blackish">
        Create Bicycle
      </h2>
      <form className="space-y-4 lg:space-y-6" onSubmit={handleSubmit}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Name Input */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Name
            </label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Bicycle name"
              size="large"
            />
          </div>

          {/* Brand Input */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Brand
            </label>
            <Input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="Bicycle brand"
              size="large"
            />
          </div>

          {/* Category Select */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Category
            </label>
            <Select
              defaultValue={"Select Category"}
              //   value={formData.category}
              onChange={handleSelectChange}
              size="large"
              className="w-full"
              options={categories.map((category) => ({
                value: category.name,
                label: category.name,
              }))}
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Price Input */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Price
            </label>
            <Input
              type="number"
              name="price"
              step={"any"}
              value={formData.price}
              onChange={handleChange}
              min={0}
              placeholder="Bicycle price"
              size="large"
            />
          </div>

          {/* Quantity Input */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Quantity
            </label>
            <Input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min={0}
              placeholder="Bicycle quantity"
              size="large"
            />
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Upload Image
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="block w-full text-sm text-gray-400 border border-gray-300 rounded-lg cursor-pointer bg-white focus:outline-none py-2.5 px-3"
            onChange={handleImageChange}
          />

          {/* Image Preview */}
          {formData.imagePreview && (
            <div className="mt-3 flex items-center gap-4 relative">
              <img
                src={formData.imagePreview}
                alt="Preview"
                className="w-40 rounded-lg border border-gray-300"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="bg-primary text-white font-medium text-lg p-3 rounded-full hover:bg-primary/80 transition absolute top-2 left-2"
              >
                <RiDeleteBin6Line />
              </button>
            </div>
          )}
        </div>

        {/* Description Input */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Description
          </label>
          <TextArea
            name="description"
            value={formData.description}
            onChange={handleChange}
            size="large"
            rows={4}
            placeholder="Description"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isCreating}
          className="bg-primary text-white font-medium text-base py-3 px-6 rounded-lg inline-block hover:bg-primary/80 duration-300 disabled:bg-primary/50"
        >
          Add Bicycle
        </button>
      </form>
    </section>
  );
};

export default AddBicycle;
