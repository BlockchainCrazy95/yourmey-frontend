import React, { FC, useState } from "react";
import CardLarge1 from "components/CardLarge1/CardLarge1";
import { nftsLargeImgs } from "contains/fakeData";
import Heading from "components/Heading/Heading";

export interface SectionHotCollectionProps {
  className?: string;
}

const SectionHotCollection: FC<SectionHotCollectionProps> = ({
  className = "",
}) => {
  const [indexActive, setIndexActive] = useState(0);

  const handleClickNext = () => {
    setIndexActive((state) => {
      if (state >= 2) {
        return 0;
      }
      return state + 1;
    });
  };

  const handleClickPrev = () => {
    setIndexActive((state) => {
      if (state === 0) {
        return 2;
      }
      return state - 1;
    });
  };

  return (
    <div className={`nc-SectionHotCollection relative ${className}`}>
        <Heading
            desc={"Take your chance in our greate community."}
            className="mb-14 text-neutral-900 dark:text-neutral-50"
            isCenter
        >
            Our Hot Launch Phase
        </Heading>
        {[1, 1, 1].map((_, index) =>
            indexActive === index ? (
            <CardLarge1
                key={index}
                isShowing
                featuredImgUrl={nftsLargeImgs[index]}
                onClickNext={handleClickNext}
                onClickPrev={handleClickPrev}
            />
            ) : null
        )}
    </div>
  );
};

export default SectionHotCollection;
