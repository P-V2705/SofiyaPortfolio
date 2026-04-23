import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text, Stars } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

// Diamond sphere (octahedron) with wireframe
const DiamondSphere = ({ radius = 0.95, detail = 3, color = "#A18CD1" }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const geometry = useMemo(() => {
    // Octahedron creates a diamond shape
    return new THREE.OctahedronGeometry(radius, detail);
  }, [radius, detail]);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    
    // Gentle breathing animation
    const breathe = Math.sin(t * 1.2) * 0.03;
    meshRef.current.scale.setScalar(1 + breathe);
    
    // Smooth rotation
    meshRef.current.rotation.y = Math.sin(t * 0.5) * 0.3;
    meshRef.current.rotation.x = Math.cos(t * 0.4) * 0.15;
  });
  
  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.6}
        wireframe
        transparent
        opacity={0.85}
        metalness={0.7}
        roughness={0.15}
      />
    </mesh>
  );
};

// Rotating ring component
const RotatingRing = ({ 
  radius, 
  tube, 
  color, 
  speed, 
  axis,
  tilt = 0 
}: { 
  radius: number; 
  tube: number; 
  color: string; 
  speed: number; 
  axis: "x" | "y" | "z";
  tilt?: number;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!groupRef.current || !meshRef.current) return;
    const t = state.clock.getElapsedTime();
    
    // Continuous rotation
    groupRef.current.rotation[axis] = t * speed;
    groupRef.current.rotation.x = tilt;
    
    // Pulsing glow effect
    const pulse = Math.sin(t * 1.5) * 0.15 + 0.85;
    (meshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = pulse;
  });
  
  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <torusGeometry args={[radius, tube, 16, 80]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
          wireframe
          transparent
          opacity={0.75}
          metalness={0.8}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
};

const SLogo3D = () => {
  return (
    <div className="relative aspect-square w-full max-w-[420px]">
      {/* Dark gradient background */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-gray-900 via-purple-950 to-black opacity-95" />
      <div className="absolute inset-12 rounded-full bg-gradient-primary opacity-15 blur-3xl" />
      
      <Canvas 
        dpr={[1, 2]} 
        camera={{ position: [0, 0, 4.5], fov: 45 }} 
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <pointLight position={[3, 3, 4]} intensity={2} color="#FBC2EB" />
        <pointLight position={[-3, -2, 2]} intensity={1.5} color="#A18CD1" />
        <pointLight position={[0, 4, -2]} intensity={1.2} color="#C8A2E8" />
        
        {/* Stars background */}
        <Stars 
          radius={60} 
          depth={35} 
          count={1800} 
          factor={4} 
          saturation={0.5} 
          fade 
          speed={0.8} 
        />
        
        {/* Floating diamond sphere with rings */}
        <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.4}>
          {/* Diamond sphere (octahedron) */}
          <DiamondSphere radius={0.95} detail={3} color="#A18CD1" />
          
          {/* Rotating rings */}
          <RotatingRing radius={1.45} tube={0.02} color="#FBC2EB" speed={0.5} axis="z" tilt={0} />
          <RotatingRing radius={1.7} tube={0.015} color="#C8A2E8" speed={-0.4} axis="x" tilt={0.5} />
          <RotatingRing radius={1.95} tube={0.012} color="#A18CD1" speed={0.35} axis="y" tilt={-0.4} />
        </Float>
        
        {/* Centered "S" text */}
        <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.3}>
          <Text
            position={[0, 0, 0.15]}
            fontSize={1.1}
            color="#FBC2EB"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.03}
            outlineColor="#ffffff"
            font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
          >
            S
          </Text>
        </Float>
      </Canvas>
    </div>
  );
};

export default SLogo3D;