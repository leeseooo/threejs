import * as THREE from "three";

import { useEffect, useRef } from "react";
import { useControls } from "leva";
import { useHelper } from "@react-three/drei";
import WaterDroplet from "./WaterDrop";

export default function Box() {
  const boxGridRef = useRef<THREE.Mesh>(null);
  const boxRef = useRef<THREE.Mesh>(null);

  // const groupRef = useRef<THREE.Group>(null);

  const meshRef = useRef<THREE.Mesh>(null);
  const mesh2Ref = useRef<THREE.Mesh>(null);

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
    if (mesh2Ref.current === null) return;
    if (meshRef.current === null) return;
    mesh2Ref.current!.geometry = meshRef.current?.geometry;
  }, [boxRef, boxGridRef, box]);

  return (
    <>
      {/* 방향광 추가 */}
      {/* <directionalLight ref={lightRef} position={[5, 5, 5]} intensity={1} /> */}
      <ambientLight color="blue" intensity={3} />
      {/* <hemisphereLight args={[blue, yellow]} /> */}
      <WaterDroplet />
      {/* <fog attach="fog" args={["red", 3, 10]} /> */}
      {/* 박스 객체 */}
      <mesh ref={boxRef} position={[0, 1, 0]}>
        <boxGeometry args={[box.width, box.height, box.depth]} />
        <meshBasicMaterial color={"green"} />
      </mesh>
      <mesh ref={boxRef} position={[2, 1, 0]}>
        <boxGeometry />
        <meshBasicMaterial
          color="blue"
          visible
          // 보이는 방향
          // 안쪽 frontSide
          // 바깥쪽 backSide
          side={THREE.DoubleSide}
          // alphaTest: 0.5 이하면 투명하게 처리
          alphaTest={0.5}
          opacity={0.5}
          transparent={true}
          // z-index 적용X
          depthTest
        />
      </mesh>
      <mesh ref={boxRef} position={[4, 1, 0]}>
        <boxGeometry />
        {/* 반사광이 없는 매트한 재질 */}
        <meshLambertMaterial
          color="blue"
          emissive={"red"}
          visible
          // 보이는 방향
          // 안쪽 frontSide
          // 바깥쪽 backSide
          side={THREE.DoubleSide}
          // alphaTest: 0.5 이하면 투명하게 처리
          alphaTest={0.5}
          opacity={0.5}
          transparent={true}
          // z-index 적용X
          depthTest
        />
      </mesh>
      {/* new */}
      <mesh ref={boxRef} position={[0, 1, 2]}>
        <sphereGeometry />
        <meshBasicMaterial wireframe color={"green"} />
      </mesh>
      <mesh ref={boxRef} position={[2, 1, 2]}>
        <sphereGeometry />
        <meshBasicMaterial
          color="blue"
          visible
          // 보이는 방향
          // 안쪽 frontSide
          // 바깥쪽 backSide
          side={THREE.DoubleSide}
          // alphaTest: 0.5 이하면 투명하게 처리
          alphaTest={0.5}
          opacity={0.5}
          transparent={true}
          // z-index 적용X
          depthTest
        />
      </mesh>
      <mesh ref={boxRef} position={[4, 1, 2]}>
        <boxGeometry />
        {/* 반사광이 없는 매트한 재질 */}
        <meshLambertMaterial
          color="blue"
          emissive={"red"}
          visible
          // 보이는 방향
          // 안쪽 frontSide
          // 바깥쪽 backSide
          side={THREE.DoubleSide}
          // alphaTest: 0.5 이하면 투명하게 처리
          alphaTest={0.5}
          opacity={0.5}
          transparent={true}
          // z-index 적용X
          depthTest
        />
      </mesh>
      <mesh ref={boxRef} position={[6, 1, 2]}>
        <sphereGeometry />
        {/* 반사광이 없는 매트한 재질 */}
        <meshPhongMaterial
          color="blue"
          emissive={"red"}
          visible
          // 보이는 방향
          // 안쪽 frontSide
          // 바깥쪽 backSide
          side={THREE.DoubleSide}
          // alphaTest: 0.5 이하면 투명하게 처리
          alphaTest={0.5}
          opacity={1}
          transparent={true}
          // z-index 적용X
          depthTest
          specular={"white"}
        />
      </mesh>
      <mesh ref={boxRef} position={[9, 1, 2]}>
        <sphereGeometry />
        {/* 반사광이 없는 매트한 재질 */}
        <meshNormalMaterial />
      </mesh>
    </>
  );
}
