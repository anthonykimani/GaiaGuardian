"use client"

import { useRef, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Sky } from "@react-three/drei"
import Forest from "./components/Forest"
import Elephant from "./components/Elephant"
import Ground from "./components/Ground"
import Signboards from "./components/Signboard"
import SanctuaryElements from "./components/SanctuaryElements"
import type * as THREE from "three"

export default function Home() {
  const elephantsRef = useRef<THREE.Group[]>([])

  useEffect(() => {
    elephantsRef.current = []
  }, [])

  return (
    <div className="w-full h-screen">
      <Canvas camera={{ position: [0, 40, 80], fov: 60 }}>
        <Sky sunPosition={[100, 10, 100]} />
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Forest />
        <Ground />
        <Signboards />
        <SanctuaryElements />
        {[
          [-20, 0, -20],
          [20, 0, 20],
          [0, 0, -25],
          [-25, 0, 10],
          [25, 0, -10],
        ].map((pos, index) => (
          <Elephant
            key={index}
            position={pos as [number, number, number]}
            otherElephants={elephantsRef.current}
            ref={(el) => {
              if (el) elephantsRef.current[index] = el
            }}
          />
        ))}
        <OrbitControls />
      </Canvas>
    </div>
  )
}

