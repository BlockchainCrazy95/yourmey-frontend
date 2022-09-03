import { createContext, useEffect, useState } from "react";
import Web3 from "web3";
import affiliateAbi from "contracts/abis/affiliateAbi.json";
import { useWeb3Context } from "hooks/web3Context";
import { affiliateContractAddr } from "utils/data";

export const ContractContext = createContext({
    affiliateContract: null,
    web3: null,
    // fromWei: () => null,
    // toWei: () => null
});

export const ContractProvider = ({ children } : any) => {
    const [ affiliateContract, setAffiliateContract ] = useState(null);
    const [ web3, setWeb3] = useState<any>(null);
    const [ wrongNetwork, setWrongNetwork ] = useState(false);
    const { chainID, provider } = useWeb3Context();

    useEffect(() => {
        if(!chainID) {
            return;
        }
        const web3Instance = new Web3();
        web3Instance.setProvider(provider);
        setWeb3(web3Instance);
        // @ts-ignore
        const _affiliateContract:any = new web3Instance.eth.Contract(affiliateAbi, affiliateContractAddr);
        setAffiliateContract(_affiliateContract);
    }, [chainID, provider])

    // const fromWei = (wei:any, unit:any = "ether") => parseFloat(Web3.utils.fromWei(wei, unit)).toFixed(3);
    // const toWei = (amount:any, unit:any = "ether") => Web3.utils.toWei(amount, unit);

    return <ContractContext.Provider
        value={{ web3, affiliateContract /* , fromWei, toWei */}}
    >
        {children}
    </ContractContext.Provider>
}