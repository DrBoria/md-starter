```jsx
import { CreateItemForm } from "admin/system-components/CreateItemForm";
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
    <CreateItemForm listName="Example" />
  </KeystoneProvider>
</div>;
```
