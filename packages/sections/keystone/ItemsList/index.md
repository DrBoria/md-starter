```jsx
import { ItemsList } from ".";
import { KeystoneProvider } from "../utils/ui-kit/KeystoneProvider";

// KeystoneProvider is only for UI-KIT
// Don't use it in application
<div>
  <p style={{ marginBottom: "30px" }}>
    <h1>For more information visit: </h1>
    <b>
      <i>/keystone/schema/Example.ts</i>
    </b>
  </p>
  <div style={{ overflowX: "auto" }}>
    <div
      style={{
        display: "flex",
        width: "200%",
        gap: "50px",
        paddingLeft: "30px",
      }}
    >
      <b style={{ width: "50px" }}>Text</b>
      <b style={{ width: "40px" }}>Float</b>
      <b style={{ width: "40px" }}>Integer</b>
      <b style={{ width: "50px" }}>Big Int</b>
      <b>Json</b>
      <b style={{ width: "40px" }}>Password</b>
      <b>Select</b>
      <b style={{ width: "60px" }}>Calendar Day</b>
      <b style={{ width: "45px" }}>Multiselect</b>
      <b style={{ width: "50px" }}>Checkbox</b>
      <b style={{ width: "80px" }}>Timestamp Last Modified</b>
      <b style={{ width: "80px" }}>Timestamp Created At</b>
      <b style={{ width: "45px" }}>Text Area With Variables Field</b>
      <b style={{ width: "150px" }}>Shorted Text Field</b>
      <b style={{ width: "100px" }}>Shorted Text Field Read Only</b>
    </div>
    <KeystoneProvider>
      <ItemsList listName="Example" />
    </KeystoneProvider>
  </div>
</div>;
```
