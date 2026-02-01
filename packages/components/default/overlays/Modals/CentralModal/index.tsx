import React, { useState } from "react";
import { withSpaceBetween } from '@md/styles';
import ReactDOM from "react-dom";
import styled, { css } from "styled-components";

import { useModal } from "..";

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
  animation: fadeOut 0.1s forwards;
`;

// Styled component for the modal container
const ModalContainer = styled.div<{ $isClosing: boolean }>`
  position: fixed;
  top: 50%;
  left: 50%;
  min-width: 440px;
  max-height: 90%;
  
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) => theme.colors.section}; // Use theme background
  color: ${({ theme }) => theme.colors.sectionContent};

  border-radius: 20px;
  /* Stone-like shadow */
  box-shadow: ${({ theme }) => theme.colors.effects?.depth?.outer?.medium || '0 10px 30px rgba(0,0,0,0.5)'};
  
  /* Remove border, let shadow define shape */
  border: none;
  
  padding: ${withSpaceBetween};
  
  /* Cut corners logic if desired, but for modal usually rounded */
  ${({ theme }) => theme.colors.geometry?.cut && `
    border-radius: 0;
    clip-path: ${theme.colors.geometry.cut};
  `}

  ${(props) =>
    props.$isClosing ? centerZoomOutAnimation : centerZoomInAnimation
  };
`;

// Overlay styled component
const Overlay = styled.div<{ $isClosing: boolean }>`
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
background: transparent; // Let container background show through
border-radius: inherit;
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
        data-test-id="cental-modal-container"
        $isClosing={$isClosing}
      >
        <StyledModal>
          <ModalContentContainer>{modalData.content}</ModalContentContainer>
        </StyledModal>
      </ModalContainer>
    </>,
    document.body,
  );
};
