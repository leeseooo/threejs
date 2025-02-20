// import { useControls } from "leva";
import { useRef } from "react";

export default function Tree({
  position = [0, 0, 0],
}: {
  // x  y  z
  position?: [number, number, number];
}) {
  const treeRef = useRef<THREE.Group>(null);

  // const tree = useControls({
  //   position: { value: 0, min: -10, max: 10, step: 1 },
  // });

  return (
    <group position={position} ref={treeRef}>
      {/* 나뭇잎 (콘 모양) */}
      <mesh position={[0, 1, 0]}>
        <coneGeometry args={[0.8, 1.5, 16]} />
        <meshStandardMaterial color="green" />
      </mesh>
      {/* 나무 줄기 (원기둥) */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 1.5, 12]} />
        <meshStandardMaterial color="saddlebrown" />
      </mesh>
    </group>
  );
}
