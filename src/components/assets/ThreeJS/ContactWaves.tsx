import { useState, useRef, useEffect } from 'react';
import { BufferAttribute, BufferGeometry } from 'three';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { Suspense, useMemo } from 'react';
import { OrbitControls } from '@react-three/drei';


extend({ OrbitControls });

function Lines() {
  const bufferRef = useRef<BufferGeometry | null>(null);

  const count = 200;
  const sep = 2;
  const amplitude = 4;
  const frequency = 0.0004;

  // State to track time for animation
  const [time, setTime] = useState(0);

  // Function to increment time periodically
  const startAnimation = () => {
    setInterval(() => {
      setTime(prevTime => prevTime + 6.015); // Increment time
    }, 1000 / 60); // Update time approximately every 60 frames per second
  };

  // Start animation when component mounts
  useEffect(() => {
    startAnimation();
  }, []);

  // Generate positions for the lines
  const positions = useMemo(() => {
    const positions = [];

    // Generate lines in x direction
    for (let xi = 0; xi < count; xi++) {
      for (let zi = 0; zi < count; zi++) {
        let x = sep * (xi - count / 2);
        let z = sep * (zi - count / 2);
        let y = Math.sin(frequency * (x ** 2 + z ** 2 + time)) * amplitude;
        positions.push(x, y, z);

        x = sep * (xi - count / 2) + sep;
        y = Math.sin(frequency * (x ** 2 + z ** 2 + time)) * amplitude;
        positions.push(x, y, z);
      }
    }

    // Generate lines in z direction
    for (let zi = 0; zi < count; zi++) {
      for (let xi = 0; xi < count; xi++) {
        let z = sep * (zi - count / 2);
        let x = sep * (xi - count / 2);
        let y = Math.sin(frequency * (x ** 2 + z ** 2 + time)) * amplitude;
        positions.push(x, y, z);

        z = sep * (zi - count / 2) + sep;
        y = Math.sin(frequency * (x ** 2 + z ** 2 + time)) * amplitude;
        positions.push(x, y, z);
      }
    }

    return new Float32Array(positions);
  }, [count, sep, amplitude, frequency, time]);

  // Update positions in every frame
  useFrame(() => {
    if (bufferRef.current) {
      bufferRef.current.setAttribute('position', new BufferAttribute(positions, 3));
      bufferRef.current.attributes.position.needsUpdate = true;
    }
  });

  // Create buffer geometry
  const geometry = useMemo(() => {
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(positions, 3));
    return geometry;
  }, [positions]);

  return (
    <lineSegments>
      <bufferGeometry ref={bufferRef} attach="geometry" {...geometry} />
      <lineBasicMaterial attach="material" color={0x41ead4} />
    </lineSegments>
  );
}

function AnimationCanvas() {
  return (
    <div style={{ position: 'relative', width: '99vw', height: '20vh', backgroundColor: '#121212' }}>
      {/* Three.js Canvas */}
      <Canvas
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}
        camera={{ position: [10, 10, 12], fov: 45 }}
        onCreated={({ gl }) => {
          gl.setClearColor('#121212'); // Set background color here
          gl.domElement.tabIndex = 0;
        }}
      >
        {/* <OrbitControls /> */}
        <Suspense fallback={null}>
          <Lines />
        </Suspense>
      </Canvas>

      {/* CSS Gradient Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, rgba(18,18,18,0.2) 0%, rgba(18,18,18,1) 100%)',
          
          pointerEvents: 'none', // Allow interactions with underlying Three.js canvas
        }}
      />
    </div>
  );
}

export default function ThreeCanvasFlipped() {
  return (
    <div 
    className="anim"
 >
      {/* Animation Canvas Component */}
      <AnimationCanvas />
    </div>
  );
}



