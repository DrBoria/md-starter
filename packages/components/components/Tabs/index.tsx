import React, { useState } from "react";
import styled from "styled-components";

interface TabProps {
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: TabProps[];
  onTabChange?: (tabNumber: number) => void;
}

const TabsContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const TabList = styled.div`
  display: flex;
  cursor: pointer;
`;

const Tab = styled.div<{ active: boolean }>`
  padding: 10px 20px;
  background-color: ${({ active }) => (active ? "#eff6ff" : "transparent")};
  color: ${({ active }) => (active ? "#2563eb" : "#6b7280")};
  border: 1px solid #ccc;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  border-bottom: none;
  margin-right: 5px;
  &:hover {
    background-color: ${({ active }) => (active ? "#eff6ff" : "#ccc")};
    background-color: ${({ active }) => (active ? "#eff6ff" : "#ccc")};
  }
`;

const TabContent = styled.div`
  padding: 20px;
  border: 1px solid #ccc;
`;

const Tabs: React.FC<TabsProps> = ({ tabs, onTabChange }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    onTabChange && onTabChange(index);
  };

  return (
    <TabsContainer>
      <TabList>
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            active={index === activeTab}
            onClick={() => handleTabClick(index)}
          >
            {tab.label}
          </Tab>
        ))}
      </TabList>
      <TabContent>{tabs[activeTab].content}</TabContent>
    </TabsContainer>
  );
};

export { Tabs };
