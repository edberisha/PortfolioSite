import React from 'react'
import {Box, Text} from '@chakra-ui/react'
// import edphoto from '../assets/images/edphoto.png'
import LinkedInIcon from '../assets/icons/LinkedInIcon'

const BlockThree = () => {

  return (
    <Box
    // border="2px solid red"
    display="flex"
    pb="10%"
    justifyContent={"left"}
    >
        {/* <Box 
        >
            <Image
            width="150px"
            src={edphoto.src}
            />
        </Box> */}
        <Box 
        flexDir="column"
        display="flex"
        textAlign="left"
        color="white"
        >
            <Text
            fontSize={['25px', '30px', '30px', '40px']}
            mb="10%"
            fontFamily="monospace"
            >Contact Me</Text>
        <Box 
      display="flex"
      alignItems="center" // Center vertically
      justifyContent="center" // Center horizontally
    >
      <LinkedInIcon />
    </Box>
    </Box>
  

    </Box>
  )
}

export default BlockThree