import { forwardRef } from 'react';
import { Environment, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

import './App.css';

import type { ThreeEvent } from '@react-three/fiber';

interface MeritMoneyProps {
  handlePointerDown: (event: ThreeEvent<PointerEvent>) => void;
}
export const MeritMoney = forwardRef<THREE.Group, MeritMoneyProps>(({ handlePointerDown }, ref) => {
  const { nodes } = useGLTF('/asset/merit_money_v2-apply.glb');

  const {
    circle_L,
    circle_R,
    circle_L_top,
    circle_flower_bottom_L,
    circle_flower_bottom_R,
    circle_flower_top_L,
    circle_flower_top_R,
    merit_cube,
    merit_cube_border,
    note,
  } = nodes ?? {};

  const defaultMeshes = [
    circle_flower_bottom_L,
    circle_flower_bottom_R,
    circle_flower_top_L,
    circle_flower_top_R,
    circle_L_top, // 스티커 붙이는 곳
    merit_cube_border,
    note,
    circle_L,
    merit_cube,
  ];

  return (
    <>
      <group
        ref={ref}
        position={[0, 0, 0]}
        rotation={[THREE.MathUtils.degToRad(90), 0, 0]} // Rotate 90 degrees on the X-axis
        scale={[1.5, 1.5, 1.5]}
      >
        <primitive object={circle_R} />

        {defaultMeshes.map((mesh, index) => (
          <>
            <mesh
              key={index}
              scale={mesh.scale}
              rotation={mesh.rotation}
              geometry={(mesh as THREE.Mesh).geometry}
              material={(mesh as THREE.Mesh).material}
              position={mesh.position}
              onPointerDown={handlePointerDown}
            >
              {index < 4 && (
                <meshPhysicalMaterial
                  attach="material"
                  color="silver"
                  metalness={0.2} // 거의 금속처럼 보이지만 완전하지 않음
                  roughness={10} // 완전 거울이 아니라, 빛이 퍼지는 효과
                  clearcoat={0.8} // 표면을 매끄럽게 만들어 반사가 더 부드럽게 퍼짐
                  reflectivity={0.2} // 반사 정도를 조정하여 적당한 빛 반사
                />
              )}
              {index === 4 && <meshMatcapMaterial color="#f5fff7" />}
              {index === 5 && (
                <meshPhysicalMaterial
                  attach="material"
                  color="black"
                  metalness={0.5} // 거의 금속처럼 보이지만 완전하지 않음
                  roughness={0.9} // 완전 거울이 아니라, 빛이 퍼지는 효과
                  clearcoat={0.8} // 표면을 매끄럽게 만들어 반사가 더 부드럽게 퍼짐
                  reflectivity={0.2} // 반사 정도를 조정하여 적당한 빛 반사
                />
              )}
            </mesh>
          </>
        ))}
      </group>

      <Environment
        background
        files="/environment/old_depot_2k.hdr"
        blur={0.3}
        backgroundIntensity={1.5}
        resolution={256}
      />
    </>
  );
});
