import React, { useState } from 'react';
import { Text, Box, Flex, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '@chakra-ui/react';
import DetectSphere from '@/components/assets/ThreeJS/DetectSphere';
import Waves from '@/components/assets/ThreeJS/WaveCopy';  // Import the Waves component
import ReturnButton from '../components/assets/ReturnButton'

const ThreeJs = () => {
  // State for controlling FOV, particle size, and rotation speed
  const [fov, setFov] = useState(100);
  const [particleSize, setParticleSize] = useState(0.05);
  const [rotationSpeed, setRotationSpeed] = useState(0.01);

  // State for color shift for both DetectSphere and Waves
  const [sphereColorShift, setSphereColorShift] = useState(0.06);  // Color shift for DetectSphere
  const [waveColorShift, setWaveColorShift] = useState(0.54);      // Color shift for Waves

  return (
    <Flex
      direction={["column", "column", "row", "row"]}
      align="center"
      justify="center"
      
    >
        <Flex
        mt="10vh"
              gap="150px"  // Reduced the gap for better spacing between the two Flex containers
              color="white"
              bg="#121212"
              height="100vh"
              direction={["column", "column", "row", "row"]}
              align="center"
              justify="center">
                <Flex mb="auto">
                    <ReturnButton />
                </Flex>
      {/* Left Flex: DetectSphere controls and display */}
      <Flex
        mb="auto"
        // border="2px solid red"
        display="flex"
                align="center"
        justify="center"
        flexDir="column"
        width={["100%", "100%", "50%", "50%"]}  // Makes the box take 50% width on medium screens and larger
      >
        <Box mb={6}>
          <Text fontSize="2xl">Interactive Three.js Sphere</Text>
        </Box>

        {/* FOV Slider */}

                {/* Color Shift Slider for DetectSphere */}
                <Box mb={6} width="300px">
          <Text>Color Shift for Sphere: {sphereColorShift.toFixed(2)}</Text>
          <Slider value={sphereColorShift} min={0} max={1} step={0.01} onChange={setSphereColorShift}>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Box>
    
        {/* Particle Size Slider */}
        <Box mb={6} width="300px">
          <Text>Particle Size: {particleSize.toFixed(3)}</Text>
          <Slider value={particleSize} min={0.01} max={0.1} step={0.001} onChange={setParticleSize}>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Box>

        {/* Rotation Speed Slider */}
        <Box mb={6} width="300px">
          <Text>Rotation Speed: {rotationSpeed.toFixed(3)}</Text>
          <Slider value={rotationSpeed} min={0.001} max={0.05} step={.001} onChange={setRotationSpeed}>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Box>



        {/* DetectSphere */}
        <Box>
          <DetectSphere
            fov={fov}
            particleSize={particleSize}
            rotationSpeed={rotationSpeed}
            colorShift={sphereColorShift}  // Pass colorShift as a prop
          />
        </Box>
      </Flex>

      {/* Right Flex: Waves component */}
      <Flex
        mb="auto"
        // border="2px solid yellow"
        align="center"
        justify="center"
        display="flex"
        flexDir="column"
        width={["100%", "100%", "50%", "50%"]}  // Makes the box take 50% width on medium screens and larger
      >
        <Box mb={6}>
          <Text fontSize="2xl">Interactive Wave Animation</Text>
        </Box>

        {/* Color Shift Slider for Waves */}
        <Box width="300px">
          <Text>Color Shift for Waves: {waveColorShift.toFixed(2)}</Text>
          <Slider value={waveColorShift} min={0} max={1} step={0.01} onChange={setWaveColorShift}>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Box>

        {/* Waves Animation */}
        <Box>
          <Waves colorShift={waveColorShift} /> {/* Pass colorShift as a prop to Waves */}
        </Box>
      </Flex>
      </Flex>
    </Flex>
  );
};

export default ThreeJs;
