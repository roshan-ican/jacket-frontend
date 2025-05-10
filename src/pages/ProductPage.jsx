// pages/ProductPage.jsx
import React from "react";
import ProductCard from "../components/ProductCard";

// Product data with predefined colors and details
const products = [
  {
    id: 1,
    name: "Classic White T-Shirt",
    price: 29.99,
    description: "Our flagship customizable t-shirt with premium cotton",
    defaultColor: "#ffffff", // White
  },
  {
    id: 2,
    name: "Midnight Black Tee",
    price: 29.99,
    description: "Elegant black t-shirt perfect for any occasion",
    defaultColor: "#000000", // Black
  },
  {
    id: 3,
    name: "Ocean Blue T-Shirt",
    price: 32.99,
    description: "Cool and refreshing blue t-shirt for a casual look",
    defaultColor: "#0077be", // Blue
  },
  {
    id: 4,
    name: "Forest Green Tee",
    price: 32.99,
    description: "Natural green t-shirt that stands out in the crowd",
    defaultColor: "#228B22", // Forest Green
  },
];

const ProductPage = () => {
  return (
    <div className="product-page py-8">
      <h1 className="text-3xl font-bold text-center my-8">
        Our T-Shirt Collection
      </h1>

      <div className="product-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
