import { Environment, OrbitControls, useTexture } from "@react-three/drei";
import { Avatar } from "./Avatar";
import { useThree } from "@react-three/fiber";
import { useControls } from "leva";

export const Experience = () => {
  const viewport = useThree((state) => state.viewport);
  const { playAudio, script, headFollow, environment } = useControls({
    environment: {
      value: "apartment",
      options: [
        "sunset",
        "dawn",
        "city",
        "park",
        "studio",
        "forest",
        "apartment",
        "warehouse",
        "night",
        "lobby",
      ],
    },
  });

  return (
    <>
      <OrbitControls enableRotate={false} maxDistance={10} minDistance={7} />
      <Avatar position={[0, -3, 5]} scale={2} />
      <Environment preset={environment} background />
    </>
  );
};
