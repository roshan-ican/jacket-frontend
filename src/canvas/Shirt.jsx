// canvas/Shirt.jsx
import React, { useRef } from "react";
import { useSnapshot } from "valtio";
import state from "../store";
import { useGLTF, useTexture, Decal } from "@react-three/drei";
import { easing } from "maath";
import { useFrame } from "@react-three/fiber";

const Shirt = ({ customState }) => {
  // Use a properly structured state object
  const stateToUse = customState || state;

  // Use useSnapshot at the top level
  const snap = useSnapshot(stateToUse);

  // Load the 3D model
  const { nodes, materials } = useGLTF("./shirt_baked.glb");

  // Use optional chaining to safely access properties
  const logoTexture = useTexture(snap?.logoDecal || state.logoDecal);
  const fullTexture = useTexture(snap?.fullDecal || state.fullDecal);

  logoTexture.anisotropy = 16;
  fullTexture.anisotropy = 16;

  const shirtRef = useRef();

  useFrame((_, delta) => {
    if (snap?.color) {
      easing.dampC(materials.lambert1.color, snap.color, 0.25, delta);
    }
  });

  // Generate a key for React to know when to re-render
  const stateString = JSON.stringify({
    color: snap?.color || "#FFFFFF",
    isLogoTexture: snap?.isLogoTexture || false,
    isFullTexture: snap?.isFullTexture || false,
  });

  return (
    <group key={stateString}>
      <mesh
        ref={shirtRef}
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
      >
        {/* FULL TEXTURE - Only show if explicitly true */}
        {snap?.isFullTexture === true && (
          <Decal
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
          />
        )}

        {/* LOGO - Only show if explicitly true */}
        {snap?.isLogoTexture === true && (
          <Decal
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture}
          />
        )}
      </mesh>
    </group>
  );
};

export default Shirt;
