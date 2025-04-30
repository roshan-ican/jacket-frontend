import React from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Center } from "@react-three/drei";

import Shirt from "./Shirt";
import CameraRig from "./CameraRig";

const CanvasModel = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <Environment files={"/potsdamer_platz_1k.hdr"} />
      <CameraRig>
        <Shirt />
      </CameraRig>
    </Canvas>
  );
};

export default CanvasModel;
