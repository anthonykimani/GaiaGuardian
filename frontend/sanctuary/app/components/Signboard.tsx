"use client"

import { useTexture } from "@react-three/drei"

interface SignboardProps {
  position: [number, number, number]
  rotation?: [number, number, number]
  imageUrl: string
}

function Signboard({ position, rotation = [0, 0, 0], imageUrl }: SignboardProps) {
  const texture = useTexture(imageUrl)

  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 4, 0]}>
        <boxGeometry args={[10, 6, 0.2]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      <mesh position={[-4.8, 2, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 4]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[4.8, 2, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 4]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
    </group>
  )
}

export default function Signboards() {
  return (
    <group>
      <Signboard position={[0, 0, -40]} imageUrl="/placeholder.svg?height=1024&width=1024" />
      <Signboard
        position={[-35, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
        imageUrl="/placeholder.svg?height=1024&width=1024"
      />
      <Signboard
        position={[35, 0, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        imageUrl="/placeholder.svg?height=1024&width=1024"
      />
      <Signboard position={[0, 0, 40]} rotation={[0, Math.PI, 0]} imageUrl="/placeholder.svg?height=1024&width=1024" />
    </group>
  )
}

