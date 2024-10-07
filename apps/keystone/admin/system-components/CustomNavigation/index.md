```jsx
import { Navigation as KeystoneNavigation } from "@keystone-6/core/admin-ui/components";
import { Navigation } from "admin/system-components/Navigation";
import { KeystoneProvider } from "admin/utils/ui-kit/KeystoneProvider";

// KeystoneProvider is only for UI-KIT
// Don't use it in application
<>
  <KeystoneProvider>
    <KeystoneNavigation />
  </KeystoneProvider>

  <h1>Navigation with custom styles</h1>
  <KeystoneProvider>
    <Navigation />
  </KeystoneProvider>
</>;
```
