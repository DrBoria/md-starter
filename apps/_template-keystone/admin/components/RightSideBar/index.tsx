import React from 'react';
import ReactDOM from "react-dom";
import styled, { keyframes } from "styled-components";


import { PageTitle, useModal } from "@md/components/keystone";
import { CreateItemForm, EditItemForm } from "@md/sections";
// import type { TOperation } from "@/types";
import type { TSideBarModalDataKeystone } from "@/types";





const slideInAnimation = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOutAnimation = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }

  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

export const fadeOut = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

const RightSideBarContainer = styled.div<{ $isClosing?: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: ${({ theme }) => theme.elements.sidebar.width}; /* 740px approx */
  height: 100%;
  overflow-y: auto;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  animation: ${({ $isClosing }) => ($isClosing ? slideOutAnimation : slideInAnimation)} 0.2s forwards;
`;

const Overlay = styled.div<{ $isClosing?: boolean }>`
  position: fixed;
  inset: 0;
  background-color: ${({ theme }) => theme.colors.overlayBackground};
  cursor: pointer;
  animation: ${({ $isClosing }) => ($isClosing ? fadeOut : fadeIn)} 0.2s forwards;
`;

const StyledRightSideBar = styled.div`
  background: ${({ theme }) => theme.colors.section};
  border-radius: ${({ theme }) => theme.border.radius};
  width: 100%;
  min-height: 100%;
  backdrop-filter: var(--glass-effect);
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: ${({ theme }) => theme.offsets.section};
`;

const TitleContainer = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.highlighted};
  width: 100%;
  padding: ${({ theme }) => theme.offsets.elementContent}; /* Was 7px 20px, approximating */
`;

export const RightSideBar = () => {
  const { sideBarModalData: rawSideBarModalData, setSideBarModalData } = useModal();
  const sideBarModalData = rawSideBarModalData as TSideBarModalDataKeystone;
  const [$isClosing, setIsClosing] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !sideBarModalData) return null;


  const onHide = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSideBarModalData(null);
      setIsClosing(false);
    }, 200);
  };

  const modalViews: Record<string, React.ReactNode> = {
    create: (
      <ContentContainer style={{ padding: 'var(--offset-section)' }}>
        {sideBarModalData.listName && (
          <CreateItemForm
            listName={sideBarModalData.listName}
            fieldsToRender={sideBarModalData.fieldsToRender}
            defaultValues={sideBarModalData.defaultValues}
            notToRenderFields={sideBarModalData.notToRenderFields}
            conditionalFields={sideBarModalData.conditionalFields}
            tabs={sideBarModalData.tabs}
            buttons={sideBarModalData.buttons}
          />
        )}
      </ContentContainer>
    ),
    edit: (
      <ContentContainer style={{ padding: 'var(--offset-section)' }}>
        {sideBarModalData.listName && (
          <EditItemForm
            listName={sideBarModalData.listName}
            itemId={sideBarModalData.id!}
            fieldsToRender={sideBarModalData.fieldsToRender}
            notToRenderFields={sideBarModalData.notToRenderFields}
            conditionalFields={sideBarModalData.conditionalFields}
            buttons={sideBarModalData.buttons}
            tabs={sideBarModalData.tabs}
          />
        )}
      </ContentContainer>
    ),
    custom: (
      <ContentContainer style={{ padding: 'var(--offset-section)' }}>
        {sideBarModalData.children}
      </ContentContainer>
    ),
  };

  return ReactDOM.createPortal(
    <>
      <Overlay onClick={onHide} $isClosing={$isClosing} />
      <RightSideBarContainer $isClosing={$isClosing}>
        <StyledRightSideBar>
          <TitleContainer>
            <PageTitle>{sideBarModalData.headerText}</PageTitle>
          </TitleContainer>
          {modalViews[sideBarModalData.type]}
        </StyledRightSideBar>
      </RightSideBarContainer>
    </>,
    document.body,
  );
};
