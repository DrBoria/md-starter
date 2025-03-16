# UpdateButton

```jsx
import { UpdateButton } from "admin/components/ui/buttons";

{
  /* Basic Example */
}
<UpdateButton
  isPristine={false}
  onUpdate={() => console.log("Updating...")}
  isVertical={false}
/>;

{
  /* Vertical Layout */
}
<UpdateButton
  isPristine={false}
  onUpdate={() => console.log("Updating...")}
  isVertical={true}
/>;

{
  /* Disabled State (isPristine=true) */
}
<UpdateButton
  isPristine={true}
  onUpdate={() => console.log("Updating...")}
  isVertical={false}
/>;
```
