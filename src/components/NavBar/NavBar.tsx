// components/Navbar.tsx
import Link from 'next/link';
import { Box, HStack } from '@chakra-ui/react';
import Waves from '../assets/ThreeJS/Waves'

const Navbar = () => (
    <Box
    >  
        <Box 
        
        // border="2px solid red"
        zIndex={-1}
        position="absolute"
        >
            <Waves />
        </Box>
        <Box 
            px="10%"
            pt="2%"
            // border="2px solid purple"
            fontSize={["20px","20px","20px","20px","30px"]}
            bg="transparent" 
            color="white"
            fontFamily={'monospace'}
            textShadow="2px 2px 4px rgba(0, 0, 0, 0.7)"

            >
            
                <HStack 
                gap={20}

            
                >
                    <Link href="/">Home</Link>
                    <Link href="/resume">Resume</Link>
                    <Link href="/about">About</Link>
                </HStack>
                
            </Box>
        
    </Box>
);

export default Navbar;
