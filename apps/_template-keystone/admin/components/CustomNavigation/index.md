```jsx
const { Navigation: KeystoneNavigation } = require("@keystone-6/core/admin-ui/components");
const { Navigation } = require("admin/system-components/Navigation");
const { KeystoneProvider } = require("../utils/ui-kit/KeystoneProvider");

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
</>
```
