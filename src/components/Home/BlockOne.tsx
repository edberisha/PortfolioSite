import React from 'react';
import { Text, Box, Button, Image} from '@chakra-ui/react';
import javascriptlogo from '../assets/images/javascriptlogo.svg'
import reactlogo from '../assets/images/reactlogo.svg'
import nextjs from '../assets/images/nextjs.webp'
import pythonlogo from '../assets/images/pythonlogo.png'
import chakralogo from '../assets/images/chakralogo.png'
// import { useRouter } from 'next/router';
import sqllogo from '../assets/images/sqllogo.svg'
import threejslogo from '../assets/images/threejslogo.png'



const BlockOne = () => {

 

  return (
    <Box
    mb='10vh'
    pt='10%'
>


        <Box
        position="relative" 
        // border="2px solid red"
        display="flex"
        flexDir="column"
        >
                
        
          {/* Content over Waves */}
          <Box 

            position="relative"
            justifyItems={"left"}
            textAlign="left"
            // border="2px solid orange"
            width={["100%","100%","fit-content","fit-content","fit-content","fit-content"]}
          >
            <Text 
            fontFamily="monospace"
            color="white"
            fontSize={['25px', '30px', '30px', '60px']}
            textShadow="2px 2px 4px rgba(0, 0, 0, 0.7)"
            textAlign={['center','center','left','left','left','left']}

            >
              Ed Berisha
            </Text>
            <Text 
            fontWeight={800}
            fontFamily="monospace"
            color="white"
            fontSize={['28px', '36px', '40px', '50px']}
            textShadow="2px 2px 4px rgba(0, 0, 0, 0.7)"
            textAlign={['center','center','left','left','left','left']}
            whiteSpace={"nowrap"}


            >
              Full Stack Engineer
            </Text>
            
          </Box>
          <Box
          flex="1"
          // border="2px solid purple"
          display="flex"
          flexDir={"column"}
          width="fit-content"
          // justifyContent={"center"}
          

          >
                <Box
                // border="2px solid purple"
                mt={["7vh","7vh","3vh","3vh","3vh"]}
                display="flex"
                justifyContent={["center","center", "left", "left", "left", "left"]}
                gap={20}

                >
                      <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              <Button
                fontFamily="monospace"
                fontWeight={700}
                bgGradient="linear(to-r, teal.500, green.500)"
                color="white"
                fontSize={["25px","15px","20px","20px","25px","30px"]}
                width={["150px","90px","100px","120px","140px","160px"]}
                p={4}
                boxShadow="md"
                borderRadius="md"
                _hover={{ bg: "#145d54", transform: "scale(1.05)", transition: "all 0.3s ease" }}
                _active={{ transform: "scale(0.95)" }}
                animation="pulse 1.5s infinite"
              >
                Resume
              </Button>
              </a>

                
                </Box>
                <Box 
                mt={["7vh","7vh","3vh","3vh","3vh","3vh"]}
                // border="2px solid red"
                >
                  <Text
                  // border="2px solid red"
                  fontSize={["20px","20px","20px","20px","25px","25px"]}
                  fontFamily="monospace"
                  color="white"
                  lineHeight={"2"}
                  >
                    Hi! Here's my Tech Stack:
                    <br/> 
                    <span style={{fontWeight: "850"}}>Languages:</span> JavaScript, Python, TypeScript, SQL
                    <br/>
                    <span style={{fontWeight: "850"}}>Frameworks & Libraries:</span>  React.js, Next.js, Chakra UI, Framer Motion


                  </Text>
                </Box>

                <Box 
                flex="1"
                mt="5vh"
                color="white"
                display="flex"
                justifyContent={["center","center","left","left","left"]}
                gap="5"
                >
                  <Box display="flex">
                  <Image
                  width={["40px","50px","60px","70px","80px"]}
                  src={javascriptlogo.src}
                  />
                  <Image
                  width={["40px","50px","60px","70px","80px"]}
                  src={reactlogo.src}
                  />
                  <Image
                  width={["40px","50px","60px","70px","80px"]}
                  src={nextjs.src}
                  />
                  </Box>
                  <Box
                  display="flex"
                                  >
                    <Image
                    width={["40px","50px","60px","70px","80px"]}
                    src={pythonlogo.src}
                    />
                  <Image
                    width={["40px","50px","60px","70px","80px"]}
                    src={chakralogo.src}
                    />
                    <Image
                    width={["40px","50px","60px","70px","80px"]}
                    src={sqllogo.src}
                    />
                    <Image
                    width={["40px","50px","60px","70px","80px"]}
                    src={threejslogo.src}
                    />
                  </Box>
                </Box>
          </Box>
        </Box>
    </Box>
  );
};

export default BlockOne;
