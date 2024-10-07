import React from 'react';
import BlockOne from './BlockOne';
import BlockTwo from './BlockTwo';
import { Box } from '@chakra-ui/react';
import BlockThree from './BlockThree';

const Home = () => {
  return (
    <Box
    // border="2px solid yellow"
    >
      <BlockOne />
      <BlockTwo />
      <BlockThree />
    </Box>
  );
};

export default Home;
