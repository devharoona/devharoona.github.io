'use client';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { PERSONAL } from '@/lib/data';

function PortraitOrb({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.position.y = Math.sin(clock.elapsedTime * 1.4) * 0.1;
    group.current.rotation.y += (mouse.current[0] * 0.25 - group.current.rotation.y) * 0.05;
    group.current.rotation.x += (-mouse.current[1] * 0.14 - group.current.rotation.x) * 0.05;
  });

  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[1.45, 32, 24]} />
        <meshBasicMaterial color="#22D3EE" transparent opacity={0.08} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[1.48, 0.035, 12, 64]} />
        <meshBasicMaterial color="#22D3EE" transparent opacity={0.9} />
      </mesh>
      <mesh rotation={[0, 0, -Math.PI / 2]}>
        <torusGeometry args={[1.62, 0.016, 8, 64]} />
        <meshBasicMaterial color="#8B5CF6" transparent opacity={0.65} />
      </mesh>
      <Html center position={[0, 0, 0.08]} distanceFactor={5.2} transform>
        <div className="hero-portrait-frame">
          <img
            src="/pichr.png"
            alt="Haroon Rasool working at his desk"
            className="hero-portrait"
            onError={(event) => { event.currentTarget.src = PERSONAL.avatar; }}
          />
        </div>
      </Html>
    </group>
  );
}

function Particles() {
  const count = 50;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, []);

  const pts = useRef<THREE.Points>(null);
  useFrame((_, dt) => { if (pts.current) pts.current.rotation.y += dt * 0.025; });

  return (
    <points ref={pts}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#22D3EE" transparent opacity={0.5} />
    </points>
  );
}

export default function HeroCanvas({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
      dpr={1}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 4, 4]} intensity={1.5} color="#22D3EE" />
      <pointLight position={[-4, -4, -4]} intensity={0.8} color="#8B5CF6" />
      <Particles />
      <PortraitOrb mouse={mouse} />
    </Canvas>
  );
}
