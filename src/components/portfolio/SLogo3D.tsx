import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text, Stars, Points } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

// Custom shader material for particle sphere
const ParticleSphere = ({ radius = 0.95, particleCount = 2000, color = "#A18CD1" }) => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      // Fibonacci sphere distribution
      const phi = Math.acos(1 - 2 * (i + 0.5) / particleCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;
    }
    
    return { positions, originalPositions };
  }, [radius, particleCount]);
  
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions.positions, 3));
    return geo;
  }, [positions]);
  
  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const t = state.clock.getElapsedTime();
    const posAttr = geometry.attributes.position;
    
    // Animate particles with breathing effect
    for (let i = 0; i < particleCount; i++) {
      const ox = positions.originalPositions[i * 3];
      const oy = positions.originalPositions[i * 3 + 1];
      const oz = positions.originalPositions[i * 3 + 2];
      
      // Breathing animation
      const breathe = Math.sin(t * 1.5) * 0.08;
      const wave = Math.sin(t * 2 + i * 0.01) * 0.03;
      
      posAttr.setXYZ(
        i,
        ox * (1 + breathe + wave),
        oy * (1 + breathe + wave),
        oz * (1 + breathe + wave)
      );
    }
    posAttr.needsUpdate = true;
    
    // Gentle rotation
    pointsRef.current.rotation.y = Math.sin(t * 0.4) * 0.3;
    pointsRef.current.rotation.x = Math.cos(t * 0.3) * 0.15;
  });
  
  return (
    <Points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.025}
        color={color}
        transparent
        opacity={0.9}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </Points>
  );
};

// Orbiting particle rings
const OrbitingParticles = ({ count = 150, radius = 1.6, color = "#FBC2EB", speed = 0.5, tilt = 0 }) => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const r = radius + (Math.random() - 0.5) * 0.2;
      const spread = (Math.random() - 0.5) * 0.15;
      
      positions[i * 3] = Math.cos(angle) * r;
      positions[i * 3 + 1] = spread;
      positions[i * 3 + 2] = Math.sin(angle) * r;
    }
    
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [count, radius]);
  
  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = t * speed;
    pointsRef.current.rotation.x = tilt;
  });
  
  return (
    <Points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.02}
        color={color}
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </Points>
  );
};

// Glowing word text with animation
const AnimatedWord = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.15;
  });
  
  return (
    <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={groupRef}>
        <Text
          position={[0, 0, 0.1]}
          fontSize={0.35}
          color="#FBC2EB"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
          letterSpacing={0.1}
        >
          SOFIYA
        </Text>
        <Text
          position={[0, -0.5, 0.1]}
          fontSize={0.18}
          color="#A18CD1"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
          letterSpacing={0.15}
          opacity={0.8}
        >
          DEVELOPER
        </Text>
      </group>
    </Float>
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
        <ambientLight intensity={0.3} />
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
        
        {/* Main particle sphere */}
        <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.4}>
          <ParticleSphere radius={0.95} particleCount={2500} color="#A18CD1" />
          
          {/* Orbiting particle rings */}
          <OrbitingParticles count={180} radius={1.5} color="#FBC2EB" speed={0.4} tilt={0.3} />
          <OrbitingParticles count={150} radius={1.8} color="#C8A2E8" speed={-0.3} tilt={-0.4} />
          <OrbitingParticles count={120} radius={2.0} color="#A18CD1" speed={0.25} tilt={0.5} />
        </Float>
        
        {/* Animated word display */}
        <AnimatedWord />
      </Canvas>
    </div>
  );
};

export default SLogo3D;