"use client"

import { useMemo } from "react"
import { CylinderGeometry, BoxGeometry, SphereGeometry } from "three"

function Tree({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const geometries = useMemo(
    () => ({
      trunk: new CylinderGeometry(0.3, 0.5, 3, 32, 32),
      leaves1: new BoxGeometry(1.5, 3, 1.5, 32, 32, 32),
      leaves2: new BoxGeometry(1, 2, 1, 32, 32, 32),
    }),
    [],
  )

  return (
    <group position={position} scale={scale}>
      <mesh geometry={geometries.trunk} position={[0, 1.5, 0]}>
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh geometry={geometries.leaves1} position={[0, 3.5, 0]}>
        <meshStandardMaterial color="#228B22" />
      </mesh>
      <mesh geometry={geometries.leaves2} position={[0.5, 5, 0.5]} rotation={[0, Math.PI / 4, 0]}>
        <meshStandardMaterial color="#228B22" />
      </mesh>
    </group>
  )
}

function Bush({ position }: { position: [number, number, number] }) {
  const geometry = useMemo(() => new SphereGeometry(0.5, 32, 32), [])

  return (
    <group position={position}>
      <mesh geometry={geometry} position={[0, 0.5, 0]}>
        <meshStandardMaterial color="#228B22" />
      </mesh>
      <mesh geometry={geometry} position={[0.3, 0.3, 0.3]} scale={0.8}>
        <meshStandardMaterial color="#228B22" />
      </mesh>
      <mesh geometry={geometry} position={[-0.2, 0.4, -0.2]} scale={0.6}>
        <meshStandardMaterial color="#228B22" />
      </mesh>
    </group>
  )
}

export default function Forest() {
  const treePositions = [
    [-20, 0, -20],
    [20, 0, -15],
    [-15, 0, 18],
    [18, 0, 20],
    [0, 0, -25],
    [-25, 0, 5],
    [25, 0, -5],
    [-10, 0, -10],
    [10, 0, 10],
    [0, 0, 25],
    [-30, 0, -10],
    [30, 0, 10],
    [-5, 0, 30],
    [5, 0, -30],
    [-22, 0, 15],
    [22, 0, -18],
    [-18, 0, -22],
    [15, 0, 25],
    [-28, 0, -28],
    [28, 0, 28],
  ]

  const bushPositions = [
    [-15, 0, -15],
    [15, 0, 15],
    [-5, 0, 20],
    [5, 0, -20],
    [-25, 0, 0],
    [25, 0, 0],
    [0, 0, -15],
    [0, 0, 15],
    [-10, 0, 5],
    [10, 0, -5],
  ]

  return (
    <group>
      {treePositions.map((position, index) => (
        <Tree key={`tree-${index}`} position={position as [number, number, number]} scale={1 + Math.random() * 0.5} />
      ))}
      {bushPositions.map((position, index) => (
        <Bush key={`bush-${index}`} position={position as [number, number, number]} />
      ))}
    </group>
  )
}

