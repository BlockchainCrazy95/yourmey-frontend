import axios from 'axios';
import { showToast } from 'utils';
import { API_SERVER_URL } from './data';

export const postSignUp = async (params:any) => {
   await axios({
    method: "post",
    url: `${API_SERVER_URL}users/create`,
    data: params
   }).then((res:any)=>{
        console.log("response =", res);
        if(res.data.code === 1) {
          const errMsg = "Address is duplicated";
          showToast(errMsg, "error");
        //   alert(errMsg);
        } else {
          showToast("Successfully registered", "success");
        //   alert("success");
        }
   }).catch((err:any) => {
    if(err.response.data) {
        showToast(err.response.data.message, "error");
        // alert(err.response.data.message);
    } else {
        showToast(err.message, "error");
        // alert(err.message)
    }
  })
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