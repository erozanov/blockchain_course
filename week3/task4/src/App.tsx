import {
  ChakraProvider,
  Box,
  SimpleGrid
} from "@chakra-ui/react"

import { ethers } from "ethers"

import { Web3ReactProvider } from "@web3-react/core"

import { Web3Test } from "./Web3Test"

const getLibrary = (provider: any) => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 8000; // frequency provider is polling
  return library;
};

export const App = () => 
   ( 
  <ChakraProvider>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Box textAlign="center" fontSize="xl">
        <SimpleGrid minH="10vh" p={3} spacing="50px" ml='auto' mr='auto'>
        Web3 Samara token test
        <Web3Test/>
        </SimpleGrid>
      </Box>
      </Web3ReactProvider>
  </ChakraProvider>
  )

