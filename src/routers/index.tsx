import React, { useEffect, useMemo } from "react";
import { BrowserRouter, Switch, Route, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import Web3 from "web3";
import jwt_decode from "jwt-decode";

import { Page } from "./types";
import ScrollToTop from "./ScrollToTop";
import Footer from "shared/Footer/Footer";
import PageHome from "containers/PageHome/PageHome";
import Page404 from "containers/Page404/Page404";
import AuthorPage from "containers/AuthorPage/AuthorPage";
import AccountPage from "containers/AccountPage/AccountPage";
import PageContact from "containers/PageContact/PageContact";
import PageAbout from "containers/PageAbout/PageAbout";
import PageSignUp from "containers/PageSignUp/PageSignUp";
import PageLogin from "containers/PageLogin/PageLogin";
import PageSubcription from "containers/PageSubcription/PageSubcription";
import BlogPage from "containers/BlogPage/BlogPage";
import BlogSingle from "containers/BlogPage/BlogSingle";
import SiteHeader from "containers/SiteHeader";
import NftDetailPage from "containers/NftDetailPage/NftDetailPage";
import PageCollection from "containers/PageCollection";
import PageSearch from "containers/PageSearch";
import PageUploadItem from "containers/PageUploadItem";
import { logout, setRefAddress } from "app/home/home";
import { useWeb3Context } from "hooks/web3Context";
import AuctionLists from "containers/AuctionList";
// import PageConnectWallet from "containers/PageConnectWallet";

export const pages: Page[] = [
  { path: "/", exact: true, component: PageHome },
  { path: "/#", exact: true, component: PageHome },
  { path: "/signup", component: PageSignUp },
  { path: "/login", component: PageLogin },
  { path: "/auction", component: AuctionLists },
  //
  { path: "/home-header-2", exact: true, component: PageHome },
  { path: "/nft-detailt", component: NftDetailPage },
  // { path: "/page-collection", component: PageCollection },
  { path: "/page-search", component: PageSearch },
  { path: "/page-author", component: AuthorPage },
  { path: "/account", component: AccountPage },
  { path: "/page-upload-item", component: PageUploadItem },
  // { path: "/connect-wallet", component: PageConnectWallet },
  //
  { path: "/blog", component: BlogPage },
  { path: "/blog-single", component: BlogSingle },
  //
  { path: "/contact", component: PageContact },
  { path: "/about", component: PageAbout },
  { path: "/subscription", component: PageSubcription },
];

const useQuery = () => {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

const QueryParamsCheck = () => {
  const query = useQuery();
  const dispatch = useDispatch();
  const { address } = useWeb3Context();

  useEffect(() => {
    // Check affiliate link
    const queryRef = query.get("ref");
    if(queryRef && Web3.utils.isAddress(queryRef)) {
      dispatch(setRefAddress({refAddress: queryRef}));
    }
  }, []);

  useEffect(() => {
    const jwtToken = window.localStorage.getItem("jwtToken");
    if(jwtToken) {
      const decoded:any = jwt_decode(jwtToken);
      console.log("check address change decoded = ", decoded);
      if(decoded._doc.address !== address) {
        dispatch(logout());
      }
    }    
  }, [address]);

  return <></>;
}

const Routes = () => {
   return (
    <BrowserRouter basename="/">
      <QueryParamsCheck />
      <ScrollToTop />
      <SiteHeader />
      <Switch>
        {pages.map(({ component, path, exact }) => {
          return (
            <Route
              key={path}
              component={component}
              exact={!!exact}
              path={path}
            />
          );
        })}
        <Route component={Page404} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default Routes;
