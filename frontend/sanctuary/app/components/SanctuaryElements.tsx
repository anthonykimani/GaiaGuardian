"use client"

import { Cylinder, Box } from "@react-three/drei"

function WaterHole({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <Cylinder args={[3, 3, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#4169E1" transparent opacity={0.8} />
      </Cylinder>
    </group>
  )
}

function FeedingStation({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <Box args={[2, 0.2, 2]}>
        <meshStandardMaterial color="#8B4513" />
      </Box>
      <Box args={[1.8, 0.4, 1.8]} position={[0, 0.3, 0]}>
        <meshStandardMaterial color="#DAA520" />
      </Box>
    </group>
  )
}

export default function SanctuaryElements() {
  return (
    <group>
      <WaterHole position={[-20, 0.1, 20]} />
      <WaterHole position={[25, 0.1, -15]} />
      <FeedingStation position={[15, 0.1, 25]} />
      <FeedingStation position={[-25, 0.1, -20]} />
    </group>
  )
}

