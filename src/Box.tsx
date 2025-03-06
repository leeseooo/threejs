import * as THREE from "three";

import { useEffect, useRef } from "react";
import { useControls } from "leva";
import { useHelper } from "@react-three/drei";

export default function Box() {
  const boxGridRef = useRef<THREE.Mesh>(null);
  const boxRef = useRef<THREE.Mesh>(null);

  const lightRef = useRef<THREE.DirectionalLight>(null); // DirectionalLight Ref

  const box = useControls({
    width: {
      value: 1,
      min: 0.1,
      max: 10,
      step: 0.1,
    },
    height: {
      value: 1,
      min: 0.1,
      max: 10,
      step: 0.1,
    },
    depth: {
      value: 1,
      min: 0.1,
      max: 10,
      step: 0.1,
    },
    rotation: { value: 0, min: -360, max: 360, step: 1 },
  });

  // DirectionalLightHelper 추가
  useHelper(
    lightRef as React.MutableRefObject<THREE.DirectionalLight>,
    THREE.DirectionalLightHelper,
    1
  );

  useEffect(() => {
    if (boxRef.current === null) return;
    if (boxGridRef.current === null) return;

    boxRef.current.geometry = boxGridRef.current?.geometry;
  }, [box]);

  return (
    <>
      {/* 방향광 추가 */}
      {/* <directionalLight ref={lightRef} position={[5, 5, 5]} intensity={1} /> */}

      {/* 박스 객체 */}
      <mesh
        ref={boxGridRef}
        position={[0, 1, 0]}
        rotation={[
          THREE.MathUtils.degToRad(0),
          THREE.MathUtils.degToRad(box.rotation),
          0,
        ]}
      >
        <boxGeometry args={[box.width, box.height, box.depth]} />
        <meshStandardMaterial wireframe />
      </mesh>

      <mesh
        ref={boxRef}
        position={[0, 1, 0]}
        rotation={[
          THREE.MathUtils.degToRad(0),
          THREE.MathUtils.degToRad(box.rotation),
          0,
        ]}
      >
        <boxGeometry />
        <meshStandardMaterial color="blue" />
      </mesh>
    </>
  );
}
