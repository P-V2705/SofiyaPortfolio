import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

interface WireframeBlobProps {
  position: [number, number, number];
  color: string;
  scale?: number;
  radius?: number;
  segments?: number;
}

/**
 * A morphing wireframe blob that transitions between a cube (polyhedron)
 * and a sphere via per-vertex lerp. Renders as an emissive wireframe mesh
 * with an additive glow layer for bloom-like edge highlighting.
 */
const WireframeBlob = ({
  position,
  color,
  scale = 1,
  radius = 1,
  segments = 6,
}: WireframeBlobProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Build a BoxGeometry and pre-compute sphere-normalized positions for morphing.
  const { geometry, spherePositions, boxPositions } = useMemo(() => {
    // Size the cube so its corners sit on the target sphere radius.
    const size = (2 * radius) / Math.sqrt(3);
    const geo = new THREE.BoxGeometry(
      size,
      size,
      size,
      segments,
      segments,
      segments
    );
    const posAttr = geo.attributes.position;
    const boxPos = new Float32Array(posAttr.array);
    const spherePos = new Float32Array(posAttr.count * 3);

    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const y = posAttr.getY(i);
      const z = posAttr.getZ(i);
      const len = Math.sqrt(x * x + y * y + z * z) || 1;
      spherePos[i * 3] = (x / len) * radius;
      spherePos[i * 3 + 1] = (y / len) * radius;
      spherePos[i * 3 + 2] = (z / len) * radius;
    }

    return { geometry: geo, spherePositions: spherePos, boxPositions: boxPos };
  }, [radius, segments]);

  useFrame((state) => {
    if (!meshRef.current || !groupRef.current) return;

    const t = state.clock.getElapsedTime();

    // Gentle floating drift
    groupRef.current.position.x = position[0] + Math.sin(t * 0.3 + position[0]) * 0.3;
    groupRef.current.position.y = position[1] + Math.cos(t * 0.4 + position[1]) * 0.3;

    // Slow continuous rotation
    groupRef.current.rotation.y += 0.003;
    groupRef.current.rotation.x += 0.001;

    // Seamless morph: 0 = box, 1 = sphere (sine provides smooth cosine ease)
    const morphT = (Math.sin(t * 0.6) + 1) * 0.5;

    const posAttr = geometry.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const bx = boxPositions[i * 3];
      const by = boxPositions[i * 3 + 1];
      const bz = boxPositions[i * 3 + 2];
      const sx = spherePositions[i * 3];
      const sy = spherePositions[i * 3 + 1];
      const sz = spherePositions[i * 3 + 2];

      posAttr.setXYZ(
        i,
        bx + (sx - bx) * morphT,
        by + (sy - by) * morphT,
        bz + (sz - bz) * morphT
      );
    }
    posAttr.needsUpdate = true;

    // Pulsing emissive intensity synced with morph cycle
    const mat = meshRef.current.material as THREE.MeshStandardMaterial;
    const pulse = (Math.sin(t * 1.5) + 1) * 0.5;
    mat.emissiveIntensity = 0.2 + pulse * 0.8;
    mat.opacity = 0.7 + pulse * 0.25;
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Main crisp wireframe with emissive glow */}
      <mesh ref={meshRef} geometry={geometry}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          wireframe
          transparent
          opacity={0.85}
          metalness={0.1}
          roughness={0.8}
        />
      </mesh>

      {/* Additive glow layer for bloom-like edge highlight */}
      <mesh geometry={geometry} scale={1.08}>
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};

/** Slow orbital camera motion with subtle vertical drift */
const CameraRig = () => {
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * 0.06;
    state.camera.position.x = Math.sin(t) * 6;
    state.camera.position.z = Math.cos(t) * 6;
    state.camera.position.y = Math.sin(t * 0.4) * 0.8;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
};

const Scene3D = () => {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "#030308" }}
      >
        <color attach="background" args={["#030308"]} />
        <CameraRig />

        <ambientLight intensity={0.2} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#7c5cff" />
        <pointLight position={[-5, -3, 2]} intensity={1.2} color="#3b82f6" />
        <pointLight position={[0, -5, 3]} intensity={0.8} color="#A18CD1" />

        <Stars
          radius={80}
          depth={50}
          count={3000}
          factor={4}
          saturation={0}
          fade
          speed={0.8}
        />

        <WireframeBlob
          position={[-2.6, 0.8, -1]}
          color="#A18CD1"
          scale={1.3}
          radius={1}
          segments={6}
        />
        <WireframeBlob
          position={[2.8, -0.6, -2]}
          color="#FBC2EB"
          scale={1.6}
          radius={1}
          segments={6}
        />
        <WireframeBlob
          position={[0, 2.4, -3]}
          color="#C8A2E8"
          scale={0.9}
          radius={1}
          segments={6}
        />
      </Canvas>
    </div>
  );
};

export default Scene3D;
