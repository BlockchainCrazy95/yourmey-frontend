import { setUser } from "app/home/home";
import React, { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import MyRouter from "routers/index";
import { useLocation } from "react-router-dom";
import Web3 from 'web3';



function App() {
  const dispatch = useDispatch();
    
  useEffect(() => {
    const jwtToken = window.localStorage.getItem("jwtToken");
    if(jwtToken) {
      const decoded:any = jwt_decode(jwtToken);
      console.log("token decode=", decoded);
      dispatch(setUser(decoded._doc));
    }    
  }, [])

  return (
    <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
      <MyRouter />
    </div>
  );
}

export default App;
