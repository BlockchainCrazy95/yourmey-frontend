import axios from 'axios';
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
          alert(errMsg);
        } else {
          alert("success");
        }
   }).catch((err:any) => {
    if(err.response.data) {
        alert(err.response.data.message);
    } else {
        alert(err.message)
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

export const getDownlines = async (params:any) => {
    try {
        const res = await axios({
            method: "post",
            url: `${API_SERVER_URL}users/getdownlines`,
            data: params
        });
        console.log('res = ', res)
        const data = res.data.data;
        const _names = [];
        for(let i = 0;i<data.length;i++) {
            _names.push(data[i].username);
        }
        return _names;
    } catch (err:any) {
        console.log("err=", err)
        if(err.response.status === 500) {
            alert(err.response.statusText)
        } else if(err.response.data) {
            alert(err.response.data.message);
        } else {
            alert(err.message);
        }
    }
    return [];
}