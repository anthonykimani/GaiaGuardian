"use client"

import { useRef, useState, useEffect, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import {
  type Group,
  Vector3,
  type Mesh,
  SphereGeometry,
  BoxGeometry,
  CylinderGeometry,
  Shape,
  ExtrudeGeometry,
} from "three"

export default function Elephant({
  position,
  otherElephants,
}: {
  position: [number, number, number]
  otherElephants: Group[]
}) {
  const groupRef = useRef<Group>(null)
  const [message, setMessage] = useState("")
  const [inputValue, setInputValue] = useState("")
  const [direction, setDirection] = useState(
    new Vector3(Math.random() - 0.5, 0, Math.random() - 0.5).normalize()
  )
  const [isInteracting, setIsInteracting] = useState(false)
  const [loading, setLoading] = useState(false)
  const interactionTimer = useRef<NodeJS.Timeout | null>(null)
  const speed = 0.02
  const legAnimationRef = useRef({ time: 0 })

  // The API is now called only when the user presses the Send button.
  const fetchResponse = async () => {
    if (loading) return // Prevent duplicate requests.
    setLoading(true)
    // Use the user input or fallback to "Hello"
    const messageToSend = inputValue.trim() || "Hello"
    try {
      const response = await fetch(
        "http://localhost:3000//message",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: messageToSend,
            userId: "elephant",
            userName: "Elephant",
          }),
        }
      )

      const data = await response.json()
      if (data.length > 0) {
        setMessage(data[0].text)
        setTimeout(() => setMessage(""), 60000) // Clear the message after 30 seconds.
      }
      // Clear the input field after sending.
      setInputValue("")
    } catch (error) {
      console.error("Error fetching response:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const changeDirectionInterval = setInterval(() => {
      if (!isInteracting) {
        setDirection(new Vector3(Math.random() - 0.5, 0, Math.random() - 0.5).normalize())
      }
    }, 10000)
    return () => clearInterval(changeDirectionInterval)
  }, [isInteracting])

  useFrame((state, delta) => {
    if (groupRef.current) {
      if (!isInteracting) {
        groupRef.current.position.add(direction.clone().multiplyScalar(speed))

        const bounds = 45
        if (
          Math.abs(groupRef.current.position.x) > bounds ||
          Math.abs(groupRef.current.position.z) > bounds
        ) {
          setDirection(direction.negate())
        }

        otherElephants.forEach((otherElephant) => {
          if (
            otherElephant !== groupRef.current &&
            groupRef.current.position.distanceTo(otherElephant.position) < 8
          ) {
            setIsInteracting(true)
            setMessage("Nice to meet you!")
            if (interactionTimer.current) clearTimeout(interactionTimer.current)
            interactionTimer.current = setTimeout(() => {
              setIsInteracting(false)
              setDirection(
                new Vector3(Math.random() - 0.5, 0, Math.random() - 0.5).normalize()
              )
            }, 5000)
          }
        })

        groupRef.current.rotation.y = Math.atan2(direction.x, direction.z)

        // Animate legs.
        legAnimationRef.current.time += delta * 4
        const legAngle = Math.sin(legAnimationRef.current.time) * 0.2
        groupRef.current.children.forEach((child, index) => {
          if (child.name.startsWith("leg")) {
            child.rotation.x = legAngle * (index % 2 === 0 ? 1 : -1)
          }
        })
      }

      // Animate trunk.
      const trunk = groupRef.current.children.find(
        (child) => child.name === "trunk"
      ) as Mesh
      if (trunk) {
        trunk.rotation.x = Math.sin(state.clock.elapsedTime * 2) * 0.1
      }

      // Animate tail.
      const tail = groupRef.current.children.find(
        (child) => child.name === "tail"
      ) as Mesh
      if (tail) {
        tail.rotation.x = Math.sin(state.clock.elapsedTime * 3) * 0.2
      }
    }
  })

  const highPolyGeometries = useMemo(() => {
    const bodyShape = new Shape()
    bodyShape.moveTo(0, 0)
    bodyShape.bezierCurveTo(1, 0.5, 2, 1, 3, 0)
    bodyShape.lineTo(3, -2)
    bodyShape.bezierCurveTo(2, -2.5, 1, -2.5, 0, -2)
    bodyShape.closePath()

    const extrudeSettings = {
      steps: 64,
      depth: 1.5,
      bevelEnabled: true,
      bevelThickness: 0.5,
      bevelSize: 0.5,
      bevelSegments: 32,
    }

    return {
      body: new ExtrudeGeometry(bodyShape, extrudeSettings),
      head: new SphereGeometry(1, 64, 64),
      ear: new BoxGeometry(0.1, 1, 1, 32, 32, 32),
      leg: new CylinderGeometry(0.35, 0.25, 2, 32, 32),
      foot: new SphereGeometry(0.3, 32, 32),
      tusk: new CylinderGeometry(0.08, 0.05, 1, 32, 32),
      trunkSegment: new CylinderGeometry(0.25, 0.2, 0.8, 32, 32),
    }
  }, [])

  return (
    <group ref={groupRef} position={position} scale={[1.5, 1.5, 1.5]}>
      {/* Body */}
      <mesh geometry={highPolyGeometries.body} rotation={[0, Math.PI / 2, Math.PI / 2]}>
        <meshStandardMaterial color="#808080" />
      </mesh>

      {/* Head */}
      <mesh position={[0, 1.2, 1.8]} geometry={highPolyGeometries.head}>
        <meshStandardMaterial color="#A9A9A9" />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.5, 1.4, 2.5]}>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.5, 1.4, 2.5]}>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Ears */}
      <mesh
        position={[-0.8, 1.2, 1.5]}
        rotation={[0, -0.5, 0]}
        geometry={highPolyGeometries.ear}
      >
        <meshStandardMaterial color="#A9A9A9" />
      </mesh>
      <mesh
        position={[0.8, 1.2, 1.5]}
        rotation={[0, 0.5, 0]}
        geometry={highPolyGeometries.ear}
      >
        <meshStandardMaterial color="#A9A9A9" />
      </mesh>

      {/* Trunk */}
      <group name="trunk" position={[0, 0.5, 2.3]}>
        <mesh position={[0, 0, 0]} geometry={highPolyGeometries.trunkSegment}>
          <meshStandardMaterial color="#A9A9A9" />
        </mesh>
        <mesh position={[0, -0.4, 0.1]} geometry={highPolyGeometries.trunkSegment}>
          <meshStandardMaterial color="#A9A9A9" />
        </mesh>
        <mesh position={[0, -0.8, 0.2]} geometry={highPolyGeometries.trunkSegment}>
          <meshStandardMaterial color="#A9A9A9" />
        </mesh>
      </group>

      {/* Tusks */}
      <mesh
        position={[-0.3, 0.5, 2]}
        rotation={[0, 0, Math.PI / 4]}
        geometry={highPolyGeometries.tusk}
      >
        <meshStandardMaterial color="#F0F0F0" />
      </mesh>
      <mesh
        position={[0.3, 0.5, 2]}
        rotation={[0, 0, -Math.PI / 4]}
        geometry={highPolyGeometries.tusk}
      >
        <meshStandardMaterial color="#F0F0F0" />
      </mesh>

      {/* Legs */}
      {[
        [-0.9, -1.1, 1.4],
        [0.9, -1.1, 1.4],
        [-0.9, -1.1, -1.4],
        [0.9, -1.1, -1.4],
      ].map((legPos, index) => (
        <group key={index} name={`leg${index}`} position={legPos}>
          <mesh geometry={highPolyGeometries.leg}>
            <meshStandardMaterial color="#696969" />
          </mesh>
          <mesh position={[0, -1, 0]} geometry={highPolyGeometries.foot}>
            <meshStandardMaterial color="#696969" />
          </mesh>
        </group>
      ))}

      {/* Tail */}
      <group name="tail" position={[0, 0.5, -2.1]}>
        <mesh rotation={[0, 0, Math.PI / 4]} geometry={highPolyGeometries.tusk}>
          <meshStandardMaterial color="#A9A9A9" />
        </mesh>
        <mesh position={[0.2, -0.2, 0]}>
          <sphereGeometry args={[0.1, 32, 32]} />
          <meshStandardMaterial color="#A9A9A9" />
        </mesh>
      </group>

      {/* Chat display (upper HTML) shows the current message without a button */}
      <Html position={[0, 3.5, 0]} scale={0.7}>
        <div
          className="bg-white p-2 rounded-lg shadow-md"
          style={{ width: "200px", textAlign: "center" }}
        >
          <p className="text-sm">{message}</p>
        </div>
      </Html>

      {/* Input field with the Send button (migrated below the elephant) */}
      <Html position={[0, -3.5, 0]} scale={0.7}>
        <div
          className="bg-white p-2 rounded-lg shadow-md"
          style={{ width: "200px", textAlign: "center" }}
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="border p-1 w-full mb-2"
          />
          <button
            onClick={fetchResponse}
            disabled={loading}
            className="bg-gray-300 hover:bg-gray-500 text-white py-0.5 px-1 text-xs rounded"
          >
            {loading ? "Loading..." : "Send"}
          </button>
        </div>
      </Html>
    </group>
  )
}
