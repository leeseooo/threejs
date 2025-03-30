import { useControls } from 'leva';
import { useThree, type ThreeEvent } from '@react-three/fiber';
import { OrbitControls, Text3D, Html, Float, Image } from '@react-three/drei';
import { useRef, useCallback } from 'react';
import * as THREE from 'three';
import React from 'react';
import { MeritMoney } from './MeritMoney';

// 텍스트 및 스티커 z축 위치
const OBJECT_Z_POSITION = 0.051;

// 스티커 ID와 이미지 경로 매핑
const stickerMapperById: Record<string, string> = {
  sticker01: '/stickers/01.png',
  sticker02: '/stickers/02.png',
  sticker03: '/stickers/03.png',
  sticker04: '/stickers/04.png',
};

interface PaperSceneProps {
  texts: { text: string; x: number; y: number; color: string }[];
  // setTexts: React.Dispatch<
  //   React.SetStateAction<{ text: string; x: number; y: number; color: string }[]>
  // >;
  selectedText: string;
  // selectedColor: string;
  //
  selectedStickerId: string | undefined;
  stickerList: { sticker: string; point: THREE.Vector3 }[];
  setStickerList: React.Dispatch<
    React.SetStateAction<
      {
        sticker: string;
        point: THREE.Vector3;
      }[]
    >
  >;
}

const PaperScene = React.forwardRef<THREE.Group, PaperSceneProps>(
  (
    {
      texts,
      selectedStickerId,
      // setTexts,
      selectedText,
      // selectedColor,
      //
      stickerList,
      setStickerList,
    },
    ref
  ) => {
    const { camera, scene, gl } = useThree();

    const { stickerScale } = useControls({
      stickerScale: {
        value: 0.3,
        min: 0.1,
        max: 2,
        step: 0.05,
        label: '스티커 크기',
      },
    });

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const paperRef = useRef<THREE.Group>(null);

    // 📌 3D 텍스트 및 스티커 추가 로직
    const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
      event.stopPropagation();

      if (!selectedText) return;

      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);

      if (paperRef.current) {
        const intersects = raycaster.intersectObject(paperRef.current);
        if (intersects.length > 0) {
          const { point } = intersects[0];

          // setTexts((prev) => [
          //   ...prev,
          //   { text: selectedText, x: point.x, y: point.y, color: selectedColor },
          // ]);

          if (selectedStickerId) {
            const sticker = stickerMapperById[selectedStickerId];
            if (sticker) {
              setStickerList((prev) => [
                ...prev,
                {
                  sticker,
                  point,
                },
              ]);
            }
          }
        }
      }
    };

    // 📌 캡처 함수 개선 (WebGL 사용)
    const captureImage = useCallback(() => {
      gl.render(scene, camera); // 최신 프레임 렌더링
      const dataURL = gl.domElement.toDataURL('image/png');

      const link = document.createElement('a');
      link.download = '3D_Letter.png';
      link.href = dataURL;
      link.click();
    }, [gl, scene, camera]);

    return (
      <group ref={ref}>
        {/* <ambientLight intensity={0.5} /> */}
        {/* <directionalLight position={[5, 5, 5]} /> */}

        {/* 📌 편지지 */}
        <MeritMoney ref={paperRef} handlePointerDown={handlePointerDown} />

        {/* 📌 추가된 3D 텍스트 */}
        {texts.map(({ text, x, y, color }, index) => (
          <Text3D
            font="/asset/fonts/Nanum GaRamYeonGgoc_Regular.json"
            key={index}
            size={0.08}
            height={0.05}
            position={[x, y, OBJECT_Z_POSITION]}
          >
            {text}
            <meshStandardMaterial attach="material" color={color} />
          </Text3D>
        ))}

        {stickerList.map(({ sticker, point }) => (
          <Image
            url={sticker}
            position={[point.x, point.y, point.z + 0.01]} // z-fighting 방지
            transparent
            scale={stickerScale}
            toneMapped={false}
          />
        ))}

        <OrbitControls />

        {/* 📌 캡처 버튼 */}
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
          <Html position={[0, 2, 0]} transform>
            <button
              onClick={captureImage}
              style={{
                fontSize: '14px',
                padding: '6px',
                cursor: 'pointer',
                background: 'white',
                border: '1px solid black',
                borderRadius: '5px',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
              }}
            >
              3D 편지 저장 📸
            </button>
          </Html>
        </Float>
      </group>
    );
  }
);

export default PaperScene;
