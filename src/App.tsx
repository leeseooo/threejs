import "./App.css";
import { Canvas } from "@react-three/fiber";
// import Box from "./Box";
import { Environment, OrbitControls } from "@react-three/drei";
import { useControls } from "leva";
// import Circle from "./CircleWireframe";
import Test from "./BoxWireframe2";
import Animal2 from "./Animal2";

function App() {
  const color = useControls({
    value: "white",
  });

  const grid = useControls({
    segment: { value: 20, min: 2, max: 100, step: 1 },
  });

  return (
    <>
      <Canvas
        camera={{
          fov: 75,
          near: 1,
          far: 100,
          position: [15, 15, 0],
        }}
      >
        <color attach="background" args={[color.value]} />
        {/* 드래그로 카메라 이동, 휠로 줌인/아웃 */}
        <OrbitControls />
        {/* x, y, z축을 보여줌 */}
        <axesHelper args={[6]} />
        {/* 격자를 보여줌 */}
        <gridHelper args={[10, grid.segment]} />
        {/* <Test /> */}
        <Animal2 />
        {/* 박스 배치 */}
        {/* <Box /> */}
        {/* 원 배치 */}
        {/* <Circle /> */}
        {/* <Environment preset="sunset" /> */}
      </Canvas>
    </>
  );
}

export default App;
