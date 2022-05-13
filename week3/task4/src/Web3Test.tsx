import { FC, useEffect, useState } from 'react'
import {
  Box,
  Button,
  VStack
} from '@chakra-ui/react'
import { useWeb3React } from "@web3-react/core";
import { connectors } from "./connectors";
import Web3 from 'web3';
// import { AbiItem } from 'web3-utils';
import SAMARAERC20ABI from './samara-erc20-api.json'
import BigNumber from 'bignumber.js';
import { web3BNToFloatString } from './utils';

export const Web3Test: FC = () => {
    
  const { 
    activate, 
    deactivate, 
    active, 
    account, 
    library,
    chainId,
  } = useWeb3React();

  const SAMARA_TOKEN_ADDRESS = '0xe839F11F9BcA5b30a67CD85677a9FA826BF3848F';
  
  const [balance, setBalance]= useState("");

  const setProvider = (type: string) => {
    window.localStorage.setItem("provider", type);
  }

  const getContract = (library: any, abi: any, address: string) => {
    const web3 = new Web3(library.provider);
  return new web3.eth.Contract(abi, address)
  }
    
  const connect = () => {
    activate(connectors.injected);
    setProvider("injected");
  }

  const disconnect = () => {
    refreshState();
    deactivate();
  }

  const refreshState = () => {
    window.localStorage.removeItem("provider");
    setBalance("")
  };

  const onError = (error: Error) => {
    console.log(error);
  }

  const getBalance = (address: string) => {
     const contract = getContract(library, SAMARAERC20ABI, address);
     contract.methods.balanceOf(account).call().then((_balance: number) => {
        const pow = new BigNumber('10').pow(new BigNumber(8));
        setBalance(web3BNToFloatString(_balance, pow, 18, BigNumber.ROUND_DOWN));
      })
  }

  useEffect(() => {
    if (account) {
        getBalance(SAMARA_TOKEN_ADDRESS);
    }
  }, [account, chainId]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const provider = window.localStorage.getItem("provider");
    if (provider) {
      activate(connectors[provider], onError);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
   <VStack>
       {!active ? 
              <Button onClick={connect}>Connect to metamask</Button>
              :
               <Button onClick={disconnect}>Disconnect from metamask</Button>
       }
       <Box>{ balance }</Box>
   </VStack>
  ) 
}
