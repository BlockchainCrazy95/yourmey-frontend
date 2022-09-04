import AvatarDropdown from "components/Header/AvatarDropdown";
import NotifyDropdown from "components/Header/NotifyDropdown";
import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Input from "shared/Input/Input";
import Logo from "shared/Logo/Logo";
import MenuBar from "shared/MenuBar/MenuBar";
import Navigation from "shared/Navigation/Navigation";

import { RootState } from "app/store";
import ConnectButton from "components/ConnectButton";

const SearchHomeInput = styled.input`
  font-size: 16px;
  border: none;
  font-weight: 500;
  background: linear-gradient(90.28deg, rgba(255, 255, 255, 0.09) -5.54%, rgba(255, 255, 255, 0.16) 112.42%) !important;
  color: white;
`

const SearchInput = styled.input`
  font-size: 16px;
  border: none;
  font-weight: 500;
  background: linear-gradient(90.28deg,rgb(16 123 215 / 9%) -5.54%,rgb(64 101 205 / 16%) 112.42%) !important;
  color: black;
`

export interface SiteHeaderProps {}

const SiteHeader: FC<SiteHeaderProps> = () => {
  let location = useLocation();
  const { user } = useSelector((state:RootState) => state.home)

  const isLogged = user !== null;
  const isHome = location.pathname === "/" || location.pathname === "/#";
  const isSignUpPage = location.pathname === "/signup";

  return (
    <div className="nc-Header relative w-full z-40 ">
      <div className={`nc-MainNav relative z-10 ${"onTop "}`}>
        <div className="container py-5 relative flex justify-between items-center space-x-4 xl:space-x-8">
          <div className="flex justify-start flex-grow items-center space-x-3 sm:space-x-8 lg:space-x-10">
            <Logo isDark={!isHome}/>
            <div className="hidden sm:block flex-grow max-w-xs">
              <form action="/" method="GET" className="relative">
                { isHome ? <SearchHomeInput 
                  type="search"
                  placeholder="Search items"
                  className="pr-10 w-full h-[42px] pl-4 py-3 border-black"
                />:
                <SearchInput 
                  type="search"
                  placeholder="Search items"
                  className="pr-10 w-full h-[42px] pl-4 py-3 border-black"
                />  
                }
                
                {/* <Input
                  type="search"
                  placeholder="Search items"
                  className="pr-10 w-full"
                  sizeClass="h-[42px] pl-4 py-3"
                /> */}
                <span className="absolute top-1/2 -translate-y-1/2 right-3 text-white">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22 22L20 20"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <input type="submit" hidden value="" />
              </form>
            </div>
          </div>
          <div className="flex-shrink-0 flex items-center justify-end text-neutral-700 dark:text-neutral-100 space-x-1">
            <div className="hidden items-center xl:flex space-x-2">
              <Navigation />
              { isLogged ? <>
                <div className="hidden sm:block h-6 border-l border-neutral-300 dark:border-neutral-6000"></div>
                {/* <div className="flex">
                  <NotifyDropdown />
                </div> */}
                <div></div>
                {/* <ButtonPrimary sizeClass="px-4 py-2 sm:px-5 w-28">Create</ButtonPrimary> */}
                <ConnectButton />
                <div></div>
                <AvatarDropdown />
              </>
              : <>
              <div className="hidden sm:block h-10 border-l border-neutral-300 dark:border-neutral-6000"></div>
                {/* <ButtonPrimary
                  href={"/page-upload-item"}
                  sizeClass="px-4 py-2 sm:px-5"
                >
                  Create
                </ButtonPrimary> */}
                <ConnectButton />
                {/* <ButtonSecondary
                  href={params[type].url}
                  sizeClass="px-4 py-2 sm:px-5 w-28"
                >
                  {params[type].title}
                </ButtonSecondary> */}
                { !isSignUpPage ? <ButtonSecondary href="/signup" sizeClass="px-4 py-2 sm:px-5 w-28">Sign Up</ButtonSecondary> : <></>}
              </>}
            </div>
            {isLogged? <>
              <div className="flex items-center space-x-3 xl:hidden">
                {/* <NotifyDropdown /> */}
                <AvatarDropdown />
                <MenuBar />
              </div>
            </>:<>
              <div className="flex items-center space-x-1.5 xl:hidden">
                <ConnectButton />
                { !isSignUpPage ? <ButtonSecondary href="/signup" sizeClass="px-4 py-2 sm:px-5 w-28">Sign Up</ButtonSecondary>:<></>}
                {/* <ButtonPrimary
                  href={params[type].url}
                  sizeClass="px-4 py-2 sm:px-5 w-28"
                >
                  {params[type].title}
                </ButtonPrimary>
                {type === 0 ? <ButtonSecondary href="/signup" sizeClass="px-4 py-2 sm:px-5 w-28">Sign Up</ButtonSecondary>:<></>} */}
                <MenuBar />
              </div>
            </>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteHeader;
