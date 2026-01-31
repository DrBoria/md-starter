```jsx
import { Badge } from '.';

<>
  <div>
    <h2>Default Badge</h2>
    <Badge>Default</Badge>
  </div>

  <div>
    <h2>Status Badges</h2>
    <div style={{ display: "flex", gap: "1rem" }}>
      <Badge $status="approval">Approval</Badge>
      <Badge $status="success">Success</Badge>
      <Badge $status="failed">Failed</Badge>
    </div>
  </div>
</>;
```
