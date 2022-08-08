import Web3 from 'web3';
import { CHAIN_ID, RPC_URL } from "utils/data";


export const changeNetwork = async() => {
    if(window.ethereum) {
        console.log("changeNetwork: chainId = ", CHAIN_ID)
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: Web3.utils.toHex(`${CHAIN_ID}`)}]
            })
        } catch(err: any) {
            if(err.code === 4902) {
                console.log("add")
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            chainName: 'Polygon',
                            chainId: Web3.utils.toHex(`${CHAIN_ID}`),
                            nativeCurrency: {
                                name: 'MATIC',
                                decimals: 18,
                                symbol: 'MATIC'
                            },
                            rpcUrls: [RPC_URL[CHAIN_ID]]
                        }
                    ]
                })
            }
        }
    }
}