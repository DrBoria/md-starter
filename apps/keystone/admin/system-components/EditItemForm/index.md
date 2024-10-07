```jsx
import { EditItemForm } from "admin/system-components/EditItemForm";
import { KeystoneProvider } from "admin/utils/ui-kit/KeystoneProvider";

// KeystoneProvider is only for UI-KIT
// Don't use it in application

<div>
  <p>
    <h1>For more information visit: </h1>
    <b>
      <i>/keystone/schema/Example.ts</i>
    </b>
  </p>
  <KeystoneProvider>
    <EditItemForm listName="Example" itemId="clwhicocf000032hpxm9i2b5r" />
  </KeystoneProvider>
</div>;
```
