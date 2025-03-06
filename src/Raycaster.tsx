import * as THREE from "three";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useState } from "react";

// 🎯 1. 원형 다트보드 과녁 (이미지+마스크 적용)
function Target({ onHover }: { onHover: (hovering: boolean) => void }) {
  const texture = useLoader(THREE.TextureLoader, "../public/asset/과녁.png"); // 과녁 이미지
  return (
    <mesh
      name="target"
      position={[0, 2, -5]}
      onPointerOver={() => onHover(true)}
      onPointerOut={() => onHover(false)}
    >
      <circleGeometry args={[1.5, 64]} /> {/* 원형 과녁 */}
      <meshBasicMaterial map={texture} transparent />
    </mesh>
  );
}

// 🏹 2. 화살 애니메이션 (이동 후 박힘)
function Arrow({
  start,
  target,
  onHit,
}: {
  start: THREE.Vector3;
  target: THREE.Vector3;
  onHit: (
    finalPosition: THREE.Vector3,
    finalRotation: THREE.Quaternion
  ) => void;
}) {
  const ref = useRef<THREE.Group>(null);
  const position = new THREE.Vector3().copy(start);
  const direction = new THREE.Vector3().subVectors(target, start).normalize();
  let progress = 0;

  useFrame(() => {
    if (!ref.current) return;

    progress += 0.02; // 속도 조정
    if (progress > 1) progress = 1; // 1을 넘지 않도록 제한

    position.lerpVectors(start, target, progress);
    ref.current.position.copy(position);
    ref.current.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.clone().normalize()
    );

    if (progress >= 1) {
      // 화살이 과녁을 반쯤 통과하도록 조정
      const penetrationDepth = 0.5;
      const finalPosition = target
        .clone()
        .addScaledVector(direction, -penetrationDepth);

      // 현재 회전 상태 유지
      const finalRotation = ref.current.quaternion.clone();

      onHit(finalPosition, finalRotation);
    }
  });

  return (
    <group ref={ref} position={start.toArray()}>
      {/* 화살대 */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 1, 8]} />
        <meshBasicMaterial color="brown" />
      </mesh>
      {/* 화살촉 */}
      <mesh position={[0, 1, 0]}>
        <coneGeometry args={[0.1, 0.3, 8]} />
        <meshBasicMaterial color="gray" />
      </mesh>
    </group>
  );
}

// 📊 3. 점수판 UI
function ScoreBoard({ score }: { score: number }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        fontSize: "24px",
        fontWeight: "bold",
        color: "white",
      }}
    >
      점수: {score}
    </div>
  );
}

// 🎯 4. 카메라 위치에 조준 UI (3D Crosshair)
function Crosshair3D() {
  const { camera } = useThree();
  const ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (ref.current) {
      const offset = new THREE.Vector3(0, -0.1, -0.5);
      ref.current.position.copy(camera.position).add(offset);
      ref.current.quaternion.copy(camera.quaternion);
    }
  });

  return (
    <mesh ref={ref}>
      <ringGeometry args={[0.02, 0.05, 32]} />
      <meshBasicMaterial color="white" />
    </mesh>
  );
}

// 🔫 5. 씬(Scene) 컴포넌트
function Scene({ setScore }: { setScore: (score: number) => void }) {
  const { camera, scene } = useThree();
  const [flyingArrows, setFlyingArrows] = useState<
    { start: THREE.Vector3; target: THREE.Vector3 }[]
  >([]);
  const [stuckArrows, setStuckArrows] = useState<
    { position: THREE.Vector3; rotation: THREE.Quaternion }[]
  >([]);
  const [hovering, setHovering] = useState(false);

  const handleShoot = (e: any) => {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(
      (e.clientX / window.innerWidth) * 2 - 1,
      -(e.clientY / window.innerHeight) * 2 + 1
    );

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length > 0) {
      console.log("🎯 과녁 맞춤!");
      const hitPosition = intersects[0].point;
      const arrowStart = new THREE.Vector3()
        .copy(camera.position)
        .add(new THREE.Vector3(0.5, -0.2, -0.5));

      setFlyingArrows([
        ...flyingArrows,
        { start: arrowStart, target: hitPosition },
      ]);
    }
  };

  return (
    <group onClick={handleShoot}>
      <ambientLight />
      <Target onHover={setHovering} />
      <Crosshair3D />
      {stuckArrows.map((arrow, i) => (
        <group
          key={i}
          position={arrow.position.toArray()}
          quaternion={arrow.rotation}
        >
          <mesh position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 1, 8]} />
            <meshBasicMaterial color="brown" />
          </mesh>
          <mesh position={[0, 1, 0]}>
            <coneGeometry args={[0.1, 0.3, 8]} />
            <meshBasicMaterial color="gray" />
          </mesh>
        </group>
      ))}
      {flyingArrows.map((a, i) => (
        <Arrow
          key={i}
          start={a.start}
          target={a.target}
          onHit={(finalPosition, finalRotation) => {
            setStuckArrows([
              ...stuckArrows,
              { position: finalPosition, rotation: finalRotation },
            ]);
            setFlyingArrows(flyingArrows.filter((_, index) => index !== i));
          }}
        />
      ))}
      <OrbitControls />
    </group>
  );
}

// 🎮 6. 전체 앱
export default function App() {
  const [score, setScore] = useState(0);

  return (
    <>
      <ScoreBoard score={score} />
      <Canvas camera={{ position: [5, 5, 5] }}>
        {/* 드래그로 카메라 이동, 휠로 줌인/아웃 */}
        <OrbitControls />
        {/* x, y, z축을 보여줌 */}
        <axesHelper args={[6]} />
        {/* 격자를 보여줌 */}
        <gridHelper />
        <Scene setScore={setScore} />
      </Canvas>
    </>
  );
}
