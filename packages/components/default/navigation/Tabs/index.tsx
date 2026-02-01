import React, { useState } from "react";
import styled, { css } from "styled-components";

const TabsContainer = styled.div`
  width: 100%;
`;

const TabList = styled.div`
  display: flex;
  cursor: pointer;
`;

const Tab = styled.button<{ $active: boolean }>`
  padding: ${({ theme }) => theme?.offsets?.elementContent || '8px'} ${({ theme }) => `calc(2 * ${theme?.offsets?.elementContent || '8px'})`};
  background-color: ${({ theme }) => theme?.colors?.overlay || 'transparent'};
  color: ${({ theme }) => theme?.colors?.sectionContent || 'black'};
  border: ${({ theme }) => theme?.border?.size || 1}px solid ${({ theme }) => theme?.colors?.sectionContent || 'black'};
  border-bottom: ${({ theme }) => theme?.border?.size || 1}px solid ${({ theme }) => theme?.colors?.sectionContent || 'black'};
  margin-right: ${({ theme }) => theme?.offsets?.betweenElements || '0px'};
  top: 1px;
  position: relative;
  cursor: pointer;
  font-size: ${({ theme }) => theme?.font?.size || '1rem'};
  font-weight: 500;
  border-top-right-radius: ${({ theme }) => theme?.border?.radius || 0}px;
  border-top-left-radius: ${({ theme }) => theme?.border?.radius || 0}px;

  &[type="button"] {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }

  ${({ $active, theme }) => $active && css`
    background-color: ${theme?.colors?.section || 'white'};
    color: ${theme?.colors?.sectionContent || 'black'};
    border-bottom: none;
    z-index: 1;
  `}

  &:hover {
    background-color: ${({ theme }) => theme?.colors?.sectionContent || 'black'};
    color: ${({ theme }) => theme?.colors?.section || 'white'};
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme?.colors?.highlighted || 'blue'};
    outline-offset: -2px;

    &::after {
      content: "";
      position: absolute;
      bottom: -1px;
      left: -2px;
      right: -2px;
      height: 3px;
      margin: 0px 3px;
      background-color: ${({ theme }) => theme?.colors?.highlightedText || 'white'};
    }
  }
`;

const TabPanel = styled.div`
  padding: ${({ theme }) => theme?.offsets?.elementContent || '8px'};
  margin-top: 0 !important;
  border: ${({ theme }) => theme?.border?.size || 1}px solid ${({ theme }) => theme?.colors?.sectionContent || 'black'};
  border-radius: ${({ theme }) => theme?.border?.radius || 0}px;
  border-top-left-radius: 0;
`;

const Tabs: React.FC<{
  tabs: { label: string; content: React.ReactNode }[];
  onTabChange?: (tabNumber: number) => void;
  containerStyle?: React.CSSProperties;
  className?: string;
}> = ({ tabs, onTabChange, containerStyle, className }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    onTabChange && onTabChange(index);
  };

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === "Enter" || event.key === " ") {
      handleTabClick(index);
    } else if (event.key === "ArrowRight") {
      const nextTab = (index + 1) % tabs.length;
      handleTabClick(nextTab);
    } else if (event.key === "ArrowLeft") {
      const prevTab = (index - 1 + tabs.length) % tabs.length;
      handleTabClick(prevTab);
    }
  };

  return (
    <TabsContainer className={className}>
      <TabList role="tablist">
        {tabs.map((tab, index) => (
          <Tab
            className="squared"
            key={tab.label}
            role="tab"
            $active={index === activeTab}
            onClick={() => handleTabClick(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            id={`tab-${index}`}
            aria-controls={`panel-${index}`}
            aria-selected={index === activeTab}
            tabIndex={index === activeTab ? 0 : -1}
          >
            {tab.label}
          </Tab>
        ))}
      </TabList>
      {tabs.map((tab, index) => (
        <TabPanel
          style={containerStyle}
          key={tab.label}
          role="tabpanel"
          id={`panel-${index}`}
          aria-labelledby={`tab-${index}`}
          hidden={index !== activeTab}
        >
          {tab.content}
        </TabPanel>
      ))}
    </TabsContainer>
  );
};

export { Tabs };
