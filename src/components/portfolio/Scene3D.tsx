import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Stars } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

const Blob = ({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.position.x = position[0] + Math.sin(t * 0.3) * 0.3;
    ref.current.position.y = position[1] + Math.cos(t * 0.4) * 0.3;
  });
  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.2}>
      <Sphere ref={ref} args={[1, 64, 64]} position={position} scale={scale}>
        <MeshDistortMaterial
          color={color}
          distort={0.45}
          speed={1.6}
          roughness={0.2}
          metalness={0.6}
          emissive={color}
          emissiveIntensity={0.4}
        />
      </Sphere>
    </Float>
  );
};

const Scene3D = () => {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#7c5cff" />
        <pointLight position={[-5, -3, 2]} intensity={1} color="#3b82f6" />
        <Stars radius={60} depth={40} count={2200} factor={3} saturation={0} fade speed={0.6} />
        <Blob position={[-2.6, 0.8, -1]} color="#A18CD1" scale={1.3} />
        <Blob position={[2.8, -0.6, -2]} color="#FBC2EB" scale={1.6} />
        <Blob position={[0, 2.4, -3]} color="#C8A2E8" scale={0.9} />
      </Canvas>
    </div>
  );
};

export default Scene3D;