```jsx
import { useState } from "react";
import { Switch } from ".";

<>
  <div>
    <h2>Basic Switch</h2>
    <Switch
      checked={false}
      onChange={(checked) => console.log("Switch toggled:", checked)}
    />
  </div>

  <div style={{ marginTop: "2rem" }}>
    <h2>Switch with Labels</h2>
    <Switch
      checked={true}
      onChange={(checked) => console.log("Switch toggled:", checked)}
      leftLabel="Off"
      rightLabel="On"
    />
  </div>

  <div style={{ marginTop: "2rem" }}>
    <h2>Switch Sizes</h2>
    <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
      <div>
        <p>Small</p>
        <Switch
          size="small"
          checked={true}
          onChange={(checked) => console.log("Switch toggled:", checked)}
        />
      </div>
      <div>
        <p>Default</p>
        <Switch
          checked={true}
          onChange={(checked) => console.log("Switch toggled:", checked)}
        />
      </div>
    </div>
  </div>

  <div style={{ marginTop: "2rem" }}>
    <h2>Interactive Switch</h2>
    {(() => {
      const [isChecked, setIsChecked] = useState(false);
      return (
        <Switch
          checked={isChecked}
          onChange={setIsChecked}
          leftLabel={isChecked ? "Enabled" : "Disabled"}
          rightLabel={isChecked ? "On" : "Off"}
        />
      );
    })()}
  </div>

  <div style={{ marginTop: "2rem" }}>
    <h2>Switch in Form</h2>
    <div
      style={{
        padding: "1rem",
        border: "1px solid #e5e7eb",
        borderRadius: "0.5rem",
      }}
    >
      <div style={{ marginBottom: "1rem" }}>
        <h3>Notification Settings</h3>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Switch
          checked={true}
          onChange={(checked) => console.log("Email notifications:", checked)}
          leftLabel="Email Notifications"
        />
        <Switch
          checked={false}
          onChange={(checked) => console.log("Push notifications:", checked)}
          leftLabel="Push Notifications"
        />
        <Switch
          checked={true}
          onChange={(checked) => console.log("SMS notifications:", checked)}
          leftLabel="SMS Notifications"
        />
      </div>
    </div>
  </div>
</>;
```
