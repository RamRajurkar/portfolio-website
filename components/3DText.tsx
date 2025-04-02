import { Text3D, Center } from "@react-three/drei"
import { motion } from "framer-motion-3d"

export function AnimatedText3D() {
  return (
    <Center>
      <Text3D
        font="/fonts/helvetiker_bold.typeface.json"
        size={0.8}
        height={0.2}
        curveSegments={12}
      >
        {`Ram Rajurkar`}
        <meshStandardMaterial color="#6366f1" />
      </Text3D>
    </Center>
  )
}