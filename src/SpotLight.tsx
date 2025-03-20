import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

type SpotlightProps = {
  position: [number, number, number];
  target: React.RefObject<THREE.Object3D>;
};

const Stage = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
      <planeGeometry args={[10, 10]} />
      <meshStandardMaterial color="gray" side={THREE.DoubleSide} />
    </mesh>
  );
};

const Podium = () => {
  return (
    <>
      {/* 1st Place (Center, Highest) */}
      <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 1.5, 1]} />
        <meshStandardMaterial color="gold" />
      </mesh>
      {/* 2nd Place (Left, Medium) */}
      <mesh position={[-2, -0.01, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 1, 1]} />
        <meshStandardMaterial color="silver" />
      </mesh>
      {/* 3rd Place (Right, Lowest) */}
      <mesh position={[2, -0.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 0.75, 1]} />
        <meshStandardMaterial color="#cd7f32" />
      </mesh>
    </>
  );
};

const Spotlight = ({ position, target }: SpotlightProps) => {
  const lightRef = useRef<THREE.SpotLight>(null);
  return (
    <>
      <spotLight
        ref={lightRef}
        position={position}
        angle={0.5}
        penumbra={0.7}
        intensity={15}
        castShadow
        color="white"
        target={target.current || undefined}
      />
      <mesh position={position}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color="yellow" />
      </mesh>
    </>
  );
};

const Scene = () => {
  const firstPlaceRef = useRef<THREE.Mesh>(null);
  const secondPlaceRef = useRef<THREE.Mesh>(null);
  const thirdPlaceRef = useRef<THREE.Mesh>(null);

  const { nodes } = useGLTF("asset/spoon_b.glb"); // 업로드한 GLB 파일 경로 지정
  const geometry = nodes.geometry_0 as unknown as THREE.BufferGeometry;
  console.log(nodes);

  return (
    <Canvas
      shadows
      camera={{ position: [0, 5, 10], fov: 50 }}
      style={{ background: "black" }}
    >
      <ambientLight intensity={1} />
      <Stage />
      <Podium />

      <Spotlight position={[0, 5, 2]} target={firstPlaceRef} />
      <Spotlight position={[-2, 4, 2]} target={secondPlaceRef} />
      <Spotlight position={[2, 3, 2]} target={thirdPlaceRef} />

      <mesh
        castShadow
        receiveShadow
        geometry={geometry}
        material={new THREE.MeshStandardMaterial({ color: "white" })}
        name={"geometry_0"}
        dispose={null}
        position={[0, 1.5, 0]}
      ></mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={geometry}
        material={new THREE.MeshStandardMaterial({ color: "white" })}
        name={"geometry_0"}
        dispose={null}
        position={[-2, 0.96, 0]}
      ></mesh>

      {/* <mesh
        castShadow
        receiveShadow
        geometry={geometry.geometry}
        material={geometry.material}
        name={"geometry_0"}
        dispose={null}
        position={[2, 0.75, 0]}
      ></mesh> */}

      <OrbitControls />
    </Canvas>
  );
};

export default Scene;
