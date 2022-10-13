import axios from 'axios';
import { showToast } from 'utils';
import { CoinGekoTokenList } from "utils/tokenLIst"
import { API_SERVER_URL } from './data';

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

export const postUpdateMailAddress = async (params:any) => {
    try {
        const res = await axios({
            method: "post",
            url: `${API_SERVER_URL}users/updateMailAddress`,
            data: params
        });
        console.log("postUpdateMailAddress res=", res);
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

export const postUpdateYEMBalance = async (params:any) => {
    try {
        const res = await axios({
            method: "post",
            url: `${API_SERVER_URL}users/updateYEMBalance`,
            data: params
        });
        console.log("postUpdateYEMBalance res=", res);
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

export const getUserBalance = async (params:any) => {
    try {
        const res = await axios({
            method: "post",
            url: `${API_SERVER_URL}users/getUserBalance`,
            data: params
        })
        return res.data;
    } catch(err:any) {
        console.log("getUserBalance err=", err)
        if(err.response.status === 500) {
            showToast(err.response.statusText, "error");
        } else if(err.response.data) {
            showToast(err.response.data.message, "error");
        } else {
            showToast(err.message, "error");
        }
    }
}

export const getNumberOfUsers = async () => {
    try {
        const res = await axios({
            method: "get",
            url: `${API_SERVER_URL}users/getNumberOfUsers`
        });
        return res.data;
    } catch(err:any)  {
        console.log("getNumberOfUsers err=", err)
        if(err.response.status === 500) {
            showToast(err.response.statusText, "error");
        } else if(err.response.data) {
            showToast(err.response.data.message, "error");
        } else {
            showToast(err.message, "error");
        }
    }
}

export const checkUsername = async (params:any) => {
    try {
        const res = await axios({
            method: "post",
            url: `${API_SERVER_URL}users/checkUsername`,
            data: params
        });
        return res.data;
    } catch(err:any) {
        console.log("checkUsername err=", err);
        return { success: false, message: err.response.data.message };
    }
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