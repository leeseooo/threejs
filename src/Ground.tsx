import * as THREE from "three";

import { useTexture } from "@react-three/drei";

export default function Ground() {
  // 잔디 텍스처 불러오기 (drei의 useTexture 사용)
  const texture = useTexture(
    "https://threejs.org/examples/textures/terrain/grasslight-big.jpg"
  );

  // 텍스처 반복 설정 (큰 바닥에 자연스럽게 보이도록)
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(10, 10); // 텍스처를 10x10으로 반복

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[20, 20]} /> {/* 20x20 크기의 바닥 */}
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}
