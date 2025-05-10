// components/ProductCanvas.jsx
import React from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Center } from "@react-three/drei";
import Shirt from "../canvas/Shirt";

const ProductCanvas = ({ product }) => {
  // Create a minimal state object with just the properties needed for display
  const productState = {
    color: product.defaultColor,
    isLogoTexture: false,
    isFullTexture: false,
    logoDecal: "./threejs.png",
    fullDecal: "./threejs.png",
  };

  return (
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
  );
};

export default ProductCanvas;
