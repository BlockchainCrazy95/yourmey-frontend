import { ethers } from "ethers";

export const ellipseAddress = (address:string) => {
    return address.slice(0, 6) + "..." + address.slice(-4);
}

export const displayEther = (price:any) => {
    return ethers.utils.formatEther(price);
}

export const displayFixed = (value:any, fixed:any) => {
      return Number(displayEther(value)).toFixed(fixed);
}

export const isNullAddress = (address:any) => {
    return address === "0x0000000000000000000000000000000000000000" || address === "";
}