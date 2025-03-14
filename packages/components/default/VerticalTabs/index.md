```jsx
import { useState } from "react";
import {
  Badge,
  VerticalTab,
  VerticalTabContent,
  VerticalTabsContainer,
  VerticalTabsList,
} from ".";

<>
  <div>
    <h2>Basic Vertical Tabs</h2>
    <VerticalTabsContainer>
      <VerticalTabsList>
        <VerticalTab $isSelected={true}>
          <div className="subject">First Tab</div>
          <div className="metadata">Some metadata</div>
        </VerticalTab>
        <VerticalTab $isSelected={false}>
          <div className="subject">Second Tab</div>
          <div className="metadata">More metadata</div>
        </VerticalTab>
      </VerticalTabsList>
      <VerticalTabContent>
        <div style={{ padding: "1rem" }}>Tab content goes here</div>
      </VerticalTabContent>
    </VerticalTabsContainer>
  </div>

  <div style={{ marginTop: "2rem" }}>
    <h2>With Badges</h2>
    <VerticalTabsContainer>
      <VerticalTabsList>
        <VerticalTab $isSelected={true}>
          <div className="subject">
            Notifications <Badge>New</Badge>
          </div>
          <div className="metadata">3 unread messages</div>
        </VerticalTab>
        <VerticalTab $isSelected={false}>
          <div className="subject">
            Settings <Badge>Updated</Badge>
          </div>
          <div className="metadata">System preferences</div>
        </VerticalTab>
      </VerticalTabsList>
      <VerticalTabContent>
        <div style={{ padding: "1rem" }}>Tab content goes here</div>
      </VerticalTabContent>
    </VerticalTabsContainer>
  </div>

  <div style={{ marginTop: "2rem" }}>
    <h2>Interactive Example</h2>
    {(() => {
      const [selectedTab, setSelectedTab] = useState(0);
      return (
        <VerticalTabsContainer>
          <VerticalTabsList>
            {["Profile", "Security", "Preferences"].map((tab, index) => (
              <VerticalTab
                key={tab}
                $isSelected={selectedTab === index}
                onClick={() => setSelectedTab(index)}
              >
                <div className="subject">{tab}</div>
                <div className="metadata">Tab {index + 1} content</div>
              </VerticalTab>
            ))}
          </VerticalTabsList>
          <VerticalTabContent>
            <div style={{ padding: "1rem" }}>
              Content for {["Profile", "Security", "Preferences"][selectedTab]}
            </div>
          </VerticalTabContent>
        </VerticalTabsContainer>
      );
    })()}
  </div>
</>;
```
