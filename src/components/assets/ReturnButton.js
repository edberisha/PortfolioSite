import React from "react";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router"; // Import useRouter from next/router

const ReturnButton = () => {
  const router = useRouter(); // Initialize the router

  // Function to handle button click
  const handleClick = () => {
    router.push('/'); // Navigate to the /threejs page
  };

  return (
    <Button
      onClick={handleClick} // Attach the click handler
      colorScheme="teal"
      variant="solid"
      fontSize={['12px','13px','13px','13px','18px']}
      fontFamily="monospace"
      boxShadow="0 4px 20px rgba(255, 255, 255, 0.3), 0 8px 30px rgba(0, 0, 0, 0.2)" // Initial shadow
      _hover={{
        boxShadow: "0 6px 30px rgba(255, 255, 255, 0.5), 0 12px 40px rgba(0, 0, 0, 0.3)", // Hover effect shadow
        transform: "scale(1.05)", // Slightly increase the button size on hover
      }}
      transition="all 0.2s ease" // Smooth transition effect for hover
      p="8"
      borderRadius={'100px'}
      mt={["5vh","5vh","5vh","0vh","0vh","0vh"]}
    >
      Return to <br/> Home Page
    </Button>
  );
};

export default ReturnButton;
