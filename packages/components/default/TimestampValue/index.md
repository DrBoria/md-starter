```jsx
import { TimestampValue } from ".";

<>
  <div>
    <h2>Basic Timestamp</h2>
    <TimestampValue date="2024-03-15" time="14:30" />
  </div>

  <div style={{ marginTop: "2rem" }}>
    <h2>Date Only</h2>
    <TimestampValue date="2024-03-15" time="" />
  </div>

  <div style={{ marginTop: "2rem" }}>
    <h2>Time Only</h2>
    <TimestampValue date="" time="14:30" />
  </div>

  <div style={{ marginTop: "2rem" }}>
    <h2>Multiple Timestamps</h2>
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <TimestampValue date="2024-03-15" time="09:00" />
      <TimestampValue date="2024-03-15" time="14:30" />
      <TimestampValue date="2024-03-15" time="18:45" />
    </div>
  </div>
</>;
```
