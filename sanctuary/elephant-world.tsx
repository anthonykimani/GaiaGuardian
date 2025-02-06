"use client"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { Elephant } from "./Elephant"
import { Ground } from "./Ground"
import { useState } from "react";

const NUM_ELEPHANTS = 5

export default function ElephantWorld() {
  const [inputText, setInputText] = useState("");

  const handleSend = () => {
    console.log("Sending text:", inputText);
    setInputText("");
  };

  return (
    <div className="w-full h-screen">
      <Canvas shadows camera={{ position: [0, 5, 10], fov: 50 }}>
        <Environment preset="sunset" background />
        <ambientLight intensity={0.5} />
        <directionalLight
          castShadow
          position={[2.5, 8, 5]}
          intensity={1.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <Ground />
        {Array.from({ length: NUM_ELEPHANTS }).map((_, index) => (
          <Elephant key={index} position={[Math.random() * 10 - 5, 0, Math.random() * 10 - 5]} />
        ))}
        <OrbitControls />
      </Canvas>
      <style jsx global>{`
        .chatbox {
          background-color: white;
          border-radius: 10px;
          padding: 5px 10px;
          font-size: 14px;
          white-space: nowrap;
          opacity: 0.8;
          transition: opacity 0.3s;
        }
        .chatbox:empty {
          opacity: 0;
        }
        .input-container {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 10px;
          padding: 10px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }
        .input-field {
          border: none;
          outline: none;
          padding: 5px;
          border-radius: 5px;
          margin-right: 10px;
          flex: 1;
        }
        .send-button {
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          padding: 5px 10px;
          cursor: pointer;
        }
      `}</style>
      <div className="input-container">
        <input
          type="text"
          className="input-field"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message..."
        />
        <button className="send-button" onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}

