import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useModal } from "@md/components/default/overlays/Modals";
import { ModalContainer, Overlay, StyledModal, ModalContentContainer } from "@md/components/default/overlays/Modals/styles";

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
