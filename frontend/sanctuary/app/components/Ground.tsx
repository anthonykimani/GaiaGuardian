"use client"

import { Plane } from "@react-three/drei"

export default function Ground() {
  return (
    <Plane args={[100, 100]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
      <meshStandardMaterial color="#6B8E23" />
    </Plane>
  )
}

