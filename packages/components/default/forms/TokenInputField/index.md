```jsx
import { useState } from "react";
import { TokenInputField } from ".";

<>
  <div>
    <h2>Basic Token Input</h2>
    <TokenInputField
      field={{
        label: "API Token",
        path: "apiToken",
        description: "Enter your API token",
      }}
      value="secret-token-123"
      onChange={(value) => console.log("Token changed:", value)}
    />
  </div>

  <div style={{ marginTop: "2rem" }}>
    <h2>Empty Token Input</h2>
    <TokenInputField
      field={{
        label: "Access Key",
        path: "accessKey",
        description: "Enter your access key",
      }}
      value=""
      onChange={(value) => console.log("Token changed:", value)}
    />
  </div>

  <div style={{ marginTop: "2rem" }}>
    <h2>Read Only Token</h2>
    <TokenInputField
      field={{
        label: "Read Only Token",
        path: "readOnlyToken",
        description: "This token cannot be modified",
      }}
      value="readonly-token-456"
      readOnly
    />
  </div>

  <div style={{ marginTop: "2rem" }}>
    <h2>Interactive Token Input</h2>
    {(() => {
      const [token, setToken] = useState("my-secret-token");
      return (
        <TokenInputField
          field={{
            label: "Interactive Token",
            path: "interactiveToken",
            description: "Try typing to change the token",
          }}
          value={token}
          onChange={setToken}
          autoFocus
        />
      );
    })()}
  </div>
</>;
```
