import { useGLTF } from "@react-three/drei";
import { forwardRef } from "react";
// import * as THREE from "three";

const B = forwardRef((ref) => {
  //   const { nodes, materials } = useGLTF("../public/asset/tmpm4n3lqsm.glb");
  //     const { word } = nodes as THREE.Mesh;

  const { scene } = useGLTF("../public/asset/spoon_glb.glb"); // 업로드한 GLB 파일 경로 지정
  return (
    <>
      {/* <ambientLight position={[5, 5, 5]} intensity={3} /> */}
      <primitive ref={ref} object={scene} scale={1} />
    </>
  );
});

export default B;
