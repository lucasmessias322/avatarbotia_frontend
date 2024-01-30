import { Canvas } from "@react-three/fiber";
import { Loader } from "@react-three/drei";
import { Experience } from "./components/Experience";
import UI from "./components/UI";
import { Leva } from "leva";

function App() {
  return (
    <>
      <Loader />
      <Leva hidden={false} />
      <UI />
      <Canvas shadows camera={{ position: [0, 0, 8], fov: 42 }}>
        <Experience />
      </Canvas>
    </>
  );
}

export default App;
