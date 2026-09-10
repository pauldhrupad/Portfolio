"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";

/* Demand rendering: panels only redraw on selection, theme or viewport changes. */
export default function GalleryCanvas({ selected, dark, count }: { selected: number; dark: boolean; count: number }) {
  const [lost, setLost] = useState(false);
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (!canvas) return;
    const fail = (event: Event) => { event.preventDefault(); setLost(true); };
    canvas.addEventListener("webglcontextlost", fail);
    return () => canvas.removeEventListener("webglcontextlost", fail);
  }, [canvas]);
  if (lost) return null;
  const surface = dark ? "#252c39" : "#ffffff";
  const background = dark ? "#1c212c" : "#e2eaf3";
  const activeAccent = dark ? "#7392ff" : "#2e55df";
  return <div className="gallery-canvas">
    <Canvas camera={{ position: [0, 1, 10], fov: 40 }} dpr={[1, 1.3]} frameloop="demand" gl={{ antialias: true, powerPreference: "low-power" }} onCreated={({ gl }) => setCanvas(gl.domElement)}>
      <color attach="background" args={[background]} />
      <fog attach="fog" args={[background, 8, 18]} />
      <ambientLight intensity={1.6} />
      <directionalLight position={[3, 5, 8]} intensity={2.5} color={dark ? "#a4b8ff" : "#ffffff"} />
      {Array.from({ length: count }, (_, index) => {
        const offset = ((index - selected + count + 1) % count) - 1;
        const active = offset === 0;
        return <group key={index} position={[offset * 2.6, active ? .2 : 0, active ? 0 : -1]} rotation={[0, offset * -.22, 0]} scale={active ? 1 : .82}>
          <mesh><boxGeometry args={[2.8, 2, .14]} /><meshStandardMaterial color={surface} roughness={.6} metalness={.12} /></mesh>
          <mesh position={[0, .76, .08]}><planeGeometry args={[2.55, .18]} /><meshBasicMaterial color={active ? activeAccent : "#697890"} /></mesh>
          <mesh position={[-.72, -.05, .09]}><planeGeometry args={[.8, 1.12]} /><meshBasicMaterial color={dark ? "#334264" : "#c3d0e0"} /></mesh>
          {[0, 1, 2, 3].map((line) => <mesh key={line} position={[.55, .35 - line * .28, .09]}><planeGeometry args={[line === 1 ? .7 : 1, .075]} /><meshBasicMaterial color={line === 1 ? activeAccent : dark ? "#76849a" : "#7b8aa0"} /></mesh>)}
        </group>;
      })}
    </Canvas>
  </div>;
}
