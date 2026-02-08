import React, { useState } from "react";
import ReactDOM from "react-dom";
import { LucideIcon } from "../../../common/Icons";
import { useModal } from "../useModal";
import { ModalContainer, Overlay, CloseButton, StyledModal, ModalContentContainer } from "../styles";

export const FullScreenModal: React.FC = () => {
  const { fullScreenData, setFullScreenData } = useModal();
  const [isClosing, setIsClosing] = useState(false);

  const closeFullScreen = () => {
    setIsClosing(true);
    setTimeout(() => {
      setFullScreenData(null);
      setIsClosing(false);
    }, 300);
  };

  if (!fullScreenData) return null;

  return ReactDOM.createPortal(
    <>
      <Overlay onClick={closeFullScreen} $isClosing={isClosing} />
      <ModalContainer
        $isClosing={isClosing}
        $fullScreen={true}
        data-test-id="fullscreen-modal-container"
      >
        <CloseButton onClick={closeFullScreen} className="close-button">
          <LucideIcon name="Minimize2" />
        </CloseButton>
        <StyledModal>
          <ModalContentContainer>
            {fullScreenData.content}
          </ModalContentContainer>
        </StyledModal>
      </ModalContainer>
    </>,
    document.body,
  );
};
