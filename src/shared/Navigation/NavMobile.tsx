import React from "react";
import ButtonClose from "shared/ButtonClose/ButtonClose";
import Logo from "shared/Logo/Logo";
import { Disclosure } from "@headlessui/react";
import { NavLink, useLocation } from "react-router-dom";
import { NavItemType } from "./NavigationItem";
import { NAVIGATION_DEMO_2, SIGNED_INDEXES } from "data/navigation";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import SocialsList from "shared/SocialsList/SocialsList";
import { ChevronDownIcon } from "@heroicons/react/solid";
import SwitchDarkMode from "shared/SwitchDarkMode/SwitchDarkMode";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import { useSelector } from "react-redux";
import { RootState } from "app/store";
import ConnectButton from "components/ConnectButton";

export interface NavMobileProps {
  data?: NavItemType[];
  onClickClose?: () => void;
}

const NavMobile: React.FC<NavMobileProps> = ({
  data = NAVIGATION_DEMO_2,
  onClickClose,
}) => {

  const location = useLocation();
  const { user } = useSelector((state:RootState) => state.home);
  const isLogged = user !== null;
  const isHome = location.pathname === "/" || location.pathname === "/#";
  const isDetail = location.pathname.indexOf("auction-detail") !== -1;
  const isAccount = location.pathname === "/account" || location.pathname === "/auction" || location.pathname.indexOf("/auction-detail") !== -1;
  

  const _renderMenuChild = (item: NavItemType) => {
    return (
      <ul className="nav-mobile-sub-menu pl-6 pb-1 text-base">
        {item.children?.map((i, index) => (
          <Disclosure key={i.href + index} as="li">
            <NavLink
              exact
              strict
              to={{
                pathname: i.href || undefined,
              }}
              className="flex px-4 py-2.5 text-neutral-900 dark:text-neutral-200 text-sm font-medium rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 mt-[2px]"
              activeClassName="text-secondary"
            >
              <span
                className={!i.children ? "block w-full" : ""}
                onClick={onClickClose}
              >
                {i.name}
              </span>
              {i.children && (
                <span
                  className="block flex-grow"
                  onClick={(e) => e.preventDefault()}
                >
                  <Disclosure.Button
                    as="span"
                    className="flex justify-end flex-grow"
                  >
                    <ChevronDownIcon
                      className="ml-2 h-4 w-4 text-neutral-500"
                      aria-hidden="true"
                    />
                  </Disclosure.Button>
                </span>
              )}
            </NavLink>
            {i.children && (
              <Disclosure.Panel>{_renderMenuChild(i)}</Disclosure.Panel>
            )}
          </Disclosure>
        ))}
      </ul>
    );
  };

  const _renderItem = (item: NavItemType, index: number) => {
    if(index < 3 || !isAccount && [3, 4].indexOf(index) !== -1 || (isLogged && SIGNED_INDEXES.indexOf(index) !== -1)) {
      const isHomeMenu = isHome && (item.href === "/#launch" || item.href === "/#affiliate");
      switch(item.name) {
        case "Home":
          item.href = isDetail ? "/#" : "#";
          break;
        case "Launch":
          item.href = isHome ? "/#launch" : "";
          break;
        case "Affiliate":
          item.href = isHome ? "/#affiliate" : "";
          break;
      }
      return (
        <Disclosure
          key={item.id}
          as="li"
          className="text-neutral-900 dark:text-white"
        >
          { isHomeMenu ?
          <a
            className="inline-flex items-center text-sm xl:text-base font-normal text-neutral-700 dark:text-neutral-300 py-2 px-4 xl:px-5 rounded-full hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
            target={item.targetBlank ? "_blank" : undefined}
            rel="noopener noreferrer"
            href={item.href}
          ><span className="text-secondary font-medium uppercase">{item.name}</span></a>
          :<NavLink
            exact
            strict
            className="flex w-full items-center py-2.5 px-4 font-medium uppercase tracking-wide text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"
            to={{
              pathname: item.href || undefined,
            }}
            activeClassName="text-secondary"
          >
            <span
              className={!item.children ? "block w-full" : ""}
              onClick={onClickClose}
            >
              {item.name}
            </span>
            {item.children && (
              <span
                className="block flex-grow"
                onClick={(e) => e.preventDefault()}
              >
                <Disclosure.Button
                  as="span"
                  className="flex justify-end flex-grow"
                >
                  <ChevronDownIcon
                    className="ml-2 h-4 w-4 text-neutral-500"
                    aria-hidden="true"
                  />
                </Disclosure.Button>
              </span>
            )}
          </NavLink>
          }
          {item.children && (
            <Disclosure.Panel>{_renderMenuChild(item)}</Disclosure.Panel>
          )}
        </Disclosure>
      );
    }
    return <div key={item.id}>{" "}</div>
  };

  return (
    <div className="overflow-y-auto w-full max-w-sm h-screen py-2 transition transform shadow-lg ring-1 dark:ring-neutral-700 bg-white dark:bg-neutral-900 divide-y-2 divide-neutral-100 dark:divide-neutral-800">
      <div className="py-6 px-5">
        <Logo />
        <div className="flex flex-col mt-5 text-neutral-700 dark:text-neutral-300 text-sm">
          <span>
            Discover the most outstanding articles on all topics of life. Write
            your stories and share them
          </span>

          <div className="flex justify-between items-center mt-4">
            <SocialsList itemClass="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-xl" />
            {/* <span className="block">
              <SwitchDarkMode className="bg-neutral-100 dark:bg-neutral-800" />
            </span> */}
          </div>
        </div>
        <span className="absolute right-2 top-2 p-1">
          <ButtonClose onClick={onClickClose} />
        </span>
      </div>
      <ul className="flex flex-col py-6 px-2 space-y-1">
        {data.map(_renderItem)}
      </ul>
      <div className="flex items-center justify-between py-6 px-5 space-x-2">
        {isLogged ? 
            <ButtonPrimary href="/auction" className="!px-10" onClick={onClickClose}>
              Buy NFTs
            </ButtonPrimary>
          :
          <>
            {/* <ButtonPrimary href="/login" className="!px-10" onClick={onClickClose}>
              Sign In
            </ButtonPrimary> */}
            <ConnectButton />
            {/* <ButtonSecondary href="/signup" className="flex-1" onClick={onClickClose}>
              Sign Up
            </ButtonSecondary> */}
          </>
        }
      </div>
    </div>
  );
};

export default NavMobile;
