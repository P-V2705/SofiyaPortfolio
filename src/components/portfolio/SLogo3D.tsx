import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text, Stars } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

// Easing function: cubic ease in-out
const cubicEaseInOut = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

const WireframeRing = ({ radius, tube, color, speed, axis, pulseSpeed }: { 
  radius: number; 
  tube: number; 
  color: string; 
  speed: number; 
  axis: "x" | "y" | "z";
  pulseSpeed: number;
}) => {
  const ref = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation[axis] += delta * speed;
    
    // Pulsing wireframe effect
    if (materialRef.current) {
      const pulse = Math.sin(_.clock.getElapsedTime() * pulseSpeed) * 0.3 + 0.7;
      materialRef.current.opacity = pulse;
      materialRef.current.emissiveIntensity = pulse * 1.2;
    }
  });
  
  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, tube, 16, 80]} />
      <meshStandardMaterial
        ref={materialRef}
        color={color}
        emissive={color}
        emissiveIntensity={0.9}
        wireframe
        transparent
        opacity={0.85}
        metalness={0.8}
        roughness={0.1}
      />
    </mesh>
  );
};

const MorphingWireframeCore = () => {
  const groupRef = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const icoRef = useRef<THREE.Mesh>(null);
  
  const sphereGeometry = useMemo(() => new THREE.IcosahedronGeometry(0.95, 3), []);
  const icoGeometry = useMemo(() => new THREE.IcosahedronGeometry(0.95, 1), []);
  
  useFrame((state) => {
    if (!groupRef.current || !sphereRef.current || !icoRef.current) return;
    
    const t = state.clock.getElapsedTime();
    
    // Smooth rotation with easing
    groupRef.current.rotation.y = Math.sin(t * 0.6) * 0.4;
    groupRef.current.rotation.x = Math.cos(t * 0.4) * 0.2;
    
    // Morphing transition between sphere and icosahedron
    const morphCycle = (Math.sin(t * 0.5) + 1) / 2; // 0 to 1
    const easedMorph = cubicEaseInOut(morphCycle);
    
    sphereRef.current.material.opacity = 1 - easedMorph;
    icoRef.current.material.opacity = easedMorph;
    
    // Pulsing wireframe intensity
    const pulse = Math.sin(t * 1.2) * 0.15 + 0.85;
    sphereRef.current.material.emissiveIntensity = pulse;
    icoRef.current.material.emissiveIntensity = pulse;
  });
  
  return (
    <group ref={groupRef}>
      {/* Sphere wireframe */}
      <mesh ref={sphereRef} geometry={sphereGeometry}>
        <meshStandardMaterial
          color="#A18CD1"
          emissive="#A18CD1"
          emissiveIntensity={0.8}
          wireframe
          transparent
          opacity={1}
          metalness={0.7}
          roughness={0.15}
        />
      </mesh>
      
      {/* Icosahedron wireframe (morph target) */}
      <mesh ref={icoRef} geometry={icoGeometry}>
        <meshStandardMaterial
          color="#FBC2EB"
          emissive="#FBC2EB"
          emissiveIntensity={0.8}
          wireframe
          transparent
          opacity={0}
          metalness={0.7}
          roughness={0.15}
        />
      </mesh>
      
      {/* Center text */}
      <Text
        position={[0, 0, 0]}
        fontSize={1.05}
        color="#FBC2EB"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.03}
        outlineColor="#ffffff"
        font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
      >
        S
      </Text>
    </group>
  );
};

const SLogo3D = () => {
  return (
    <div className="relative aspect-square w-full max-w-[420px]">
      {/* Dark background with gradient */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-gray-900 via-purple-950 to-black opacity-95" />
      <div className="absolute inset-6 rounded-full bg-gradient-primary opacity-20 blur-3xl" />
      
      <Canvas 
        dpr={[1, 2]} 
        camera={{ position: [0, 0, 4.2], fov: 45 }} 
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        {/* Ambient lighting */}
        <ambientLight intensity={0.3} />
        
        {/* Dynamic point lights */}
        <pointLight position={[3, 3, 4]} intensity={1.8} color="#FBC2EB" />
        <pointLight position={[-3, -2, 2]} intensity={1.4} color="#A18CD1" />
        <pointLight position={[0, 4, -2]} intensity={1} color="#C8A2E8" />
        
        {/* Stars background */}
        <Stars 
          radius={50} 
          depth={30} 
          count={1500} 
          factor={4} 
          saturation={0.5} 
          fade 
          speed={0.8} 
        />
        
        {/* Floating wireframe elements */}
        <Float speed={1.6} rotationIntensity={0.3} floatIntensity={0.5}>
          <MorphingWireframeCore />
          
          {/* Wireframe rings with pulse effect */}
          <WireframeRing radius={1.55} tube={0.02} color="#FBC2EB" speed={0.6} axis="z" pulseSpeed={1.2} />
          <WireframeRing radius={1.85} tube={0.015} color="#A18CD1" speed={-0.4} axis="x" pulseSpeed={0.9} />
          <WireframeRing radius={2.1} tube={0.012} color="#C8A2E8" speed={0.3} axis="y" pulseSpeed={1.5} />
        </Float>
      </Canvas>
    </div>
  );
};

export default SLogo3D;