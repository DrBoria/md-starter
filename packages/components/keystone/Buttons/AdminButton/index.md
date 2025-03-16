# AdminButton

```jsx
import { AdminButton } from "admin/components/ui/buttons";

<div>
  {/* Basic Examples */}
  <AdminButton onClick={console.log}>AdminButton</AdminButton>
  <AdminButton onClick={console.log} disabled>
    Disabled Admin Button
  </AdminButton>

  {/* With Loading State */}
  <AdminButton onClick={console.log} isLoading>
    Loading State
  </AdminButton>

  {/* With Icon */}
  <AdminButton onClick={console.log} icon="SettingsIcon">
    With Icon
  </AdminButton>
</div>;
```
