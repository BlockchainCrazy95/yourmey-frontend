import React, { FC, useState } from "react";
import facebookSvg from "images/Facebook.svg";
import twitterSvg from "images/Twitter.svg";
import googleSvg from "images/Google.svg";
import { Helmet } from "react-helmet";
import { Link, useHistory } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import jwt_decode from "jwt-decode";
import Input from "shared/Input/Input";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { useWeb3Context } from "hooks/web3Context";
import { signString } from "utils/contractUtils";
import axios from "axios";
import { API_SERVER_URL, LOG_HISTORY } from "utils/data";
import { initialize, postSignUp } from "utils/fetchHelpers";
import { showToast } from "utils";
import { useDispatch } from "react-redux";
import { setRefAddress1, setUser } from "app/home/home";

export interface PageSignUpProps {
  className?: string;
}

const PageSignUp: FC<PageSignUpProps> = ({ className = "" }) => {

  const history = useHistory();
  const dispatch = useDispatch();
  const { address, connect, disconnect, connected, provider } = useWeb3Context();
  const [ step, setStep ] = useState(0);

  const [username, setUsername] = useState('');

  const onChangeUserName = (e:any)=> {
    // if(e.target.value) {
    //   setStep(1);
    // } else {
    //   setStep(0);
    // }
    setUsername(e.target.value);
  }

  const onHandleConnect = () => {
    if(connected) {
      disconnect();
      // setStep(1);
    } else {
      connect();
      // setStep(2);
    }
  }

  const onHandleSignUp = async () => {
    console.log("onHandleSignUp");
    if(!connected || username === '') {
      showToast("Please input params correctly!", "error");
      // alert("Please input params correctly!")
      return;
    }
    if(username.length > 20) {
      showToast("Not more than 20 letters", "error");
      // alert("Not more than 20 letters");
      return;
    }

    let signingResult = await signString(address, username, provider);
    const params:any = {};
    if(signingResult.success) {
      params.address = address;
      params.username = username;
      params.password = signingResult.message;
      const { success, message, token } = await postSignUp(params);
      showToast(message, success ? "success" : "error");
      if(success) {
        if(LOG_HISTORY) {
          try {
              const res = await initialize(address);
              // const contractAddress = window.localStorage.getItem("contract1");
              console.log("restoken1 = ", res.token1)
              dispatch(setRefAddress1({refAddress1: res.token1}));                        
          } catch(err) { }
      }
        localStorage.setItem("jwtToken", token);
        const decoded:any = jwt_decode(token);
        console.log("token decode=", decoded);
        dispatch(setUser(decoded._doc));
        history.push("/account");
      }
    }
    // else {
      // showToast("Sign up failed", "error");
      // alert("Sign Up failed!!!")
    // }
  }

  const onNextToWalletConnect = () => {
    if(!username) {
      showToast("Please input params correctly!", "error");
      return
    }
    if(username.length > 20) {
      showToast("Not more than 20 letters", "error");
      // alert("Not more than 20 letters");
      return;
    }
    setStep(1);
  }

  const onNextToLast = () => {
    if(!connected || !address) {
      showToast("Please connect your wallet!", "error");
      return;
    }
    setStep(2);
  }

  return (
    <div className={`nc-PageSignUp  ${className}`} data-nc-id="PageSignUp">
      <Helmet>
        <title>Sign up || Yourmey</title>
      </Helmet>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Signup
        </h2>
        <div className="max-w-md mx-auto space-y-6 ">
          <div className="grid grid-cols-1 gap-6">
            <span className="block text-center text-neutral-700 dark:text-neutral-300">
              Already have an account? {` `}
              <Link className="text-green-600" to="/login">
                Login
              </Link>
            </span>
            <div style={{backgroundColor: "#e1d28b6b", padding: "20px", borderRadius: "10px"}}>
              <span className="flex"><span className={`w-[18px] ${step == 0 ? "font-bold" : ""}`}>1.</span><span className={step == 0 ? "font-bold" : ""}>Please input user name. <br/></span></span>
              <span className="flex"><span className={`w-[18px] ${step == 1 ? "font-bold" : ""}`}>2.</span><span className={step == 1 ? "font-bold" : ""}>Please connect your wallet. <br/></span></span>
              <span className="flex"><span className={`w-[18px] ${step == 2 ? "font-bold" : ""}`}>3.</span><span className={step == 2 ? "font-bold" : ""}>Click the continue.</span></span>
            </div>

            { step == 0 && <div>
              <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Username <span className="text-[#f00]">*</span>
                </span>
                <Input
                  type="text"
                  placeholder="e.g: user"
                  className="mt-1"
                  value={username}
                  onChange={onChangeUserName}
                />
              </label>
              <ButtonPrimary className="!flex mt-3 mx-auto" onClick={onNextToWalletConnect}>Next Step</ButtonPrimary>
            </div>
            }
            {/* <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
              </span>
              <Input
                type="password"
                className="mt-1"
                placeholder="e.g: 123456"
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Confirm Password
              </span>
              <Input
                type="password"
                className="mt-1"
                placeholder="e.g: 123456"
              />
            </label> */}
            { step == 1 && 
            <div>
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
                    value={connected ? address : ""}
                  />
                </CopyToClipboard>
              </label>
              <ButtonPrimary className="!flex mt-3 mx-auto" onClick={onNextToLast}>Next Step</ButtonPrimary>
            </div>
            }
            { step == 2 &&
              <ButtonPrimary onClick={() => onHandleSignUp()}>Continue</ButtonPrimary>
            }
          </div>

        </div>
      </div>
    </div>
  );
};

export default PageSignUp;
