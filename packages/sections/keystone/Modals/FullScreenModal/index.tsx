import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled, { css, keyframes } from "styled-components";

import { Icons } from "@md/components/keystone";

const expandAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.5);
  }
  80% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.05);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

const collapseAnimation = keyframes`
  0% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  40% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.05);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.5);
  }
`;

const FullScreenOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #00000080;
  z-index: 999;
  opacity: 0;
  animation: fadeInOverlay 0.3s ease-in-out forwards;

  @keyframes fadeInOverlay {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const FullScreenWrapper = styled.div<{ $isClosing: boolean }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1);
  width: 80%;
  height: 80%;
  padding: 56px 16px; // 56px is 16ox + button height, so the button could be displayed on the bottom. Change if needed
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px #0000004c;
  z-index: 1000;
  overflow: hidden;
  ${(props) => css`
    animation: ${props.$isClosing ? collapseAnimation : expandAnimation} 0.3s
      ease-in-out forwards;
  `}
`;

const CloseButton = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: #00000020;
  border-radius: 50%;

  &:hover {
    background: #00000030;
  }
`;


const FullScreenModal: React.FC<{ GlobalVars: { FullScreenData: { content: React.ReactNode } | null } }> = ({ GlobalVars }) => {
  const [isClosing, setIsClosing] = useState(false);

  const closeFullScreen = () => {
    setIsClosing(true);
    setTimeout(() => {
      GlobalVars.FullScreenData = null; // Reset the global state after animation
      setIsClosing(false);
    }, 300);
  };

  if (!GlobalVars.FullScreenData) return null;

  return ReactDOM.createPortal(
    <>
      <FullScreenOverlay onClick={closeFullScreen} />
      <FullScreenWrapper $isClosing={isClosing}>
        <CloseButton onClick={closeFullScreen}>
          <Icons.Minimize2Icon />
        </CloseButton>
        {GlobalVars.FullScreenData.content}
      </FullScreenWrapper>
    </>,
    document.body,
  );
};

export { FullScreenModal };
