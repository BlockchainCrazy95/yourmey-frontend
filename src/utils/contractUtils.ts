import Web3 from "web3";
import { SIGN_PASSWORD } from "./data";

export const signString = async (data:string, password:string) => {
    const web3 = new Web3(Web3.givenProvider);
    const address = data;
    const msgHash = web3.utils.keccak256(data);
    let signedString = "";
    try {
        await web3.eth.personal.sign(web3.utils.toHex(msgHash), address, SIGN_PASSWORD, (err:any, result:any) => {
            if(err) {
                console.error(err);
                return {
                    success: false,
                    message: err
                }
            }
            signedString = result;
            // console.log("Signed:", result);
            
            // const signature = result;
            // const r = signature.slice(0, 66);
            // const s = "0x" + signature.slice(66, 130);
            // const v = parseInt(signature.slice(130, 132), 16);
            // console.log({ r, s, v });
        })
        return {
            success: true,
            message: signedString
        }
    } catch (err:any) {
        return {
            success: false,
            message: err.message
        }
    }
}