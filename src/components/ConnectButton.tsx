import React, { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { useAppDispatch } from 'app/hooks';
import { useWeb3Context } from 'hooks/web3Context';
import { useContract } from 'hooks';
import ButtonPrimary from 'shared/Button/ButtonPrimary';
import { ellipseAddress, isNullAddress, showToast } from 'utils';
import ModalNotification from 'components/ModalNotification';
import { postSimpleLogin } from 'utils/fetchHelpers';
import { logout, setUser } from 'app/home/home';
import { getParent } from 'contracts/affiliateHelper';
import { useSelector } from 'react-redux';
import { RootState } from 'app/store';

export interface ConnectButtonProps {

}

const ConnectButton:FC<ConnectButtonProps> = (props) => {
    const dispatch = useAppDispatch();
    const history = useHistory();

    const { user } = useSelector((state:RootState) => state.home);
    const { address, connect, disconnect, connected, chainID } = useWeb3Context();
    const [ isShow, setIsShow ] = useState(false);
    const [ isPending, setIsPending ] = useState(-1);
    const { affiliateContract } = useContract();

    const openModal = () => setIsShow(true);
    const closeModal = () => {
        history.push("/");
        setIsShow(false);
    }

    const login = async () => {
        try {
            const params:any = { 
                address
            };
            const { success, res, err }:any = await postSimpleLogin(params);
            if(success) {
                const token = res.data.token;
                localStorage.setItem("jwtToken", res.data.token);
                const decoded:any = jwt_decode(token);
                // console.log("token decode=", decoded);
                dispatch(setUser(decoded._doc));
                setIsPending(1);
                // console.log("address = ", address)
                const _parent = await getParent(affiliateContract, address);
                if(isNullAddress(_parent))
                    openModal();
                else {
                    showToast("Successfully logged in!", "success");
                    history.push("/");
                }
            } else {
                if(err.response.data) {
                    showToast(err.response.data.message, "error");
                } else {
                    showToast(err.message, "error");
                }
                setIsPending(-1);
                disconnect();
            }
        } catch (err: any) {
            showToast(err.message, "error");
            setIsPending(-1);
            disconnect();
        }
    }

    useEffect(() => {
        if(address) {
            if(isPending !== -1)
                login();
        } else {
            if(isPending !== -1) {
                disconnect();
            }
        }
    }, [address, isPending]);

    const onHandleConnect = async () => {
        // console.log("onHandleConnect address=", address, "isPending = ", isPending)
        try {
            setIsPending(0);
            await connect();
            
        } catch (err:any) {
            showToast(err.message, "error");
            setIsPending(-1);
            disconnect();
        }
    }

    const onHandleDisconnect = () => {
        if(connected) {
            // console.log("disconnect 2222222")
            disconnect();
            dispatch(logout());
            setIsPending(-1);
        }
    }


    return <>
        {user ?
            <ButtonPrimary sizeClass="px-4 py-2 sm:px-5 w-165" onClick={onHandleDisconnect}>{ ellipseAddress(address)} </ButtonPrimary> :
            <ButtonPrimary sizeClass="px-4 py-2 sm:px-5 w-165" onClick={onHandleConnect}>{isPending === 0 ? "Connecting..." :"Connect Wallet"} </ButtonPrimary>
        }
        <ModalNotification show={isShow} onCloseModalNotification={closeModal} />
    </>
}

export default ConnectButton;