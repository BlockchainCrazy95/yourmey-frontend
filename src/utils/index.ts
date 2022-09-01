import { ethers } from "ethers";
import { toast } from "react-toastify";

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

export const showToast = (content:any, type:string = "error") => {
    switch(type) {
    case "info":
        toast.info(content, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
        });
        break;
    case "success":
        toast.success(content, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
        });
        break;
    case "warning":
        toast.warning(content, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
        });
        break;
    case "error":
        toast.error(content, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
        });
        break;
    }
}

export const isPerNum = (pernum:string) => {
    const _nums:any = pernum.match("/[^0-9]/g");
    return pernum.length === 10 && _nums === null;
}