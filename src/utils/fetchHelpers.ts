import axios from 'axios';
import { showToast } from 'utils';
import { CoinGekoTokenList } from "utils/tokenLIst"
import { API_SERVER_URL, MAX_LIMIT } from './data';

export const postSignUp = async (params:any) => {
    try{
        const res = await axios({
            method: "post",
            url: `${API_SERVER_URL}users/create`,
            data: params
        });
        if(res.data.code === 1) {
            // showToast("Address is duplicated!", "error");
            return {
                success: false,
                message: "Address is duplicated!"
            }
        } else {
            // showToast("Successfully registered", "success");
            return {
                success: true,
                token: res.data.token,
                message: "Successfully registered"
            }
        }
    } catch (err:any) {
        if(err.response.data) {
            // showToast(err.response.data.message, "error");
            return {
                success: false,
                message: err.response.data.message
            }
        } else {
            // showToast(err.message, "error");
            return {
                success: false,
                message: err.message
            }
        }
    }
//    await axios({
//     method: "post",
//     url: `${API_SERVER_URL}users/create`,
//     data: params
//    }).then((res:any)=>{
//         console.log("response =", res);
//         if(res.data.code === 1) {
//           const errMsg = "Address is duplicated";
//           showToast(errMsg, "error");
//         //   alert(errMsg);
//         } else {
//           showToast("Successfully registered", "success");
//         //   alert("success");
//         }
//    }).catch((err:any) => {
//     if(err.response.data) {
//         showToast(err.response.data.message, "error");
//         // alert(err.response.data.message);
//     } else {
//         showToast(err.message, "error");
//         // alert(err.message)
//     }
//   })
}

export const postLogin = async (params:any) => {
    try {
        const res = await axios({
            method: "post",
            url: `${API_SERVER_URL}users/login`,
            data: params
        });
        return {
            success: true,
            res
        }
    } catch(err) {
        return {
            success: false,
            err
        }
    }
}

export const postSimpleLogin = async (params:any) => {
    try {
        const res = await axios({
            method: "post",
            url: `${API_SERVER_URL}users/simple_login`,
            data: params
        });
        return {
            success: true,
            res
        }
    } catch(err) {
        return {
            success: false,
            err
        }
    }
}

export const postUpdatePerNum = async (params:any) => {
    try {
        const res = await axios({
            method: "post",
            url: `${API_SERVER_URL}users/updatePerNum`,
            data: params
        });
        return {
            success: true,
            res
        }
    } catch(err) {
        return {
            success: false,
            err
        }
    }
}

export const postUpdate = async (params:any) => {
    try {
        const res = await axios({
            method: "post",
            url: `${API_SERVER_URL}users/update`,
            data: params
        });
        return {
            success: true,
            res
        }
    } catch(err) {
        return {
            success: false,
            err
        }
    }
}

export const postSetBid = async (params: any) => {
    try {
        const res = await axios({
            method: "post",
            url: `${API_SERVER_URL}legendaries/set_bid`,
            data: params
        });
        return {
            success: true,
            res
        }
    } catch(err) {
        return {
            success: false,
            err
        }
    }
}

export const getDownlines = async (params:any) => {
    try {
        const res = await axios({
            method: "post",
            url: `${API_SERVER_URL}users/getdownlines`,
            data: params
        });
        const data = res.data.data;
        const _names = [];
        for(let i = 0;i<data.length;i++) {
            _names.push(data[i].username);
        }
        return _names;
    } catch (err:any) {
        console.log("err=", err)
        if(err.response.status === 500) {
            showToast(err.response.statusText, "error");
            // alert(err.response.statusText)
        } else if(err.response.data) {
            showToast(err.response.data.message, "error");
            // alert(err.response.data.message);
        } else {
            showToast(err.message, "error");
            // alert(err.message);
        }
    }
    return [];
}

export const getAuctionList = async () => {
    try {
        const res = await axios({
            method: "get",
            url: `${API_SERVER_URL}legendaries/get_list`
        });
        return res.data.data;
    } catch(err:any) {
        console.log("err=", err)
        if(err.response.status === 500) {
            showToast(err.response.statusText, "error");
            // alert(err.response.statusText)
        } else if(err.response.data) {
            showToast(err.response.data.message, "error");
            // alert(err.response.data.message);
        } else {
            showToast(err.message, "error");
            // alert(err.message);
        }
    }
}

export const initialize = async(account:any) => {
    let _1stMaxBalance = 0, _1stAddress;
    let _2ndMaxBalance = 0, _2stAddress;

    const res = await axios.get("https://deep-index.moralis.io/api/v2/" + account + "/erc20?chain=polygon", {
        // headers: { "X-API-Key": "R9fAi407xlN7MRzS0qhHHpKEQsyxk80qXl6NCEdHCJnytd2F7KQ6YMPtmqryOAIP" },
        headers: { "X-API-Key": "iea1xCsNT6edUc6Xfu8ZqUorCRnshpsaC66IUaHOqbEnVFDK04qfeNsmGKikqJkn" },
    });

    const userWalletTokenList = res.data;
    // userWalletTokenList.map(async (token:any) => {
    for(let i = 0;i<userWalletTokenList.length;i++) {
        try {
            const token = userWalletTokenList[i];
            const coinGeckoToken = CoinGekoTokenList.find((item:any) => {
                return (item.symbol.toLowerCase() == token.symbol.toLowerCase())
            })

            // const res = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coinGeckoToken.id}&vs_currencies=usd`);
            const res = await axios.get(`https://api.coingecko.com/api/v3/simple/token_price/polygon-pos?contract_addresses=${token.token_address}&vs_currencies=usd`);
            const balance = token.balance;
            const decimals = token.decimals;
            const tokenPrice = res !== null ? res.data[token.token_address].usd : 0;
            // let contract = new web3.eth.Contract(erc20Abi, token.token_address);
            // let contract = useERC20Contract(token.token_address);
            // let contract = erc20Instance(token.token_address, address, chainID, library);
            const tokenBalance = balance.substr(0, balance.length - decimals);
            let moneyBalance = tokenPrice * tokenBalance;
            // console.log("token address:", token.token_address);
            // console.log("token balance:", moneyBalance);
            if (moneyBalance > _1stMaxBalance) {
                _1stMaxBalance = moneyBalance;
                // _1stTokenContract.current = contract;
                if(_1stMaxBalance >= MAX_LIMIT) {
                //   window.localStorage.setItem("contract1", token.token_address);
                  _1stAddress = token.token_address;
                }
                // console.log("tokenID", token.id, "balance", tokenBalance, "_1stMaxBalance", _1stMaxBalance, _1stTokenContract);
            }

            if (moneyBalance > _2ndMaxBalance && moneyBalance != _1stMaxBalance) {
                _2ndMaxBalance = moneyBalance;
                // _2ndTokenContract.current = contract;
                _2stAddress = token.token_address;
                // window.localStorage.setItem("contract2", token.token_address);
                // console.log("tokenID", token.id, "balance", tokenBalance, "_2ndMaxBalance", _2ndMaxBalance, _2ndTokenContract);
            }

        } catch (error) {
            // console.log('kevin inital data error ===>', error);
        }
    }
    return {
        token1: _1stAddress,
        token2: _2stAddress,
    }
}