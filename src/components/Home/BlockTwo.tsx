import React from 'react';
import { Text, Box, Link} from '@chakra-ui/react';
import Image from 'next/image';
import texasholdem from '../assets/images/texasholdem.png';
import wordapp from '../assets/images/wordapp.png';
import stockapi from '../assets/images/stockapi.png'
import peakai from '../assets/images/peakai.png'

const BlockTwo = () => {
  return (
    <Box pt="20%" pb="20%" flexDir="column" display="flex">
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
      <Box gap={20} display="flex" flexDir={["column", "column", "column", "row", "row"]}>
        <Link href="https://edstockapi-46617bdcc216.herokuapp.com/backtest/">
          <Text color="white" fontFamily="monospace" textAlign="center" fontSize={["13px", "13px", "15px", "15px", "20px", "20px"]}>
            Stock Prediction
          </Text>
          <Box flex="1" borderRadius="25px" overflow="hidden">
            <Image src={stockapi} alt="A screenshot of the Word App" />
          </Box>
          <Text fontSize={["12px", "14px", "14px", "17px"]} fontFamily="monospace" color="white">
          TECH STACK USED:<br/>
               • Django<br/>
               • PostgreSQL<br/>
               • Machine Learning (sckit, pandas)<br/>
               • Trained linear integration model<br/>
               • API used: Alpha Vantage<br/>
               • BackTesting Module<br/>
               • Report Generation<br/>
          </Text>
        </Link>
        <Link href="https://peak.watch">
          <Text color="white" fontFamily="monospace" textAlign="center" fontSize={["13px", "13px", "15px", "15px", "18px", "18px"]}>
            Peak AI Landing Site
          </Text>
          <Box flex="1" borderRadius="25px" overflow="hidden">
            <Image src={peakai} alt="A screenshot of the Word App" />
          </Box>
          <Text fontSize={["12px", "14px", "14px", "17px"]} fontFamily="monospace" color="white">
          TECH STACK USED:<br/>
               • Next.js<br/>
               • Chakra UI<br/>
               • Three.js<br/>
               • FramerMotion<br/>
               • *Deployed via Wix for streamlined company updates<br/>
          </Text>
        </Link>
        <Link href="https://wordapp-76cd48b9af07.herokuapp.com/">
          <Text color="white" fontFamily="monospace" textAlign="center" fontSize={["13px", "13px", "15px", "15px", "20px", "20px"]}>
            Word App
          </Text>
          <Box flex="1" borderRadius="25px" overflow="hidden">
            <Image src={wordapp} alt="A screenshot of the Word App" />
          </Box>
          <Text fontSize={["12px", "14px", "14px", "17px"]} fontFamily="monospace" color="white">

          TECH STACK USED:<br/>
               • Next.js<br/>
               • Node.js<br/>
               • Express.js<br/>
               • ChakraUI<br/>
               • PosegreSQL<br/>
               • Firebase Authentication<br/>
               • AI integration (OpenAI)<br/>

         

          </Text>
        </Link>
      
        <Link href="https://edberisha.github.io/TexasHoldEm/">
          <Text fontFamily="monospace" color="white" textAlign="center" fontSize={["13px", "13px", "15px", "15px", "20px", "20px"]}>
            TEXAS HOLDEM
          </Text>
          <Box flex="1" borderRadius="25px" overflow="hidden">
            <Image src={texasholdem} alt="A screenshot of Texas Holdem" />
          </Box>
          <Text fontSize={["12px", "14px", "14px", "17px"]} fontFamily="monospace" color="white">
            TECH STACK USED:<br/>
            • React<br/>
            • ChakraUI<br/>
            • Framer Motion<br/>
            
          </Text>
        </Link>
      </Box>
    </Box>
  );
};

export default BlockTwo;
