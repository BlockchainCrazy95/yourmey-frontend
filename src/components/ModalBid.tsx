import React, { FC, useEffect, useState, useRef } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Input from "shared/Input/Input";
import NcModal from "shared/NcModal/NcModal";
import { showToast } from "utils";

export interface ModalBidProps {
  show: boolean;
  curPrice: any;
  onCloseModalBid: () => void;
  onClickBid: (newPrice: any) => void;
}

const ModalBid: FC<ModalBidProps> = ({ show, onCloseModalBid, curPrice, onClickBid }) => {
  const textareaRef = useRef(null);
  const [newPrice, setNewPrice] = useState(parseInt(curPrice));

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        const element: HTMLTextAreaElement | null = textareaRef.current;
        if (element) {
          (element as HTMLTextAreaElement).focus();
          // (element as HTMLTextAreaElement).setSelectionRange(
          //   (element as HTMLTextAreaElement).value.length,
          //   (element as HTMLTextAreaElement).value.length
          // );
        }
      }, 400);
    }
  }, [show]);

  const onPriceChange = (e:any) => {
    const _val = parseInt(e.target.value);
    setNewPrice(_val)
  }

  const onClickSubmit = () => {
    console.log("newPrice=", newPrice);
    if(newPrice < 0) {
      showToast("Price cannot be less than zero.", "error");
      return;
    }
    onClickBid(newPrice);
    onCloseModalBid();
  }

  const renderContent = () => {
    return (
      <form action="#">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
          Place a bid
        </h3>
        <span className="text-sm">Please input the bid price. New price must be bigger than current price and smaller than 1.5 times of current price.</span>
        <div className="mt-8 relative rounded-md shadow-sm">
          <Input ref={textareaRef} defaultValue={curPrice} type={"number"} onChange={onPriceChange} min="1"/>

          <div className="absolute inset-y-0 right-0 flex items-center">
            <label htmlFor="currency" className="sr-only">
              Currency
            </label>
            <select
              id="currency"
              name="currency"
              className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-neutral-500 dark:text-neutral-300 sm:text-sm rounded-md"
            >
              <option>YEM</option>
            </select>
          </div>
        </div>
        <div className="mt-4 space-x-3">
          <ButtonPrimary type="button" onClick={onClickSubmit}>Submit</ButtonPrimary>
          <ButtonSecondary type="button" onClick={onCloseModalBid}>
            Cancel
          </ButtonSecondary>
        </div>
      </form>
    );
  };

  const renderTrigger = () => {
    return null;
  };

  return (
    <NcModal
      isOpenProp={show}
      onCloseModal={onCloseModalBid}
      contentExtraClass="max-w-lg"
      renderContent={renderContent}
      renderTrigger={renderTrigger}
      modalTitle=""
    />
  );
};

export default ModalBid;
