import React, { FC } from "react";
import CardNFTMusic from "components/CardNFTMusic";
import Heading from "components/Heading/Heading";

export interface SectionNewEntryProps {
  className?: string;
}

const SectionNewEntrys: FC<SectionNewEntryProps> = ({ className = "" }) => {
  return (
    <div className={`nc-SectionNewEntry relative ${className}`}>
      <Heading
        desc={"The most recent NFT entrys"}
        className="mb-14 text-neutral-900 dark:text-neutral-50"
        isCenter
      >
        New Entrys
      </Heading>
      <div className={`grid grid-cols-1 sm:grid-cols-6 gap-6 2xl:gap-8`}>
        <CardNFTMusic
          featuredImage="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80"
          className="sm:col-span-3 xl:col-span-2"
        />
        <CardNFTMusic
          featuredImage="https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80"
          className="sm:col-span-3 xl:col-span-2"
        />
        <CardNFTMusic
          featuredImage="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80"
          className="sm:col-span-3 xl:col-span-2"
        />
      </div>
    </div>
  );
};

export default SectionNewEntrys