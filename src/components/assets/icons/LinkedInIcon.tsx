import {  FaLinkedin } from 'react-icons/fa';
import { IconButton, HStack, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverBody, Text } from '@chakra-ui/react';
import React from 'react';
import { MdEmail } from 'react-icons/md';

const LinkedInIcon = () => {
  return (
    <HStack spacing={"50px"}> {/* Adjust spacing as needed */}
      <IconButton
        as="a"
        href="https://www.linkedin.com/in/ed-berisha/" // Replace with your LinkedIn profile link
        aria-label="LinkedIn"
        icon={<FaLinkedin />}
        isRound
        colorScheme="blue"
        size="lg"
        fontSize="2xl"
        boxShadow="0 4px 20px rgba(255, 255, 255, 0.3), 0 8px 30px rgba(0, 0, 0, 0.2)" // Add depth
        _hover={{ boxShadow: "0 6px 30px rgba(255, 255, 255, 0.5), 0 12px 40px rgba(0, 0, 0, 0.3)" }} // Enhance on hover
      />
      <Popover placement='right'>
        <PopoverTrigger>
          <IconButton
            aria-label="Email"
            icon={<MdEmail />}
            isRound
            colorScheme="red"
            size="lg"
            fontSize="2xl"
            boxShadow="0 4px 20px rgba(255, 255, 255, 0.3), 0 8px 30px rgba(0, 0, 0, 0.2)" // Add depth
            _hover={{ boxShadow: "0 6px 30px rgba(255, 255, 255, 0.5), 0 12px 40px rgba(0, 0, 0, 0.3)" }} // Enhance on hover
          />
        </PopoverTrigger>
        <PopoverContent ml='10%'
        bg="#121212" borderRadius="md" boxShadow="lg" p={4}>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody
          bg="#121212">
            <Text 
            fontSize="lg" 
            textAlign="center" 
            fontWeight="bold"
            bg="#121212"
            >
              edberisha95@gmail.com
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </HStack>
  );
};

export default LinkedInIcon;
