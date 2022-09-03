import React, { useState, ReactElement, useContext, useEffect, useMemo, useCallback } from "react";
import Web3Modal from "web3modal";
import { StaticJsonRpcProvider, JsonRpcProvider, Web3Provider, WebSocketProvider } from "@ethersproject/providers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { CHAIN_ID, MAINNET_ID, RPC_URL, TESTNET_ID } from "../utils/data";
import { changeNetwork } from "hooks";
import { ethers } from "ethers";

/**
 * kept as function to mimic `getMainnetURI()`
 * @returns string
 */
function getTestnetURI():string {
  return RPC_URL[TESTNET_ID];
}

function getMainnetURI():string {
  return RPC_URL[MAINNET_ID];
}

const web3Modal = new Web3Modal({
    // network: "mainnet", // optional
    cacheProvider: true, // optional
    providerOptions: {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          rpc: {
            137: getMainnetURI(),
            4: getTestnetURI(),
          },
        },
      },
    },
})


/*
  Types
*/
type onChainProvider = {
  connect: () => void;
  disconnect: () => void;
  provider: any;
  address: string;
  connected: Boolean;
  web3Modal: Web3Modal;
  chainID: any
};

export type Web3ContextData = {
  onChainProvider: onChainProvider;
} | null;

const Web3Context = React.createContext<Web3ContextData>(null);

export const useWeb3Context = () => {
  const web3Context = useContext(Web3Context);
  if (!web3Context) {
    throw new Error(
      "useWeb3Context() can only be used inside of <Web3ContextProvider />, " + "please declare it at a higher level.",
    );
  }
  const { onChainProvider } = web3Context;
  return useMemo(() => {
    return { ...onChainProvider };
  }, [web3Context]);
};

export const useAddress = () => {
  const { address } = useWeb3Context();
  return address;
};

export const Web3ContextProvider: React.FC<{ children: ReactElement }> = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [chainID, setChainID] = useState(CHAIN_ID);
  const [address, setAddress] = useState("");
  const [provider, setProvider] = useState<any>(RPC_URL[CHAIN_ID]);

  const hasCachedProvider = (): Boolean => {
    if (!web3Modal) return false;
    if (!web3Modal.cachedProvider) return false;
    return true;
  };

  const subscribeProvider = useCallback((provider:any) => {
    setProvider(provider);
    
    provider.on("disconnect", (error: any) => {
      setChainID(0);
      setAddress("");
    });
    provider.on("accountsChanged", (accounts: string[]) => {
      setAddress(accounts[0]);
    });
    provider.on("chainChanged", async (chainId: number) => {
      const isValid = _checkNetwork(chainId);
      if(!isValid) {
        changeNetwork();
      }
    })

  }, [provider])

  // NOTE (appleseed): none of these listeners are needed for Backend API Providers
  // ... so I changed these listeners so that they only apply to walletProviders, eliminating
  // ... polling to the backend providers for network changes
  /**
   * throws an error if networkID is not 1 (mainnet) or 4 (rinkeby)
   */
  const _checkNetwork = (otherChainID: number): Boolean => {
    if (chainID !== otherChainID) {
      console.warn("You are switching networks", otherChainID);
      // if (otherChainID === MAINNET_ID || otherChainID === TESTNET_ID) {
      if (otherChainID === CHAIN_ID) {
        setChainID(otherChainID);
        return true;
      }
      return false;
    }
    return true;
  };

  // connect - only runs for WalletProviders
  const connect = useCallback(async () => {
    const _rawProvider = await web3Modal.connect();
    // new _initListeners implementation matches Web3Modal Docs
    // ... see here: https://github.com/Web3Modal/web3modal/blob/2ff929d0e99df5edf6bb9e88cff338ba6d8a3991/example/src/App.tsx#L185
    subscribeProvider(_rawProvider);

    const connectedProvider = new Web3Provider(_rawProvider, "any");

    const chainId = await connectedProvider.getNetwork().then((network:any) => network.chainId);
    const connectedAddress = await connectedProvider.getSigner().getAddress();
    const validNetwork = _checkNetwork(chainId);
    if (!validNetwork) {
      console.error("Wrong network, please switch to mainnet");
      changeNetwork();
      return;
    }
    // Save everything after we've validated the right network.
    // Eventually we'll be fine without doing network validations.
    setAddress(connectedAddress);

    // Keep this at the bottom of the method, to ensure any repaints have the data we need
    setConnected(true);

    return connectedProvider;
  }, [provider, web3Modal, connected]);

  const disconnect = useCallback(async () => {
    console.log("disconnecting");
    web3Modal.clearCachedProvider();
    setConnected(false);
    setAddress("");
  }, [provider, web3Modal, connected]);

  useEffect(() => {
    if(web3Modal.cachedProvider) {
      connect();
    } else {
      const _provider = new ethers.providers.StaticJsonRpcProvider(RPC_URL[CHAIN_ID], CHAIN_ID);
      setProvider(_provider);
      subscribeProvider(_provider);
    }
  }, [])

  const onChainProvider = useMemo(
    () => ({ connect, disconnect, hasCachedProvider, provider, connected, address, chainID, web3Modal }),
    [connect, disconnect, hasCachedProvider, provider, connected, address, chainID],
  );

  return <Web3Context.Provider value={{ onChainProvider }}>{children}</Web3Context.Provider>;
};
