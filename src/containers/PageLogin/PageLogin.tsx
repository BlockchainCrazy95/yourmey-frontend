import React, { FC, useState } from "react";
import facebookSvg from "images/Facebook.svg";
import twitterSvg from "images/Twitter.svg";
import googleSvg from "images/Google.svg";
import { Helmet } from "react-helmet";
import { Link, useHistory } from "react-router-dom";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import jwt_decode from "jwt-decode";
import Input from "shared/Input/Input";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { useWeb3Context } from "hooks/web3Context";
import axios from "axios";
import { API_SERVER_URL } from "utils/data";
import { signString } from "utils/contractUtils";
import { useAppDispatch } from "app/hooks";
import { setUser } from "app/home/home";
import { postLogin } from "utils/fetchHelpers";
import ModalNotification from "components/ModalNotification";
import { showToast } from "utils";

export interface PageLoginProps {
  className?: string;
}

// const loginSocials = [
//   {
//     name: "Continue with Facebook",
//     href: "#",
//     icon: facebookSvg,
//   },
//   {
//     name: "Continue with Twitter",
//     href: "#",
//     icon: twitterSvg,
//   },
//   {
//     name: "Continue with Google",
//     href: "#",
//     icon: googleSvg,
//   },
// ];

const PageLogin: FC<PageLoginProps> = ({ className = "" }) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { address, connect, disconnect, connected } = useWeb3Context();
  const [username, setUsername] = useState('');
  const [ isShow, setIsShow ] = useState(false);

  const openModal = () => setIsShow(true);
  const closeModal = () => {
    history.push("/");
    setIsShow(false);
  }

  const onHandleConnect = () => {
    if(connected) {
      disconnect();
    } else {
      connect();
    }
  }

  const onHandleLogin = async () => {
    console.log("HandleLogin")
    if(username === '') {
      showToast("Please add Username!", "error");
      return;
    }
    if(!connected) {
      showToast("Please connect wallet!", "error");
      return;
    }
    if(username.length > 20) {
      showToast("Not more than 20 letters", "error");
      // alert("Not more than 20 letters");
      return;
    }
    const signingResult = await signString(address, username);
    const params: any = {};

    if(signingResult.success === true) {
      params.address = address;
      params.username = username;
      params.password = signingResult.message;
      const {success, res, err}:any = await postLogin(params);
      if(success) {
          const token = res.data.token;
          localStorage.setItem("jwtToken", res.data.token);
          const decoded:any = jwt_decode(token);
          console.log("token decode=", decoded);
          dispatch(setUser(decoded._doc));
          // history.push("/");
          openModal();
          // if(decoded.id)
          // dispatch(getDetailedUserInfo(decoded.id))
      } else {
        console.log("err=", err)
        if(err.response.data) {
          showToast(err.response.data.message, "error");
          // alert(err.response.data.message);
        } else {
          showToast(err.message, "error");
          // alert(err.message)
        }
      }
    } else {
      showToast("Login failed!", "error");
      // alert("Login failed!");
    }
  }

  return (
    <div className={`nc-PageLogin ${className}`} data-nc-id="PageLogin">
      <Helmet>
        <title>Login || Yourmey</title>
      </Helmet>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Login
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Username <span className="text-[#f00]">*</span>
              </span>
              <Input
                type="text"
                placeholder="e.g: user"
                className="mt-1"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            {/* <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
                <Link to="/forgot-pass" className="text-sm text-green-600 hover:text-green-400 hover:underline hover:underline-offset-4">
                  Forgot password?
                </Link>
              </span>
              <Input type="password"
                className="mt-1"
                placeholder="e.g: 123456"
              />
            </label> */}
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                <span>Address <span className="text-[#f00]">*</span></span>
                <span className="text-sm text-green-600 hover:text-green-400 hover:underline hover:underline-offset-4 cursor-pointer" onClick={() => onHandleConnect()}>{connected? "Disconnect" : "Wallet Connect"}</span>
              </span>
              <CopyToClipboard
                text={address}
              >
                <Input
                  type="text"
                  placeholder="e.g: 0x0000000000000000000000000000000000000000"
                  className="mt-1 cursor-pointer"
                  readOnly
                  value={address}
                />
              </CopyToClipboard>
            </label>
            <ButtonPrimary type="submit" onClick={() => onHandleLogin()}>Continue</ButtonPrimary>
          </div>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            New user? {` `}
            <Link className="text-green-600" to="/signup">
              Create an account
            </Link>
          </span>
        </div>
      </div>
      <ModalNotification show={isShow} onCloseModalNotification={closeModal} />
    </div>
  );
};

export default PageLogin;
