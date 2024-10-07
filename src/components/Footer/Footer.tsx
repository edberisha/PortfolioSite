import React from 'react'
import { Box, HStack } from '@chakra-ui/react';
import LinkedInIcon from '../assets/icons/LinkedInIcon';



const Footer = () => (
  <Box 
  // border="2px solid purple"
  p={4} 
  bg="transparent" 
  color="white"
  >
      <HStack 
      spacing={4}
      >
        <LinkedInIcon />
      </HStack>
  </Box>
);

export default Footer