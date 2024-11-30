import React, { useEffect } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';
import * as THREE from 'three';

// Define TypeScript interface for GradientOpacityMaterial props
interface GradientOpacityMaterialProps {
  color1: string;
  color2: string;
  opacityStart: number;
  opacityEnd: number;
}

// Define the GradientOpacityMaterial component with TypeScript
const GradientOpacityMaterial: React.FC<GradientOpacityMaterialProps> = ({ color1, color2, opacityStart, opacityEnd }) => {
  const shaderMaterialRef = React.useRef<THREE.ShaderMaterial>(null);

  const vertexShader = `
    precision highp float;
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    precision highp float;
    uniform vec3 color1;
    uniform vec3 color2;
    uniform float opacityStart;
    uniform float opacityEnd;
    varying vec2 vUv;
    void main() {
      float gradient = vUv.x; // Use x for horizontal gradient
      float opacity = mix(opacityStart, opacityEnd, gradient);
      vec3 color = mix(color1, color2, gradient); // Mix colors as well for visual effect
      gl_FragColor = vec4(color, opacity);
    }
  `;

  const uniforms = {
    color1: { value: new THREE.Color(color1) },
    color2: { value: new THREE.Color(color2) },
    opacityStart: { value: opacityStart },
    opacityEnd: { value: opacityEnd }
  };

  return (
    <shaderMaterial
      ref={shaderMaterialRef}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      uniforms={uniforms}
      transparent
    />
  );
};

// Define the SquareBorder component
const SquareBorder: React.FC = () => {
  // Create line segments to form a square border
  const geometry = new THREE.BufferGeometry();
  const vertices = new Float32Array([
    -0.5, -0.5, 0,
     0.5, -0.5, 0,
     0.5, -0.5, 0,
     0.5,  0.5, 0,
     0.5,  0.5, 0,
    -0.5,  0.5, 0,
    -0.5,  0.5, 0,
    -0.5, -0.5, 0,
  ]);
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

  return (
    <lineSegments>
      <bufferGeometry attach="geometry" {...geometry} />
      <lineBasicMaterial attach="material" color="#41ead4" linewidth={2} />
    </lineSegments>
  );
};

// Define TypeScript interface for AnimatedSquare props
interface AnimatedSquareProps {
  color1: string;
  color2: string;
  initialPositionZ: number;
  direction: number;
  opacityStart: number;
  opacityEnd: number;
}

// Define the AnimatedSquare component with TypeScript
const AnimatedSquare: React.FC<AnimatedSquareProps> = ({ color1, color2, initialPositionZ, direction, opacityStart, opacityEnd }) => {
  const squareRef = React.useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (squareRef.current) {
      const time = Date.now() * 0.001;
      const targetZ = Math.sin(time) * 0.25 * direction; // Apply direction to targetZ
      const currentZ = squareRef.current.position.z;

      // Apply damping effect to the movement
      squareRef.current.position.z += (targetZ - currentZ);
    }
  });

  return (
    <Box ref={squareRef} args={[1, 1, 0]} position={[0, 0, initialPositionZ]}>
      <GradientOpacityMaterial 
        color1={color1} 
        color2={color2} 
        opacityStart={opacityStart} 
        opacityEnd={opacityEnd} 
      />
    </Box>
  );
};

// Define the CameraController component
const CameraController: React.FC = () => {
  const { camera } = useThree();

  useEffect(() => {
    // Calculate camera rotation based on the angle
    const angle = THREE.MathUtils.degToRad(50); // Convert degrees to radians
    camera.position.set(
      5 * Math.cos(angle), // Adjust x position
      5,                    // y position remains the same
      10 * Math.sin(angle)  // Adjust z position
    );
    camera.lookAt(0, 0, 0); // Make the camera look at the origin
  }, [camera]);

  return null;
};

// Define TypeScript interface for HoveringSquares props
interface HoveringSquaresProps {
  fov: number;
}

// Define the HoveringSquares component with TypeScript
const HoveringSquares: React.FC<HoveringSquaresProps> = ({ fov }) => {
  return (
    <Canvas
      key={fov} // Add key prop to force re-render when fov changes
      gl={{ antialias: true }}
      style={{  width: '50vw', height:"40vh", background: 'transparent'}}
      camera={{ fov }} // Set the fov dynamically
    >
      {/* Ambient light */}
      <ambientLight intensity={0.5} />
      {/* Directional light */}
      <directionalLight position={[5, 5, 5]} />

      {/* TOP SQUARE */}
      <AnimatedSquare 
        color1="white" 
        color2="white" 
        initialPositionZ={2} 
        direction={1} 
        opacityStart={0.75} 
        opacityEnd={0.25} 
      />

      {/* MIDDLE SQUARE */}
      <SquareBorder />

      {/* BOTTOM SQUARE */}
      <AnimatedSquare 
        color1="white" 
        color2="gray" 
        initialPositionZ={-2} 
        direction={-1} 
        opacityStart={0.3} 
        opacityEnd={0.1} 
      />

      {/* Camera Controller */}
      <CameraController />
    </Canvas>
  );
};

export default HoveringSquares;
