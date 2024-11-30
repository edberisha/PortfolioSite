// pages/_app.tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, Box } from '@chakra-ui/react';
import { useEffect } from "react";
import { useRouter } from "next/router"; // Import useRouter from next/router
import Waves from '../components/assets/ThreeJS/Waves'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter(); // Initialize the router

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

  // Skip rendering Waves component for the /threejs page
  const shouldRenderWaves = router.pathname !== "/threejs"; 

  return (
    <ChakraProvider>
      {shouldRenderWaves && (
        <Box zIndex={0} position="absolute">
          <Waves />
        </Box>
      )}

      <Box bg="#121212" px="10%">
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  );
}
