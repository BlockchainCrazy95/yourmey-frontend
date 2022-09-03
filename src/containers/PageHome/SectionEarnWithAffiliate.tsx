import React, { FC } from "react";
import { useSelector } from "react-redux";
import NcImage from "shared/NcImage/NcImage";
import rightImgDemo from "images/rightLargeImg.png";
import nftImg from "images/nfts/6.png";
import rightLargeImgDark from "images/rightLargeImgDark.png";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Logo from "shared/Logo/Logo";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import { RootState } from "app/store";

export interface SectionEarnWithAffiliateProps {
  className?: string;
}

const SectionEarnWithAffiliate: FC<SectionEarnWithAffiliateProps> = ({
  className = "",
}) => {
  const { user } = useSelector((state:RootState) => state.home);
  return (
    <div
      className={`nc-SectionEarnWithAffiliate relative flex flex-col lg:flex-row items-center  ${className}`}
      data-nc-id="SectionEarnWithAffiliate"
      id="affiliate"
    >
      <div className="flex-shrink-0 mb-16 lg:mb-0 lg:mr-10 lg:w-2/5">
        {/* <Logo className="w-28" /> */}
        <h2 className="font-semibold text-3xl sm:text-4xl xl:text-6xl mt-6 sm:mt-10 !leading-[1.112] tracking-tight">
          Affiliate Your Chance
        </h2>
        <span className="block mt-6 text-neutral-500 dark:text-neutral-400 ">
          A chance to build your money machine and to start a bright future with us
        </span>
        <div className="flex space-x-2 sm:space-x-5 mt-6 sm:mt-12">
          {
            user ? 
            <ButtonPrimary href="/account" className="">
              Become an affiliate
            </ButtonPrimary>
            :
            <ButtonPrimary href="/signup" className="">
              Sign Up
            </ButtonPrimary>
          }
          {/* <ButtonSecondary href="/page-search" className="">
            Discover more
          </ButtonSecondary> */}
        </div>
      </div>
      <div className="flex-grow">
        <NcImage containerClassName="block dark:hidden" src={nftImg} className="inset-0 object-cover rounded-3xl sm:rounded-[40px] border-4 sm:border-[14px] border-white m-auto shadow-md" />
        <NcImage
          containerClassName="hidden dark:block"
          src={rightLargeImgDark}
        />
      </div>
    </div>
  );
};

export default SectionEarnWithAffiliate;
