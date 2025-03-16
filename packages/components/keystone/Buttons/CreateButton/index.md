# CreateButton

```jsx
import { CreateButton } from "admin/components/ui/buttons";

{
  /* Basic Example */
}
<CreateButton listName="ListName" />;

{
  /* With Custom Icon */
}
<CreateButton listName="Custom" icon="PlusCircle" />;

{
  /* Without Icon */
}
<CreateButton listName="No Icon" showIcon={false} />;

{
  /* With Loading State */
}
<CreateButton listName="Loading" isLoading />;

{
  /* Disabled State */
}
<CreateButton listName="Disabled" disabled />;

{
  /* With Custom Text Format */
}
<CreateButton listName="Item" customText="Add New {listName}" />;
```
