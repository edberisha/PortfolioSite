import { useState, useRef, useEffect, Suspense, useMemo } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { BufferAttribute, BufferGeometry } from 'three';



extend({ OrbitControls });

function Lines() {
  const bufferRef = useRef<BufferGeometry | null>(null);

  const count = 200;
  const sep = 2;
  const amplitude = 4;
  const frequency = 0.0004;

  const [time, setTime] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(prevTime => prevTime + 6.015);
    }, 1000 / 60);

    return () => clearInterval(intervalId);
  }, []);

  const positions = useMemo(() => {
    const positions = [];

    for (let xi = 0; xi < count; xi++) {
      for (let zi = 0; zi < count; zi++) {
        let x = sep * (xi - count / 2);
        const z = sep * (zi - count / 2);
        let y = Math.sin(frequency * (x ** 2 + z ** 2 + time)) * amplitude;
        positions.push(x, y, z);

        x = sep * (xi - count / 2) + sep;
        y = Math.sin(frequency * (x ** 2 + z ** 2 + time)) * amplitude;
        positions.push(x, y, z);
      }
    }

    for (let zi = 0; zi < count; zi++) {
      for (let xi = 0; xi < count; xi++) {
        let z = sep * (zi - count / 2);
        const x = sep * (xi - count / 2);
        let y = Math.sin(frequency * (x ** 2 + z ** 2 + time)) * amplitude;
        positions.push(x, y, z);

        z = sep * (zi - count / 2) + sep;
        y = Math.sin(frequency * (x ** 2 + z ** 2 + time)) * amplitude;
        positions.push(x, y, z);
      }
    }

    return new Float32Array(positions);
  }, [count, sep, amplitude, frequency, time]);

  useFrame(() => {
    if (bufferRef.current) {
      bufferRef.current.setAttribute('position', new BufferAttribute(positions, 3));
      bufferRef.current.attributes.position.needsUpdate = true;
    }
  });

  const geometry = useMemo(() => {
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(positions, 3));
    return geometry;
  }, [positions]);

  return (
    <lineSegments>
      <bufferGeometry ref={bufferRef} attach="geometry" {...geometry} />
      <lineBasicMaterial attach="material" color={'#41ead4'} />
    </lineSegments>
  );
}

function AnimationCanvas() {
  return (
    <div style={{ zIndex: "1", position: 'relative', width: '100vw', height: '100vh', backgroundColor: '#121212' }}>
      <Canvas
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}
        camera={{ position: [10, 10, 12], fov: 45 }}
        onCreated={({ gl }) => {
          gl.setClearColor('#121212');
          gl.domElement.tabIndex = 0;
        }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <Lines />
        </Suspense>
      </Canvas>

{/* OPACITY MASK COVER */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, rgba(18,18,18,0.2) 0%, rgba(18,18,18,1) 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}

export default function Waves() {
  return (
    <div className="anim">
      <AnimationCanvas />
    </div>
  );
}
