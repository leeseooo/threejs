import "./App.css";
import { Canvas } from "@react-three/fiber";
import Box from "./Box";
import { OrbitControls } from "@react-three/drei";
import { useControls } from "leva";
import Tree from "./Tree";
// import Ground from "./Ground";
// import AnimalCrossingCharacter from "./Animal";

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
          position: [3, 3, 0],
        }}
      >
        <color attach="background" args={[color.value]} />
        {/* 드래그로 카메라 이동, 휠로 줌인/아웃 */}
        <OrbitControls />
        {/* x, y, z축을 보여줌 */}
        <axesHelper args={[6]} />
        {/* 격자를 보여줌 */}
        <gridHelper args={[10, grid.segment]} />
        {/* 박스 배치 */}
        <Box />
        <Tree position={[3, 1, 1]} /> // 오른쪽으로 3, 앞쪽으로 1
        <Tree position={[-3, 1, 1]} /> // 왼쪽으로 3, 앞쪽으로 1
        <Tree position={[0, 1, -2]} /> // 위쪽으로 2, 뒤쪽으로 2
        <Tree position={[1, 1, -3]} /> // 오른쪽으로 1, 위쪽으로 1, 뒤쪽으로 3
        {/* 캐릭터 배치 */}
        {/* <AnimalCrossingCharacter position={[-1.5, 0, 1]} /> */}
        {/* 풀밭 추가 */}
        {/* <Ground /> */}
      </Canvas>
    </>
  );
}

export default App;
