import { Canvas, useThree, type ThreeEvent } from "@react-three/fiber";
import { OrbitControls, Text3D, Html, Float } from "@react-three/drei";
import { useState, useRef, useCallback } from "react";
import * as THREE from "three";
import React from "react";

function PaperScene() {
  const [text, setText] = useState<string>("입력하세요");
  const [texts, setTexts] = useState<
    { text: string; x: number; y: number; color: string }[]
  >([]);
  const [selectedColor, setSelectedColor] = useState<string>("black");

  const sceneRef = useRef<THREE.Group>(null);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Scene
          ref={sceneRef}
          texts={texts}
          setTexts={setTexts}
          selectedText={text}
          selectedColor={selectedColor}
        />
      </Canvas>

      <div style={{ position: "absolute", top: 20, left: 20 }}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            fontSize: "16px",
            padding: "5px",
            width: "300px",
            marginBottom: "10px",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "10px",
        }}
      >
        {["black", "red", "blue", "green"].map((color) => (
          <button
            key={color}
            onClick={() => setSelectedColor(color)}
            style={{
              fontSize: "16px",
              padding: "8px",
              cursor: "pointer",
              background: selectedColor === color ? "gray" : color,
              color: color === "black" ? "white" : "black",
              border: "1px solid black",
              borderRadius: "5px",
            }}
          >
            {color.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}

const Scene = React.forwardRef<
  THREE.Group,
  {
    texts: { text: string; x: number; y: number; color: string }[];
    setTexts: React.Dispatch<
      React.SetStateAction<
        { text: string; x: number; y: number; color: string }[]
      >
    >;
    selectedText: string;
    selectedColor: string;
  }
>(({ texts, setTexts, selectedText, selectedColor }) => {
  const { camera, scene, gl } = useThree();
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const paperRef = useRef<THREE.Mesh>(null);

  // 📌 3D 텍스트 추가 로직
  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    if (!selectedText) return;

    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);

    if (paperRef.current) {
      const intersects = raycaster.intersectObject(paperRef.current);
      if (intersects.length > 0) {
        const { point } = intersects[0];

        setTexts((prev) => [
          ...prev,
          { text: selectedText, x: point.x, y: point.y, color: selectedColor },
        ]);
      }
    }
  };

  // 📌 캡처 함수 개선 (WebGL 사용)
  const captureImage = useCallback(() => {
    gl.render(scene, camera); // 최신 프레임 렌더링
    const dataURL = gl.domElement.toDataURL("image/png");

    const link = document.createElement("a");
    link.download = "3D_Letter.png";
    link.href = dataURL;
    link.click();
  }, [gl, scene, camera]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />

      {/* 📌 편지지 */}
      <mesh
        ref={paperRef}
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
        onPointerDown={handlePointerDown}
      >
        <boxGeometry args={[3, 2, 0.05]} />
        <meshStandardMaterial color="white" />
      </mesh>

      {/* 📌 추가된 3D 텍스트 */}
      {texts.map(({ text, x, y, color }, index) => (
        <Text3D
          font="/asset/fonts/Nanum GaRamYeonGgoc_Regular.json"
          key={index}
          size={0.2}
          height={0.05}
          position={[x, y, 0.051]}
        >
          {text}
          <meshStandardMaterial attach="material" color={color} />
        </Text3D>
      ))}

      <OrbitControls />

      {/* 📌 캡처 버튼 */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <Html position={[0, 2, 0]} transform>
          <button
            onClick={captureImage}
            style={{
              fontSize: "14px",
              padding: "6px",
              cursor: "pointer",
              background: "white",
              border: "1px solid black",
              borderRadius: "5px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
            }}
          >
            3D 편지 저장 📸
          </button>
        </Html>
      </Float>
    </>
  );
});

export default PaperScene;
