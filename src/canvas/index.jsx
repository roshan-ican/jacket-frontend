import React from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Center, OrbitControls } from "@react-three/drei";

import Shirt from "./Shirt";
import CameraRig from "./CameraRig";
import Backdrop from "./Backdrop";

const CanvasModel = () => {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 0], fov: 25 }}
      gl={{ preserveDrawingBuffer: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.1} />
      <Environment files="/potsdamer_platz_1k.hdr" background={false} />
      {/* 👈 important */}
      <Backdrop />
      <CameraRig>
        <Shirt />
      </CameraRig>
      <OrbitControls />
    </Canvas>
  );
};

export default CanvasModel;
