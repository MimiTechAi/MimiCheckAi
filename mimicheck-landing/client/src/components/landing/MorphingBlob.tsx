/**
 * Morphing Blob Background - Lusion/Basement Style
 * 
 * Features:
 * - WebGL-powered morphing shapes
 * - Reacts to mouse position
 * - Smooth organic animations
 * - Multiple color modes
 * - Performance optimized
 */

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Custom shader for organic blob morphing
const vertexShader = `
  uniform float uTime;
  uniform float uSpeed;
  uniform float uNoiseStrength;
  uniform vec2 uMouse;
  
  varying vec2 vUv;
  varying float vElevation;
  
  // Simplex noise function
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
  
  void main() {
    vUv = uv;
    
    vec3 pos = position;
    
    // Multiple noise layers for organic movement
    float noise1 = snoise(vec3(pos.x * 1.5, pos.y * 1.5, uTime * uSpeed));
    float noise2 = snoise(vec3(pos.x * 3.0, pos.y * 3.0, uTime * uSpeed * 0.5));
    float noise3 = snoise(vec3(pos.x * 0.5, pos.y * 0.5, uTime * uSpeed * 2.0));
    
    // Mouse influence
    float mouseInfluence = 1.0 - smoothstep(0.0, 2.0, length(pos.xy - uMouse));
    
    float elevation = (noise1 * 0.5 + noise2 * 0.25 + noise3 * 0.25) * uNoiseStrength;
    elevation += mouseInfluence * 0.3;
    
    pos += normal * elevation;
    
    vElevation = elevation;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform float uTime;
  
  varying vec2 vUv;
  varying float vElevation;
  
  void main() {
    // Dynamic color mixing based on elevation and time
    float mixFactor1 = smoothstep(-0.5, 0.5, vElevation + sin(uTime * 0.5) * 0.2);
    float mixFactor2 = smoothstep(0.0, 1.0, vElevation + cos(uTime * 0.3) * 0.3);
    
    vec3 color = mix(uColor1, uColor2, mixFactor1);
    color = mix(color, uColor3, mixFactor2 * 0.5);
    
    // Add subtle glow at peaks
    float glow = smoothstep(0.3, 0.8, vElevation) * 0.3;
    color += glow;
    
    // Fresnel-like edge effect
    float edge = pow(1.0 - abs(dot(vec3(0.0, 0.0, 1.0), normalize(vec3(vUv - 0.5, 1.0)))), 2.0);
    color += edge * 0.1;
    
    gl_FragColor = vec4(color, 0.8);
  }
`;

interface BlobProps {
  color1?: string;
  color2?: string;
  color3?: string;
  speed?: number;
  noiseStrength?: number;
  scale?: number;
}

function Blob({ 
  color1 = '#10b981', 
  color2 = '#14b8a6', 
  color3 = '#06b6d4',
  speed = 0.3,
  noiseStrength = 0.5,
  scale = 3,
}: BlobProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uSpeed: { value: speed },
    uNoiseStrength: { value: noiseStrength },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uColor1: { value: new THREE.Color(color1) },
    uColor2: { value: new THREE.Color(color2) },
    uColor3: { value: new THREE.Color(color3) },
  }), [color1, color2, color3, speed, noiseStrength]);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const material = meshRef.current.material as THREE.ShaderMaterial;
    if (material.uniforms.uTime) {
      material.uniforms.uTime.value = state.clock.elapsedTime;
    }
    
    // Smooth mouse following
    const targetX = (state.pointer.x * 2);
    const targetY = (state.pointer.y * 2);
    mouseRef.current.x += (targetX - mouseRef.current.x) * 0.05;
    mouseRef.current.y += (targetY - mouseRef.current.y) * 0.05;
    if (material.uniforms.uMouse?.value) {
      (material.uniforms.uMouse.value as THREE.Vector2).set(mouseRef.current.x, mouseRef.current.y);
    }
    
    // Subtle rotation
    meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
  });

  return (
    <mesh ref={meshRef} scale={scale}>
      <icosahedronGeometry args={[1, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

interface MorphingBlobProps {
  className?: string;
  color1?: string;
  color2?: string;
  color3?: string;
  speed?: number;
  noiseStrength?: number;
  scale?: number;
  opacity?: number;
}

export default function MorphingBlob({
  className = '',
  color1 = '#10b981',
  color2 = '#14b8a6',
  color3 = '#06b6d4',
  speed = 0.3,
  noiseStrength = 0.5,
  scale = 3,
  opacity = 0.6,
}: MorphingBlobProps) {
  return (
    <div className={`absolute inset-0 -z-10 ${className}`} style={{ opacity }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#14b8a6" />
        <Blob 
          color1={color1}
          color2={color2}
          color3={color3}
          speed={speed}
          noiseStrength={noiseStrength}
          scale={scale}
        />
      </Canvas>
    </div>
  );
}
