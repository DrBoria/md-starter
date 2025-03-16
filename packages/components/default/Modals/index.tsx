import React, { createContext, useContext, useState } from "react";
import { ModalContext } from "./useModal";

export interface IModalButton {
  name: string;
  view: (
    // Onclick will have action that should be used by default - create item, save edited item, delete item and so on
    onClick?: () => unknown,
    isDisabled?: boolean,
  ) => React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>>;
}

export type TFullScreenData = {
  content: React.ReactNode;
} | null;

export type TModalData = {
  content: React.ReactNode;
} | null;

export type TSideBarModalData = {
  headerText: string;
  children?: React.ReactElement;
} | null;

export interface ModalContextType {
  sideBarModalData: TSideBarModalData;
  setSideBarModalData: (data: TSideBarModalData) => void;
  modalData: TModalData;
  setModalData: (data: TModalData) => void;
  fullScreenData: TFullScreenData;
  setFullScreenData: (data: TFullScreenData) => void;
}

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sideBarModalData, setSideBarModalData] = useState<TSideBarModalData>(null);
  const [modalData, setModalData] = useState<TModalData>(null);
  const [fullScreenData, setFullScreenData] = useState<TFullScreenData>(null);

  const value: ModalContextType = {
    sideBarModalData,
    setSideBarModalData,
    modalData,
    setModalData,
    fullScreenData,
    setFullScreenData,
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext };
export { CentralModal } from './CentralModal';
export { FullScreenModal } from './FullScreenModal';
export { useModal } from './useModal'
