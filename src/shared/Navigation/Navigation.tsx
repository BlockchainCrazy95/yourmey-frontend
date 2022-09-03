import React from "react";
import NavigationItem from "./NavigationItem";
import { NAVIGATION_DEMO_2, SIGNED_INDEXES } from "data/navigation";
import { useSelector } from "react-redux";
import { RootState } from "app/store";
import { useLocation } from "react-router-dom";

function Navigation() {
  const location = useLocation();
  const { user } = useSelector((state:RootState) => state.home);
  const isLogged = user !== null;
  const isAccount = location.pathname === "/account";
  console.log("isAccount = ", isAccount)

  return (
    <ul className="nc-Navigation hidden lg:flex lg:flex-wrap lg:items-center lg:space-x-1 relative">
      {NAVIGATION_DEMO_2.map((item, index) => (
        // (isAccount && [2, 3].indexOf(index) !== -1 || (isLogged && SIGNED_INDEXES.indexOf(index) !== -1)) ? <NavigationItem key={item.id} menuItem={item} /> : <div key={item.id}>{" "}</div> 
        (index < 2 || !isAccount && [2, 3].indexOf(index) !== -1 || (isLogged && SIGNED_INDEXES.indexOf(index) !== -1)) ? <NavigationItem key={item.id} menuItem={item} /> : <div key={item.id}>{" "}</div> 
      ))}
    </ul>
  );
}

export default Navigation;
