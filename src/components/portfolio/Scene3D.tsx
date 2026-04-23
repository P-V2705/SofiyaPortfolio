import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

// Easing function: exponential ease in-out
const expEaseInOut = (t: number): number => {
  return t < 0.5 ? Math.pow(2, 20 * t - 10) / 2 : (2 - Math.pow(2, -20 * t + 10)) / 2;
};

const WireframeBlob = ({ 
  position, 
  color, 
  scale = 1,
  morphSpeed = 0.5,
  pulseSpeed = 1.0 
}: { 
  position: [number, number, number]; 
  color: string; 
  scale?: number;
  morphSpeed?: number;
  pulseSpeed?: number;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const polyRef = useRef<THREE.Mesh>(null);
  
  // High-detail sphere for smooth wireframe
  const sphereGeometry = useMemo(() => new THREE.IcosahedronGeometry(1, 4), []);
  // Low-detail icosahedron for polyhedron morph
  const polyGeometry = useMemo(() => new THREE.IcosahedronGeometry(1, 0), []);
  
  useFrame((state) => {
    if (!groupRef.current || !sphereRef.current || !polyRef.current) return;
    
    const t = state.clock.getElapsedTime();
    
    // Smooth floating motion with easing
    const floatY = Math.sin(t * 0.4) * 0.3;
    const floatX = Math.cos(t * 0.3) * 0.2;
    groupRef.current.position.x = position[0] + floatX;
    groupRef.current.position.y = position[1] + floatY;
    
    // Gentle rotation
    groupRef.current.rotation.x = t * 0.15;
    groupRef.current.rotation.y = t * 0.2;
    
    // Morphing between sphere and polyhedron
    const morphCycle = (Math.sin(t * morphSpeed) + 1) / 2;
    const easedMorph = expEaseInOut(morphCycle);
    
    sphereRef.current.material.opacity = 1 - easedMorph * 0.7;
    polyRef.current.material.opacity = easedMorph;
    
    // Pulsing wireframe intensity
    const pulse = Math.sin(t * pulseSpeed) * 0.2 + 0.8;
    sphereRef.current.material.emissiveIntensity = pulse;
    polyRef.current.material.emissiveIntensity = pulse * 1.2;
  });
  
  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.8}>
      <group ref={groupRef} scale={scale}>
        {/* Sphere wireframe */}
        <mesh ref={sphereRef} geometry={sphereGeometry}>
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.7}
            wireframe
            transparent
            opacity={1}
            metalness={0.6}
            roughness={0.2}
          />
        </mesh>
        
        {/* Polyhedron wireframe (morph target) */}
        <mesh ref={polyRef} geometry={polyGeometry}>
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.9}
            wireframe
            transparent
            opacity={0}
            metalness={0.7}
            roughness={0.15}
          />
        </mesh>
      </group>
    </Float>
  );
};

const Scene3D = () => {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-purple-950 to-black" />
      
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        {/* Ambient lighting */}
        <ambientLight intensity={0.2} />
        
        {/* Dynamic colored lights */}
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#7c5cff" />
        <pointLight position={[-5, -3, 2]} intensity={1.2} color="#3b82f6" />
        <pointLight position={[0, 4, -3]} intensity={1} color="#A18CD1" />
        
        {/* Stars background for depth */}
        <Stars 
          radius={80} 
          depth={50} 
          count={3000} 
          factor={5} 
          saturation={0.3} 
          fade 
          speed={0.5} 
        />
        
        {/* Wireframe morphing blobs */}
        <WireframeBlob position={[-2.6, 0.8, -1]} color="#A18CD1" scale={1.3} morphSpeed={0.5} pulseSpeed={1.0} />
        <WireframeBlob position={[2.8, -0.6, -2]} color="#FBC2EB" scale={1.6} morphSpeed={0.6} pulseSpeed={1.2} />
        <WireframeBlob position={[0, 2.4, -3]} color="#C8A2E8" scale={0.9} morphSpeed={0.4} pulseSpeed={0.8} />
        
        {/* Additional wireframe accents */}
        <Float speed={1.2} rotationIntensity={0.6} floatIntensity={1.0}>
          <mesh position={[1.5, 1.5, -2]} rotation={[0.5, 0.5, 0]}>
            <octahedronGeometry args={[0.3, 0]} />
            <meshStandardMaterial
              color="#FBC2EB"
              emissive="#FBC2EB"
              emissiveIntensity={0.8}
              wireframe
              transparent
              opacity={0.7}
            />
          </mesh>
          <mesh position={[-1.8, -1.2, -1.5]} rotation={[0.3, 0.8, 0.2]}>
            <octahedronGeometry args={[0.25, 0]} />
            <meshStandardMaterial
              color="#A18CD1"
              emissive="#A18CD1"
              emissiveIntensity={0.8}
              wireframe
              transparent
              opacity={0.6}
            />
          </mesh>
        </Float>
      </Canvas>
    </div>
  );
};

export default Scene3D;