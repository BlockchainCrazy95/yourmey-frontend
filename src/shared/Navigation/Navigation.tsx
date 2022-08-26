import React from "react";
import NavigationItem from "./NavigationItem";
import { NAVIGATION_DEMO_2, SIGNED_INDEXES } from "data/navigation";
import { useSelector } from "react-redux";
import { RootState } from "app/store";

function Navigation() {
  const { user } = useSelector((state:RootState) => state.home);
  const isLogged = user !== null;

  return (
    <ul className="nc-Navigation hidden lg:flex lg:flex-wrap lg:items-center lg:space-x-1 relative">
      {NAVIGATION_DEMO_2.map((item, index) => (
        (isLogged || (SIGNED_INDEXES.indexOf(index) === -1)) ? <NavigationItem key={item.id} menuItem={item} /> : <div key={item.id}>{" "}</div> 
      ))}
    </ul>
  );
}

export default Navigation;
