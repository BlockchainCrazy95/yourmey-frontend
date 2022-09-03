import { ethers } from "ethers";
import { showToast } from "utils";

export const getAccountName = async (contract:any, addr:string) => {
    return await contract.methods.getAccountName(addr).call();
}

export const getChildCounts = async (contract:any, addr:string) => {
    return await contract.methods.getChildCounts(addr).call();
}

export const getLevelOnes = async (contract:any, addr:string) => {
    return await contract.methods.getLevelOnes(addr).call();
}

export const getParent = async (contract:any, addr:string) => {
    return await contract.methods.getParent(addr).call();
}

export const getParentName = async (contract:any, addr:string) => {
    return await contract.methods.getParentName(addr).call();
}

export const setAccountName = async (contract:any, addr:string, name:string) => {
    await contract.methods.setAccountName(addr, name).send({from: addr, maxPriorityFeePerGas: "52000000000"});
}

export const setParent = async (contract:any, child:string, parent:string, name:string) => {
    try {
        const amount = ethers.utils.parseEther("0.01");
        // console.log("amount = ", amount)
        showToast("Please wait 1 minute to be an affiliate-partner because of blockchain!", "error");
        await contract.methods.setParent(child, parent, name).send({from: child, value: amount, maxPriorityFeePerGas: "52000000000"});
        return {
            success: true,
            message: "Great, now you're an affiliate-partner!"
        }
    } catch(err:any) {
        return {
            success: false,
            message: err.message
        }
    }
}