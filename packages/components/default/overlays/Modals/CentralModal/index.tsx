import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useModal, ModalContainer, Overlay, StyledModal, ModalContentContainer } from "..";

export const CentralModal = () => {
  const { modalData, setModalData } = useModal();
  const [$isClosing, setIsClosing] = useState(false);

  const onHide = () => {
    setIsClosing(true);
    setTimeout(() => {
      setModalData(null);
      setIsClosing(false);
    }, 200);
  };

  if (!modalData) return null;

  return ReactDOM.createPortal(
    <>
      <Overlay onClick={onHide} $isClosing={$isClosing} />
      <ModalContainer
        data-test-id="central-modal-container"
        $isClosing={$isClosing}
        $fullScreen={false}
      >
        <StyledModal>
          <ModalContentContainer>{modalData.content}</ModalContentContainer>
        </StyledModal>
      </ModalContainer>
    </>,
    document.body,
  );
};
