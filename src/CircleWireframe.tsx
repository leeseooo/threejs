import * as THREE from "three";

import { useEffect, useRef } from "react";
import { useControls } from "leva";
import { useHelper } from "@react-three/drei";

export default function Circle() {
  const boxGridRef = useRef<THREE.Mesh>(null);
  const boxRef = useRef<THREE.Mesh>(null);

  const lightRef = useRef<THREE.DirectionalLight>(null); // DirectionalLight Ref

  const box = useControls({
    radius: { value: 1, min: 0.1, max: 10, step: 0.1 },
    seg: { value: 32, min: 1, max: 100, step: 1 },
    thetaStart: { value: 0, min: 0, max: 360, step: 0.1 },
    thetaLength: { value: 360, min: 0, max: 360, step: 0.1 },
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
      <directionalLight ref={lightRef} position={[5, 5, 5]} intensity={1} />

      {/* 박스 객체 */}
      <mesh ref={boxGridRef} position={[0, 3, 0]}>
        <circleGeometry
          args={[box.radius, box.seg, box.thetaStart, box.thetaLength]}
        />
        <meshStandardMaterial wireframe />
      </mesh>

      <mesh ref={boxRef} position={[0, 3, 0]}>
        <meshStandardMaterial color="red" />
      </mesh>
    </>
  );
}
