import React, { useState } from "react";
import styled, { TDefaultTheme } from "styled-components";
import { withOffsetBottom, withOffsetsRight, TWithBasicElementOffsets, TFullWidth } from '@md/styles';

type Tab = {
  title: string | React.ReactNode;
};

const TabList = styled.div<TWithBasicElementOffsets & TFullWidth>`
  display: flex;
  margin-right: ${withOffsetsRight};
  margin-bottom: ${withOffsetBottom};
`;

const TabItem = styled.div<{ active: boolean; theme: TDefaultTheme }>`
  padding: ${({ theme }: {theme: TDefaultTheme}) => theme.offsets.elementContent};

  background-color: ${({ active, theme }) => (active ?  theme.colors.highlighted : theme.colors.section)};
  color: ${({ active, theme }) => (active ?  theme.colors.highlightedText : theme.colors.sectionContent)};
  cursor: pointer;
`;

type TTabProps = {
  tabs: Tab[]; onActiveTabSet: (index: number) => void;
}& TWithBasicElementOffsets &
TFullWidth;

const Tabs = ({ tabs, onActiveTabSet, ...props }: TTabProps) => {
  const [activeTab, setActiveTab] = useState(0);

  function handleTabClick(tabIndex: number) {
        setActiveTab(tabIndex);
        onActiveTabSet(tabIndex);
    }

  return (
    <TabList {...props}>
      {tabs.map((tab, index) => (
        <TabItem
          key={index}
          active={activeTab === index}
          onClick={() => handleTabClick(index)}
        >
          {tab.title}
        </TabItem>
        ))}
    </TabList>
  );
};

export default Tabs;
