import React, { FC, useEffect, useState } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Helmet } from "react-helmet";
import Label from "components/Label/Label";
import Input from "shared/Input/Input";
import NcModal from "shared/NcModal/NcModal";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import NcImage from "shared/NcImage/NcImage";
import QrCodeImg from "images/qr-code.png";
import metamaskImg from "images/metamask.webp";
import walletconnectImg from "images/walletconnect.webp";
import walletlinkImg from "images/walletlink.webp";
import fortmaticImg from "images/fortmatic.webp";
import { useWeb3Context } from "hooks/web3Context";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/store";
import { showToast } from "utils";
import { getNumberOfUsers, getUserBalance, postUpdateYEMBalance } from "utils/fetchHelpers";
import { setUser } from "app/home/home";

export interface PageAdminPanelProps {
  className?: string;
}

const plans = [
  {
    name: "Metamask",
    img: metamaskImg,
  },
  {
    name: "Walletconnect",
    img: walletconnectImg,
  } /*,
  {
    name: "Walletlink",
    img: walletlinkImg,
  },
  {
    name: "Fortmatic",
    img: fortmaticImg,
  }, */
];
const PageAdminPanel: FC<PageAdminPanelProps> = ({ className = "" }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user } = useSelector((state:RootState) => state.home);

  const [ numberOfUsers, setNumberOfUsers ] = useState<any>("120");
  const [ username, setUsername ] = useState<any>("");
  const [ balance, setBalance ] = useState<any>("0.0");
  const [ userBalance, setUserBalance ] = useState<any>("0.0");
  const [ timerId, setTimerId ] = useState<any>();

  useEffect(() => {
    if(!user || !user.verified) {
      history.push("/");
      return;
    }
    const loadData = async () => {
      const resNumberOfUsers = await getNumberOfUsers();
      if(resNumberOfUsers.success) {
        setNumberOfUsers(resNumberOfUsers.numberOfUsers);
      } else {
        setNumberOfUsers("0");
      }
    }
    loadData();
  }, []);

  // useEffect(() => {
  //   const loadBalance = async () => {
  //     if(!username) {
  //       setUserBalance(0);
  //       return;
  //     }
  //     const resUserBalance = await getUserBalance({ username })
  //     console.log("resUserBalance=", resUserBalance)
  //     setUserBalance(resUserBalance.balance);
  //   }
  //   if(timerId) {
  //     clearTimeout(timerId);
  //   }
  //   timerId = setTimeout(() => {
  //     loadBalance();
  //   }, 2000);
  //   console.log('timerId=', timerId);
  // }, [ username])

  const checkParametersForYEM = (isAdd = true) => {
    if(username.length > 20) {
      showToast("Not more than 20 letters!", "error");
      return false;
    }
    const _balance = parseFloat(balance);
    if(Number.isNaN(_balance) || _balance == 0) {
      showToast("Please input balance correctly!", "error");
      return false;
    }
    setBalance(_balance);

    return true;
  }

  const onClickYEMAdd = async () => {
    console.log("onClickYEMAdd")
    if(!checkParametersForYEM()) return;
    const params:any = {
      id: user._id,
      yem: parseFloat(userBalance) + parseFloat(balance)
    }
    try {
      const { success, res }:any = await postUpdateYEMBalance(params);
      // console.log("res = ", res);
      if(success) {
        showToast(res.data.message, "success");
        dispatch(setUser({...user, yem: params.yem}));
        setUserBalance(parseFloat(userBalance) + parseFloat(balance));
      } else {
        showToast(res.data.message, "error");
      }
    } catch (err) {
      console.log("onClickYEMAdd error=", err);
      showToast(err, "error");
    }
  }

  const onClickYEMRemove = async () => {
    console.log("onClickYEMRemove")
    if(!checkParametersForYEM(false)) return;
    if(parseFloat(userBalance) - parseFloat(balance) < 0) {
      showToast("Cannot remove that amount!", "error");
      return;
    }
    const params:any = {
      id: user._id,
      yem: parseFloat(userBalance) - parseFloat(balance)
    }
    try {
      const { success, res }:any = await postUpdateYEMBalance(params);
      // console.log("res = ", res);
      if(success) {
        showToast(res.data.message, "success");
        dispatch(setUser({...user, yem: params.yem}));
        setUserBalance(parseFloat(userBalance) - parseFloat(balance));
      } else {
        showToast(res.data.message, "error");
      }
    } catch (err) {
      console.log("onClickYEMRemove error=", err);
      showToast(err, "error");
    }
  }

  const onChangeUserName = async (e:any) => {
    e.preventDefault();
    if(timerId) {
      clearTimeout(timerId);
    }
    setTimerId(
      setTimeout(async () => {
        if(!e.target.value) {
          setUserBalance(0);
          return;
        }
        const resUserBalance = await getUserBalance({ username: e.target.value })
        // console.log("username=", e.target.value, "resUserBalance=", resUserBalance)
        if(resUserBalance.success)
          setUserBalance(resUserBalance.balance);
        else
          setUserBalance(-1);
      }, 1000)
    )
    setUsername(e.target.value);
  }

  return (
    <div
      className={`nc-PageAdminPanel ${className}`}
      data-nc-id="PageAdminPanel"
    >
      <Helmet>
        <title>Dashboard || YEMNATION</title>
      </Helmet>
      <div className="container">
        <div className="my-12 sm:lg:my-16 lg:my-24">
          {/* HEADING */}
          <div className="max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-semibold">
              Dashboard
            </h2>
            <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
              You can see the overview of our platform here.
            </span>
          </div>
          <div className="w-full border-b-2 border-neutral-200 mt-2"></div>
          <div className="mt-30 space-y-5 sm:space-y-6 md:sm:space-y-8">
            <div id="Overview">
              <div className="flex mt-5">
                <Label>Number of Users: <span className="text-2xl">{numberOfUsers}</span></Label>
              </div>
            </div>
            <div className="w-full border-b-2 border-neutral-200 mt-2"></div>
            <div id="AddRemoveYEM">
              <div className="flex">
                <div className="flex-1 px-7">
                    <Label>Username</Label>
                    <Input className="mt-1.5" placeholder="username" onChange={onChangeUserName} value={username}/>
                    <span className="block text-neutral-500 px-5 pt-2">{userBalance == -1 ? "Not found" : `Balance: ${userBalance}`}</span>
                </div>
                <div className="flex-1 px-7">
                    <Label>YEM Balance</Label>
                    <Input className="mt-1.5" onChange={(e) => setBalance(e.target.value)} value={balance}/>
                </div>
              </div>
              <div className="mt-5">
                <ButtonPrimary className="mx-5" onClick={onClickYEMAdd}> Add </ButtonPrimary>
                <ButtonPrimary className="mx-5" onClick={onClickYEMRemove}> Remove </ButtonPrimary>
              </div>
            </div>
          
            {/* ---- */}
            <div className="pt-2 ">
              <ButtonPrimary className="flex-1" onClick={() => history.goBack()}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9.57 5.92993L3.5 11.9999L9.57 18.0699"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20.5 12H3.67004"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span className="ml-2">Go Back</span>
              </ButtonPrimary>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageAdminPanel;
