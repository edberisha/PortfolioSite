import React, { useState } from 'react';
import { Text, Box, Link } from '@chakra-ui/react';
import Image from 'next/image'; // Import from next/image
import peanutpals from '../assets/images/peanutpals.png';
import peakai from '../assets/images/peakai.png';
import texasholdem from '../assets/images/texasholdem.png';

const BlockTwo = () => {
  const [firstopacityPeanut, setFirstOpacityPeanut] = useState(0.7);
  const [firstopacityPeak, setFirstOpacityPeak] = useState(0.7);
  const [firstopacityTexas, setFirstOpacityTexas] = useState(0.7);

  return (
    <Box
      pt="20%"
      pb="20%"
      flexDir="column"
      display="flex"
    >
      <Text 
        fontFamily="monospace"
        color="white"
        fontSize={['25px', '30px', '30px', '40px']}
        textShadow="2px 2px 4px rgba(0, 0, 0, 0.7)"
        textAlign="left"
        pb='5%'
      >
        My Projects - Quick Look
      </Text>
      <Box 
        gap={20}
        display="flex"
        flexDir="row"
      >
        <Link
          onMouseOver={() => setFirstOpacityPeanut(1)}
          onMouseLeave={() => setFirstOpacityPeanut(0.5)}
          href="https://edberisha.github.io/PeanutPals/"
        >
          <Text
            color="white"
            fontFamily="monospace"
            textAlign="center"
            fontSize={["13px", "13px", "15px", "15px", "20px", "20px"]}
          >
            PEANUT PALS
          </Text>
          <Box
            opacity={firstopacityPeanut}
            flex="1"
            borderRadius="25px" 
            overflow="hidden" 
          >
            <Image 
              src={peanutpals}
              alt="Peanut Pals" // Add an alt text for accessibility
              layout="responsive" // Ensure the image scales properly
              objectFit="cover" // Ensure the image covers the entire area
            />
          </Box>
        </Link>
        <Link
          onMouseOver={() => setFirstOpacityPeak(1)}
          onMouseLeave={() => setFirstOpacityPeak(0.5)}
          href="https://peak-sleek-uyitp8ljz-peak-sentry.vercel.app/"
        >
          <Text
            color="white"
            fontFamily="monospace"
            textAlign="center"
            fontSize={["13px", "13px", "15px", "15px", "20px", "20px"]}
          >
            PEAK AI
          </Text>
          <Box
            flex="1"
            opacity={firstopacityPeak}
            borderRadius="25px" 
            overflow="hidden" 
          >
            <Image 
              src={peakai}
              alt="Peak AI"
              layout="responsive"
              objectFit="cover"
            />
          </Box>
        </Link>
        <Link
          onMouseOver={() => setFirstOpacityTexas(1)}
          onMouseLeave={() => setFirstOpacityTexas(0.5)}
          href="https://edberisha.github.io/TexasHoldEm/"
        >
          <Text
            fontFamily="monospace"
            color="white"
            textAlign="center"
            fontSize={["13px", "13px", "15px", "15px", "20px", "20px"]}
          >
            TEXAS HOLDEM
          </Text>
          <Box
            flex="1"
            opacity={firstopacityTexas}
            borderRadius="25px" 
            overflow="hidden" 
          >
            <Image 
              src={texasholdem}
              alt="Texas Holdem"
              layout="responsive"
              objectFit="cover"
            />
          </Box>
        </Link>
      </Box>
    </Box>
  );
};

export default BlockTwo;
