import React, { FC } from "react";
import facebookSvg from "images/Facebook.svg";
import twitterSvg from "images/Twitter.svg";
import googleSvg from "images/Google.svg";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Input from "shared/Input/Input";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { useWeb3Context } from "hooks/web3Context";

export interface PageSignUpProps {
  className?: string;
}

const PageSignUp: FC<PageSignUpProps> = ({ className = "" }) => {

  const { address, connect, disconnect, connected } = useWeb3Context();

  const onHandleConnect = () => {
    if(connected) {
      disconnect();
    } else {
      connect();
    }
  }

  const onHandleSignUp = () => {
    console.log("onHandleSignUp");
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
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Username <span className="text-[#f00]">*</span>
              </span>
              <Input
                type="text"
                placeholder="e.g: user"
                className="mt-1"
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
                <Link to="/forgot-pass" className="text-sm text-green-600 hover:text-green-400 hover:underline hover:underline-offset-4">
                  Forgot password?
                </Link>
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
            </label>
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
            <ButtonPrimary onClick={() => onHandleSignUp()}>Continue</ButtonPrimary>
          </div>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Already have an account? {` `}
            <Link className="text-green-600" to="/login">
              Sign in
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageSignUp;
