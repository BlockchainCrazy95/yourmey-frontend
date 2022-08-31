import React, { FC } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import NcModal from "shared/NcModal/NcModal";

export interface ModalNotificationProps {
  show: boolean;
  onCloseModalNotification: () => void;
}

const ModalNotification: FC<ModalNotificationProps> = ({ show, onCloseModalNotification }) => {
  
  const renderContent = () => {
    return (
      <form action="#">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
          Notification
        </h3>
        <span className="text-sm">
            Gratulation to be a part of this journey. <br/>
            If you want to become an Affiliate, please go to the menubar to the point My Account.
            This Menupoint is only avvailable if you are logged in and also connected.
        </span>
        <div className="mt-4 space-x-3">
          <ButtonPrimary href="/account">
            Become an affiliate
          </ButtonPrimary>
          <ButtonSecondary type="button" onClick={onCloseModalNotification}>
            Home
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
      onCloseModal={onCloseModalNotification}
      contentExtraClass="max-w-screen-sm"
      renderContent={renderContent}
      renderTrigger={renderTrigger}
      modalTitle=""
    />
  );
};

export default ModalNotification;
