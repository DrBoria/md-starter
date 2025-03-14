import type { CSSProperties } from "react";
import React, { useState } from "react";
import styled from "styled-components";

interface TabProps {
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: TabProps[];
  onTabChange?: (tabNumber: number) => void;
  containerStyle?: CSSProperties;
  className?: string;
}

const TabsContainer = styled.div`
  width: 100%;
`;

const TabList = styled.div`
  display: flex;
  cursor: pointer;
  role: tablist;
`;

const Tab = styled.button`
  padding: 10px 20px;
  background-color: var(--tab-bg, #eff6ff);
  color: var(--tab-color, #2563eb);
  border: 1px solid #ccc;
  border-bottom: var(--tab-border-bottom, 1px solid #ccc);
  margin-right: 5px;
  top: 1px;
  position: relative;
  cursor: pointer;
  font-size: var(--size-label);
  font-weight: 500;

  border-top-right-radius: var(--border-radius);
  border-top-left-radius: var(--border-radius);

  &[type="button"] {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }

  &[aria-selected="true"] {
    --tab-bg: white;
    color: #222;
    --tab-border-bottom: none;
    z-index: 1;
  }

  &:hover {
    background-color: ${({ "aria-selected": selected }) =>
      selected ? "white" : "#fff"};
    color: #222;
  }

  &:focus {
    outline: 2px solid #2563eb;
    outline-offset: -2px;

    // Add a white (or your background color) border at the bottom
    // that covers the outline
    &::after {
      content: "";
      position: absolute;
      bottom: -1px;
      left: -2px;
      right: -2px;
      height: 3px;
      margin: 0px 3px;
      background-color: var(--background-color, white);
    }
  }
`;

const TabPanel = styled.div`
  padding: 20px;
  margin-top: 0 !important;
  border: 1px solid #ccc;
  border-radius: 10px;
  border-top-left-radius: 0;
`;

const Tabs: React.FC<TabsProps> = ({
  tabs,
  onTabChange,
  containerStyle,
  className,
}) => {
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
            key={index}
            role="tab"
            data-active={index === activeTab}
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
          key={index}
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
