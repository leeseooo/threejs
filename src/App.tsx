import "./App.css";
import { Canvas } from "@react-three/fiber";
// import Box from "./Box";
import { Environment, OrbitControls } from "@react-three/drei";
import { useControls } from "leva";
// import Circle from "./CircleWireframe";
import Test from "./BoxWireframe2";
import Animal2 from "./Animal2";
import Circle from "./CircleWireframe";
import Box from "./BoxWireframe2";
import Ground from "./Ground";
import Scene from "./SpotLight";
import Raycaster from "./Raycaster";

function App() {
  const color = useControls({
    value: "white",
  });

  const grid = useControls({
    segment: { value: 20, min: 2, max: 100, step: 1 },
  });

  return (
    <>
      <Raycaster />
    </>
  );
}

export default App;
