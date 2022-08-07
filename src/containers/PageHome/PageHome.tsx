import React from "react";
import SectionSliderCategories from "components/SectionSliderCategories/SectionSliderCategories";
import SectionHowItWork from "components/SectionHowItWork/SectionHowItWork";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionGridAuthorBox from "components/SectionGridAuthorBox/SectionGridAuthorBox";
import SectionBecomeAnAuthor from "components/SectionBecomeAnAuthor/SectionBecomeAnAuthor";
import SectionVideos from "./SectionVideos";
import { Helmet } from "react-helmet";
import SectionHero from "components/SectionHero/SectionHero";
import Vector1 from "images/Vector1.png";
import SectionLargeSlider from "./SectionLargeSlider";
import SectionSliderCollections from "components/SectionSliderCollections";
import SectionGridFeatureNFT from "./SectionGridFeatureNFT";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import styled from "styled-components";
import SectionNewEntrys from "./SectionNewEntrys";
import SectionHotCollection from "./SectionHotCollection";
import SectionTopCreations from "./SectionTopCreations";
import SectionSliderCard from "./SectionSliderCard";
import SectionRankings from "./SectionRankings";
import SectionEarnWithAffiliate from "./SectionEarnWithAffiliate";

const HomeSectionDiv = styled.div`
  background-image: url("./img/hero-bg.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;

`;

function PageHome() {
  return (
    <>
      <HomeSectionDiv>
        <div className="nc-PageHome relative overflow-hidden" style={{marginTop: "-88px", paddingTop: "88px"}}>
          <Helmet>
            <title>Yourmey</title>
          </Helmet>

          <div className="container relative space-y-20 mt-12 mb-20 sm:space-y-24 sm:my-24 lg:space-y-32 lg:my-32">
            <SectionHero
              className="pb-10"
              heading={
                <span className="text-white">
                  Discover 🖼
                  <br /> collect, and sell <br /> extraordinary {` `}
                  <span className="relative pr-3">
                    <img
                      className="w-full absolute bottom-3 -left-1"
                      src={Vector1}
                      alt="Vector1"
                    />
                    <span className="relative">NFTs</span>
                  </span>
                </span>
              }
            />
          </div>
        </div>
      </HomeSectionDiv>

      <div className="container relative space-y-24 my-24 lg:space-y-32 lg:my-32">
        <SectionHowItWork />
      </div>

      <div className="bg-neutral-100/80 dark:bg-black/20 py-20 lg:py-32">
        <div className="container">
          <SectionHotCollection />
        </div>
      </div>

      <div className="container relative space-y-24 my-24 lg:space-y-32 lg:my-32">
        <SectionNewEntrys />

        <div className="relative py-20 lg:py-28">
          <BackgroundSection />
          <SectionTopCreations
            sectionStyle="style2"
            data={Array.from("11111111")}
            boxCard="box4"
          />
        </div>

        <SectionSliderCard />

        <div className="relative py-20 lg:py-28">
          <BackgroundSection />
          <SectionRankings cardStyle="style2" />
        </div>

        <SectionEarnWithAffiliate />

      </div>

      {/*
      <div className="container relative space-y-24 my-24 lg:space-y-32 lg:my-32">
        <SectionGridAuthorBox boxCard="box3" />

        <div className="relative py-20 lg:py-28">
          <BackgroundSection />
          <SectionSliderCollections />
        </div>

        <SectionGridFeatureNFT />

        <div className="relative py-20 lg:py-24">
          <BackgroundSection />
          <SectionBecomeAnAuthor />
        </div>

        <SectionSubscribe2 />

        <SectionSliderCategories />

        <SectionVideos />
      </div> */}
    </>
  );
}

export default PageHome;
