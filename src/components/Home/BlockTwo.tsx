import React, { useState } from 'react';
import { Text, Box, Link, ListItem, List } from '@chakra-ui/react';
import Image from 'next/image'; // Import from next/image
// import peanutpals from '../assets/images/peanutpals.png';
import peakai from '../assets/images/peakai.png';
import texasholdem from '../assets/images/texasholdem.png';
import wordapp from '../assets/images/wordapp.png'

const BlockTwo = () => {
  // const [firstopacityPeanut, setFirstOpacityPeanut] = useState(0.7);


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
        flexDir={["column","column","column","row","row"]}
      >
        <Link

          href="https://wordapp-76cd48b9af07.herokuapp.com/"
        >
          <Text
            color="white"
            fontFamily="monospace"
            textAlign="center"
            fontSize={["13px", "13px", "15px", "15px", "20px", "20px"]}
          >
            WORD APP
          </Text>
          <Box
            flex="1"
            borderRadius="25px" 
            overflow="hidden" 
          >
            <Image 
              src={wordapp}
              alt="Word App" // Add an alt text for accessibility

            />
          </Box>
          <Text 
          fontSize={["12px","14px","14px","17px"]}
          fontFamily="monospace"
          // border="2px solid yellow"
          color="white">
            TECH STACK USED:
            <p>
             <List style={{paddingLeft:"20px"}}>
                <ListItem>Next.js</ListItem>
                <ListItem>Node.js</ListItem>
                <ListItem>Express.js</ListItem>
                <ListItem>ChakraUI</ListItem>
                <ListItem>PosegreSQL</ListItem>
                <ListItem>Firebase Authentication</ListItem>
                <ListItem>AI integration (OpenAI)</ListItem>
            </List>
            </p>
          </Text>
        </Link>
        <Link

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
            borderRadius="25px" 
            overflow="hidden" 
          >
            <Image 
              src={peakai}
              alt="Peak AI"

            />

          </Box>
          <Text 
          fontSize={["12px","14px","14px","17px"]}
          fontFamily="monospace"
          // border="2px solid yellow"
          color="white">
            TECH STACK USED:
            <p>
             <List style={{paddingLeft:"20px"}}>
                <ListItem>Next.js</ListItem>
                <ListItem>ChakraUI</ListItem>
                <ListItem>TypeScript</ListItem>
                <ListItem>React</ListItem>
                <ListItem>React Spring</ListItem>
                <ListItem>Three.js</ListItem>
            </List>
            </p>
          </Text>
        </Link>
        <Link

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
            borderRadius="25px" 
            overflow="hidden" 
          >
            <Image 
              src={texasholdem}
              alt="Texas Holdem"

            />
          </Box>
          <Text 
          fontSize={["12px","14px","14px","17px"]}
          fontFamily="monospace"
          // border="2px solid yellow"
          color="white">
            TECH STACK USED:
            <p>
             <List style={{paddingLeft:"20px"}}>
                <ListItem>React</ListItem>
                <ListItem>ChakraUI</ListItem>
                <ListItem>Framer Motion</ListItem>
            </List>
            </p>
          </Text>
        </Link>
        {/* <Link
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
        </Link> */}
        
      </Box>
      
    </Box>
  );
};

export default BlockTwo;
