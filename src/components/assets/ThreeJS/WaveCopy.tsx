import React, { useState, useRef, useEffect, Suspense, useMemo } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { BufferAttribute, BufferGeometry } from 'three';
import { Slider, SliderTrack, SliderFilledTrack, SliderThumb, Box, Text, Flex } from '@chakra-ui/react';

// Extend orbit controls to use with React Three Fiber
extend({ OrbitControls });

function Lines({ amplitude, frequency, colorShift }: { amplitude: number; frequency: number; colorShift: number }) {
  const bufferRef = useRef<BufferGeometry | null>(null);
  const count = 200;
  const sep = 2;
  const [time, setTime] = useState(0);

  // Update time for animation effect
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => prevTime + 6.015);
    }, 1000 / 60);
    return () => clearInterval(intervalId);
  }, []);

  const positions = useMemo(() => {
    const positions: number[] = [];
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
      <lineBasicMaterial attach="material" color={`hsl(${colorShift * 360}, 100%, 50%)`} />
    </lineSegments>
  );
}

// Canvas wrapper component
function AnimationCanvas({ amplitude, frequency, colorShift }: { amplitude: number; frequency: number; colorShift: number }) {
  return (
    <div style={{ zIndex: '1', position: 'relative', width: '25vw', height: '35vh', backgroundColor: '#121212' }}>
      <Canvas
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}
        camera={{ position: [10, 10, 12], fov: 105 }}
        onCreated={({ gl }) => {
          gl.setClearColor('#121212');
          gl.domElement.tabIndex = 0;
        }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <Lines amplitude={amplitude} frequency={frequency} colorShift={colorShift} />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
}

// Main Component
export default function Waves({ colorShift }: { colorShift: number }) {
  const [amplitude, setAmplitude] = useState(1);
  const [frequency, setFrequency] = useState(0.00305);

  return (
    <Flex direction="column" align="center" justify="center" bg="#121212" color="white" p={6}>
      {/* Sliders for amplitude and frequency */}
      <Box mb={6} width="300px">
        <Text>Amplitude: {amplitude}</Text>
        <Slider value={amplitude} min={0.1} max={10} step={0.1} onChange={setAmplitude}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Box>

      <Box mb={6} width="300px">
        <Text>Frequency: {frequency}</Text>
        <Slider value={frequency} min={0.0001} max={0.01} step={0.00001} onChange={setFrequency}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Box>

      <AnimationCanvas amplitude={amplitude} frequency={frequency} colorShift={colorShift} />
    </Flex>
  );
}
