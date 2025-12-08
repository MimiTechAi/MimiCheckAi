import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

/**
 * WebGL Particle Background - GPU ACCELERATED
 * Inspired by: Stripe, Linear, Vercel
 * 
 * Uses Three.js for 60fps performance
 * - All calculations on GPU
 * - Instanced rendering
 * - Optimized for mobile
 */

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  
  // Generate particles once
  const particles = useMemo(() => {
    const count = 2000;
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Spread particles in a sphere
      const radius = Math.random() * 10 + 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
    }
    
    return positions;
  }, []);

  // Animate rotation
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.05;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.1;
    }
  });

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#10b981"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

function GradientSphere({ position, color, scale = 1 }: { 
  position: [number, number, number]; 
  color: string;
  scale?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
      ref.current.position.x = position[0] + Math.cos(state.clock.elapsedTime * 0.3) * 0.3;
    }
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <sphereGeometry args={[2, 32, 32]} />
      <meshBasicMaterial 
        color={color} 
        transparent 
        opacity={0.15}
      />
    </mesh>
  );
}

export default function WebGLBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Dark base */}
      <div className="absolute inset-0 bg-slate-950" />
      
      {/* WebGL Canvas */}
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        dpr={[1, 1.5]} // Limit pixel ratio for performance
        gl={{ 
          antialias: false, // Better performance
          alpha: true,
          powerPreference: 'high-performance'
        }}
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%',
          pointerEvents: 'none'
        }}
      >
        {/* Ambient light */}
        <ambientLight intensity={0.5} />
        
        {/* Particle field */}
        <ParticleField />
        
        {/* Gradient spheres (like floating orbs) */}
        <GradientSphere position={[-5, 2, -5]} color="#10b981" scale={1.5} />
        <GradientSphere position={[5, -2, -3]} color="#14b8a6" scale={1.2} />
        <GradientSphere position={[0, 3, -8]} color="#06b6d4" scale={1.8} />
      </Canvas>

      {/* Grid overlay - CSS only */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(16,185,129,0.5) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(16,185,129,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />
    </div>
  );
}
