// pages/_app.tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, Box } from '@chakra-ui/react';
import { useEffect } from "react";
// import Navbar from '../components/NavBar/NavBar'; 
// import Footer from "@/components/Footer/Footer";
import Waves from '../components/assets/ThreeJS/Waves'

export default function App({ Component, pageProps }: AppProps) {

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.log('Service Worker registration failed:', error);
        });
    }
  }, []);
  
  return (


  
    <ChakraProvider
    >
              <Box 
              // bg="#121212"
        
        // border="2px solid red"
        zIndex={0}
        position="absolute"
        >
            <Waves />
        </Box>

        {/* <Navbar />  */}
        <Box 
        
        
        bg="#121212"
        px="10%"
        >
          <Component {...pageProps} />
        </Box>

    </ChakraProvider>
  );
}
