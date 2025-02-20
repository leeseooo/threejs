import { useFrame } from "@react-three/fiber";

import { useRef } from "react";

export default function AnimalCrossingCharacter({
  position = [0, 0, 0],
}: {
  position: [number, number, number];
}) {
  const characterRef = useRef<THREE.Group>(null);
  const angleRef = useRef(0); // useRef로 angle 값 관리

  useFrame((_, delta) => {
    if (characterRef.current) {
      angleRef.current += delta * 0.6; // 속도 조정
      const radius = 2.3; // 원의 반지름
      const x = Math.cos(angleRef.current) * radius;
      const z = Math.sin(angleRef.current) * radius;
      characterRef.current.position.set(x, position[1], z);
      characterRef.current.rotation.y = -angleRef.current; // 캐릭터가 이동 방향을 바라보도록 회전
    }
  });

  return (
    <group ref={characterRef} position={position}>
      {/* 머리 */}
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial color="peachpuff" />
      </mesh>

      {/* 몸통 */}
      <mesh position={[0, 0.75, 0]}>
        <capsuleGeometry args={[0.4, 0.8, 8, 16]} />
        <meshStandardMaterial color="lightblue" />
      </mesh>

      {/* 눈 (왼쪽) */}
      <mesh position={[-0.3, 1.65, 0.65]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshStandardMaterial color="black" />
      </mesh>

      {/* 눈 (오른쪽) */}
      <mesh position={[0.3, 1.65, 0.65]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshStandardMaterial color="black" />
      </mesh>

      {/* 입 (원형) */}
      <mesh position={[0, 1.4, 0.7]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.15, 16]} />
        <meshStandardMaterial color="pink" />
      </mesh>

      {/* 귀 (왼쪽) */}
      <mesh position={[-0.5, 2, 0]} rotation={[Math.PI / 6, 0, 0]}>
        <sphereGeometry args={[0.1, 24, 24]} />

        <meshStandardMaterial color="peachpuff" />
      </mesh>

      {/* 귀 (오른쪽) */}
      <mesh position={[0.5, 2, 0]} rotation={[Math.PI / 6, 0, 0]}>
        <sphereGeometry args={[0.1, 24, 24]} />

        <meshStandardMaterial color="peachpuff" />
      </mesh>

      {/* 팔 (왼쪽) */}
      <mesh position={[-0.5, 0.6, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.6, 12]} />
        <meshStandardMaterial color="peachpuff" />
      </mesh>

      {/* 팔 (오른쪽) */}
      <mesh position={[0.5, 0.6, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.6, 12]} />
        <meshStandardMaterial color="peachpuff" />
      </mesh>

      {/* 다리 (왼쪽) */}
      <mesh position={[-0.2, 0.3, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.6, 12]} />
        <meshStandardMaterial color="peachpuff" />
      </mesh>

      {/* 다리 (오른쪽) */}
      <mesh position={[0.2, 0.3, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.6, 12]} />
        <meshStandardMaterial color="peachpuff" />
      </mesh>
    </group>
  );
}

// export default function ThreeScene() {
//   return (
//     <Canvas camera={{ position: [0, 3, 5], fov: 50 }}>
//       {/* 빛 추가 */}
//       <directionalLight position={[3, 5, 2]} intensity={1.5} />
//       <ambientLight intensity={0.5} />

//       {/* 캐릭터 배치 */}
//       <AnimalCrossingCharacter position={[0, 0, 0]} />
//       <AnimalCrossingCharacter position={[2, 0, -1]} />
//       <AnimalCrossingCharacter position={[-2, 0, 1]} />

//       {/* 마우스 컨트롤 */}
//       <OrbitControls />
//     </Canvas>
//   );
// }
