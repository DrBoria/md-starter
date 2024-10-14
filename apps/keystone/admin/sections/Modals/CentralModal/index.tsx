import type { FC } from "react";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled, { css } from "styled-components";

import type { TModalData } from "../../../state";
import { DeleteTemplate } from "./deleteTemplate";
import { SubmitTemplate } from "./submitTemplate";

// Define the centerZoomIn animation
const centerZoomInAnimation = css`
  @keyframes centerZoomIn {
    from {
      transform: translate(-50%, -50%) scale(0.7);
      opacity: 0;
    }
    to {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
  }

  opacity: 1;
  animation: centerZoomIn 0.2s forwards;
`;

// Define the centerZoomOut animation
const centerZoomOutAnimation = css`
  @keyframes centerZoomOut {
    from {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
    to {
      transform: translate(-50%, -50%) scale(0.7);
      opacity: 0;
    }
  }

  opacity: 0;
  animation: centerZoomOut 0.2s forwards;
`;

export const fadeIn = css`
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  opacity: 0;
  animation: fadeIn 0.2s forwards;
`;

export const fadeOut = css`
  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  opacity: 1;
  animation: fadeOut 0.1 forwards;
`;

// Styled component for the modal container
const ModalContainer = styled.div<{ $isClosing?: boolean }>`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 440px;
  max-height: 90%;
  overflow-y: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  transform: translate(-50%, -50%);
  background-color: white;
  ${(props) =>
    props.$isClosing ? centerZoomOutAnimation : centerZoomInAnimation};
`;

// Overlay styled component
const Overlay = styled.div<{ $isClosing?: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  ${(props) => (props.$isClosing ? `${fadeOut}` : `${fadeIn}`)};
`;

// Styled modal component
const StyledModal = styled.div`
  background: white;
  border-radius: 8px;
  width: 100%;
  min-height: 100%;
`;

// Modal content container styled component
const ModalContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  padding: 24px; // same as in keystone
`;

// ModalProps interface
interface ModalProps {
  hide: () => void;
  modalData: TModalData | null;
}

const CentralModal: FC<ModalProps> = ({ modalData, hide }) => {
  if (!modalData) return null;
  const [$isClosing, setIsClosing] = useState(false);

  const onHide = () => {
    setIsClosing(true);
    setTimeout(() => {
      hide();
      setIsClosing(false);
    }, 200);
  };

  return ReactDOM.createPortal(
    <>
      <Overlay onClick={onHide} $isClosing={$isClosing} />
      <ModalContainer $isClosing={$isClosing}>
        <StyledModal>
          <ModalContentContainer>{modalData.content}</ModalContentContainer>
        </StyledModal>
      </ModalContainer>
    </>,
    document.body,
  );
};

export { CentralModal, DeleteTemplate, SubmitTemplate };
