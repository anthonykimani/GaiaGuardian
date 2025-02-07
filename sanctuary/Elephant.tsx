import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

export function Elephant({ position }) {
  const mesh = useRef();
  const [targetPosition, setTargetPosition] = useState(position);
  const [chatText, setChatText] = useState("");

  useEffect(() => {
    const moveInterval = setInterval(() => {
      setTargetPosition([Math.random() * 10 - 5, 0, Math.random() * 10 - 5]);
    }, 5000 + Math.random() * 5000);

    const chatInterval = setInterval(() => {
      fetchResponse();
    }, 7000 + Math.random() * 5000);

    return () => {
      clearInterval(moveInterval);
      clearInterval(chatInterval);
    };
  }, []);

  const fetchResponse = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/b850bc30-45f8-0041-a00a-83df46d8555d/message",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: "Hello", userId: "elephant", userName: "Elephant" }),
        }
      );

      const data = await response.json();
      if (data.length > 0) {
        setChatText(data[0].text);
        setTimeout(() => setChatText(""), 3000); // Clear after 3 seconds
      }
    } catch (error) {
      console.error("Error fetching response:", error);
    }
  };

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.position.lerp(new THREE.Vector3(...targetPosition), 0.02);

      const direction = new THREE.Vector3().subVectors(new THREE.Vector3(...targetPosition), mesh.current.position);
      if (direction.length() > 0.1) {
        const angle = Math.atan2(direction.x, direction.z);
        mesh.current.rotation.y = angle;
      }
    }
  });

  return (
    <group ref={mesh} position={position}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="gray" />
      </mesh>
      <Html position={[0, 1.5, 0]} center distanceFactor={10} occlude>
        <div className="chatbox">{chatText}</div>
      </Html>
    </group>
  );
}
