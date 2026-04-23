import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

const RotatingRing = ({ radius, tube, color, speed, axis }: { radius: number; tube: number; color: string; speed: number; axis: "x" | "y" | "z" }) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation[axis] += delta * speed;
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, tube, 24, 120]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.7} metalness={0.6} roughness={0.2} />
    </mesh>
  );
};

const Core = () => {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.6) * 0.4;
  });
  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[0.95, 64, 64]} />
        <meshStandardMaterial color="#A18CD1" emissive="#A18CD1" emissiveIntensity={0.35} metalness={0.4} roughness={0.25} />
      </mesh>
      <Text
        position={[0, 0, 0.96]}
        fontSize={1.05}
        color="#FBC2EB"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#ffffff"
      >
        S
      </Text>
    </group>
  );
};

const SLogo3D = () => {
  return (
    <div className="relative aspect-square w-full max-w-[420px]">
      <div className="absolute inset-6 rounded-full bg-gradient-primary opacity-30 blur-3xl" />
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 4.2], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[3, 3, 4]} intensity={1.4} color="#FBC2EB" />
        <pointLight position={[-3, -2, 2]} intensity={1} color="#A18CD1" />
        <Float speed={1.6} rotationIntensity={0.4} floatIntensity={0.6}>
          <Core />
          <RotatingRing radius={1.55} tube={0.04} color="#FBC2EB" speed={0.6} axis="z" />
          <RotatingRing radius={1.85} tube={0.03} color="#A18CD1" speed={-0.4} axis="x" />
          <RotatingRing radius={2.1} tube={0.025} color="#C8A2E8" speed={0.3} axis="y" />
        </Float>
      </Canvas>
    </div>
  );
};

export default SLogo3D;