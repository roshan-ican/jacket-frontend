import React, { useRef } from "react";
import { useSnapshot } from "valtio";
import state from "../store";
import { useGLTF, useTexture, Decal } from "@react-three/drei";
import { easing } from "maath";
import { useFrame } from "@react-three/fiber";

const Shirt = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF("./shirt_baked.glb");

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  logoTexture.anisotropy = 16;
  fullTexture.anisotropy = 16;

  const shirtRef = useRef(); // ✅

  useFrame((state, delta) => {
    easing.dampC(
      // shirtRef.current.rotation,
      materials.lambert1.color,
      snap.color,
      // [state.pointer.y / 10, -state.pointer.x / 10, 0],
      0.25,
      delta
    );
  });

  const stateString = JSON.stringify(snap);

  return (
    <group key={stateString}>
      <mesh
        ref={shirtRef} // ✅ attach the ref
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
      >
        {/* FULL TEXTURE */}
        {snap.isFullTexture && (
          <Decal
            mesh={shirtRef.current} // ✅ tell decal what mesh to attach to
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
          />
        )}

        {/* LOGO */}
        {snap.isLogoTexture && (
          <Decal
            mesh={shirtRef.current} // ✅ required
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
