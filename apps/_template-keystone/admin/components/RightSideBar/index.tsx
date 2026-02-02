import React from 'react';
import ReactDOM from "react-dom";
import styled, { css } from "styled-components";

import { PageTitle, useModal } from "@md/components/keystone";
import { CreateItemForm, EditItemForm } from "@md/sections";
import type { TSideBarModalDataKeystone } from "../../../types";

const slideInAnimation = css`
  @keyframes slideInAnimation {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  opacity: 1;
  animation: slideInAnimation 0.2s forwards;
`;

const slideOutAnimation = css`
  @keyframes slideOutAnimation {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }

  opacity: 0;
  animation: slideOutAnimation 0.2s forwards;
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

const RightSideBarContainer = styled.div<{ $isClosing?: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 740px;
  height: 100%;
  overflow-y: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  ${(props) =>
    props.$isClosing ? `${slideOutAnimation}` : `${slideInAnimation}`};
`;

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

const StyledRightSideBar = styled.div`
  background: ${({ theme }) => theme.colors.section};
  border-radius: ${({ theme }) => theme.colors.borderRadius || '4px'};
  width: 100%;
  min-height: 100%;
  backdrop-filter: var(--glass-effect);
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 20px;
`;

const TitleContainer = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.highlighted || '#ccc'};
  width: 100%;
  padding: 7px 20px; // Alignment to the height of keystone header
`;

export const RightSideBar = () => {
  const { sideBarModalData: rawSideBarModalData, setSideBarModalData } = useModal();
  const sideBarModalData = rawSideBarModalData as TSideBarModalDataKeystone;
  const [$isClosing, setIsClosing] = React.useState(false);

  if (!sideBarModalData) return null;


  const onHide = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSideBarModalData(null);
      setIsClosing(false);
    }, 200);
  };

  const modalViews: Record<string, React.ReactNode> = {
    create: (
      <ContentContainer>
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
      <ContentContainer>
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
      <ContentContainer>
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
