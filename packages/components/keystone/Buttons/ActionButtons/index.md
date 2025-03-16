# ActionButtons

```jsx
import { ActionButtons } from "admin/components/ui/buttons";

<>
  {/* Basic Action Buttons */}
  <ActionButtons
    isPristine={false}
    item="Example Item"
    onUpdate={() => console.log("Update clicked")}
    onReset={() => console.log("Reset clicked")}
    onDelete={() => console.log("Delete clicked")}
  />
  ;{/* Pristine State */}
  <ActionButtons
    isPristine={true}
    item="Example Item"
    onUpdate={() => console.log("Update clicked")}
    onReset={() => console.log("Reset clicked")}
    onDelete={() => console.log("Delete clicked")}
  />
  ;{/* Less Buttons Mode */}
  <ActionButtons
    isPristine={false}
    item="Example Item"
    onUpdate={() => console.log("Update clicked")}
    onReset={() => console.log("Reset clicked")}
    onDelete={() => console.log("Delete clicked")}
    lessButtons
  />
</>;
```
