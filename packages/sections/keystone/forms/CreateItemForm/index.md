```jsx
import { CreateItemForm } from ".";
import { KeystoneProvider } from "../../common/utils/ui-kit/KeystoneProvider";

// KeystoneProvider is only for UI-KIT
// Don't use it in application

<div>
  <div style={{ marginBottom: "30px" }}>
    <h1>For more information visit: </h1>
    <b>
      <i>/keystone/schema/Example.ts</i>
    </b>
  </div>
  <KeystoneProvider>
    <CreateItemForm listName="Example" />
  </KeystoneProvider>
</div>
```
