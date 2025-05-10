// components/ProductCard.jsx
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { Environment, Center } from "@react-three/drei";
import { proxy } from "valtio";
import Shirt from "../canvas/Shirt";
import state from "../store";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  // Create a new proxy state for each product with useMemo to prevent unnecessary re-creation
  const productState = useMemo(() => {
    return proxy({
      color: product.defaultColor,
      isLogoTexture: false,
      isFullTexture: false,
      logoDecal: "./threejs.png",
      fullDecal: "./threejs.png",
    });
  }, [product.defaultColor]);

  const handleCustomize = () => {
    // Set the selected product in state
    state.selectedProduct = product;

    // Set the initial color from the product
    state.color = product.defaultColor;

    // Navigate to customizer
    navigate(`/customize/${product.id}`);
  };

  return (
    <div className="product-card border rounded-lg overflow-hidden shadow-lg bg-white">
      <div className="product-image h-64 bg-gray-100 relative">
        <Canvas
          shadows
          camera={{ position: [0, 0, 2.5], fov: 25 }}
          gl={{ preserveDrawingBuffer: true }}
          className="w-full h-full"
        >
          <ambientLight intensity={0.5} />
          <Environment files="/potsdamer_platz_1k.hdr" background={false} />
          <Center>
            <group scale={2} rotation={[0, Math.PI / 4, 0]}>
              <Shirt customState={productState} />
            </group>
          </Center>
        </Canvas>
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold">{product.name}</h3>
        <p className="text-gray-600 my-2">{product.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
          <button
            onClick={handleCustomize}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Customize
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
