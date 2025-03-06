import { Environment, OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import gsap from "gsap";

export default function WaterDroplet() {
  const dropletRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (dropletRef.current === undefined) return;
    gsap.to(dropletRef.current!.position, {
      y: -2,
      repeat: -1,
      yoyo: true,
      duration: 2,
    });
  });

  return (
    <>
      <ambientLight intensity={0.5} />

      {/* 물방울 */}
      <mesh ref={dropletRef} position={[3, 3, 3]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhysicalMaterial
          color="#99ccff"
          transparent
          opacity={0.7}
          roughness={0.1}
          metalness={0}
          clearcoat={1}
          clearcoatRoughness={0}
          ior={1.33}
          transmission={1}
        />
      </mesh>

      <mesh position={[4, 1, 4]}>
        <sphereGeometry args={[1, 64, 64]} /> {/* 물방울의 기본 모양 */}
        <meshPhysicalMaterial
          color="#99ccff" // 옅은 파란색
          transparent
          opacity={0.7} // 투명도 조절
          roughness={0.1} // 표면 매끄럽게
          metalness={0} // 금속성 없음
          clearcoat={1} // 광택 효과
          clearcoatRoughness={0} // 광택 유지
          ior={1.33} // 물의 굴절률 (1.33)
          transmission={1} // 빛을 투과시켜 유리처럼 보이게 함
        />
      </mesh>
      {/* <Environment preset="sunset" /> */}
      <OrbitControls />
    </>
  );
}

// <mesh position={[4, 1, 4]}>
//   <sphereGeometry args={[1, 64, 64]} /> {/* 물방울의 기본 모양 */}
//   <meshPhysicalMaterial
//     color="#99ccff" // 옅은 파란색
//     transparent
//     opacity={0.7} // 투명도 조절
//     roughness={0.1} // 표면 매끄럽게
//     metalness={0} // 금속성 없음
//     clearcoat={1} // 광택 효과
//     clearcoatRoughness={0} // 광택 유지
//     ior={1.33} // 물의 굴절률 (1.33)
//     transmission={1} // 빛을 투과시켜 유리처럼 보이게 함
//   />
// </mesh>;
