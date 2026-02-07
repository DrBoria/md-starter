import React, { useState } from "react";
import { TabsContainer, TabList, TabButton, TabPanel } from "./styles";

export interface TabItem {
  label: string | React.ReactNode;
  content: React.ReactNode;
  id?: string;
}

interface TabsProps {
  tabs: TabItem[];
  orientation?: 'horizontal' | 'vertical';
  defaultActiveTab?: number;
  onTabChange?: (tabNumber: number) => void;
  containerStyle?: React.CSSProperties;
  className?: string;
  expanded?: boolean; // For vertical layout height
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  orientation = 'horizontal',
  defaultActiveTab = 0,
  onTabChange,
  containerStyle,
  className,
  expanded,
}) => {
  const [activeTab, setActiveTab] = useState<number>(defaultActiveTab);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    onTabChange && onTabChange(index);
  };

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === "Enter" || event.key === " ") {
      handleTabClick(index);
    } else if (event.key === "ArrowRight" && orientation === 'horizontal') {
      const nextTab = (index + 1) % tabs.length;
      handleTabClick(nextTab);
    } else if (event.key === "ArrowLeft" && orientation === 'horizontal') {
      const prevTab = (index - 1 + tabs.length) % tabs.length;
      handleTabClick(prevTab);
    } else if (event.key === "ArrowDown" && orientation === 'vertical') {
      const nextTab = (index + 1) % tabs.length;
      handleTabClick(nextTab);
    } else if (event.key === "ArrowUp" && orientation === 'vertical') {
      const prevTab = (index - 1 + tabs.length) % tabs.length;
      handleTabClick(prevTab);
    }
  };

  return (
    <TabsContainer
      className={className}
      $orientation={orientation}
      $expanded={expanded}
      data-orientation={orientation}
    >
      <TabList className="tab-list" $orientation={orientation} role="tablist" data-orientation={orientation}>
        {tabs.map((tab, index) => (
          <TabButton
            className="tab-button"
            key={index}
            role="tab"
            $active={index === activeTab}
            $orientation={orientation}
            onClick={() => handleTabClick(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            id={`tab-${index}`}
            aria-controls={`panel-${index}`}
            aria-selected={index === activeTab}
            tabIndex={index === activeTab ? 0 : -1}
            data-state={index === activeTab ? 'active' : 'inactive'}
            data-orientation={orientation}
          >
            {tab.label}
          </TabButton>
        ))}
      </TabList>
      {tabs.map((tab, index) => (
        <TabPanel
          key={index}
          role="tabpanel"
          id={`panel-${index}`}
          aria-labelledby={`tab-${index}`}
          hidden={index !== activeTab}
          $orientation={orientation}
          style={index === activeTab ? containerStyle : { display: 'none' }}
        >
          {tab.content}
        </TabPanel>
      ))}
    </TabsContainer>
  );
};

export { Tabs };
