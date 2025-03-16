```jsx
import Tabs from ".";
import { dark } from "@md/styles";
const tabs = [{ title: "Tab 1" }, { title: "Tab 2" }, { title: "Tab 3" }];
<>
  <Tabs tabs={tabs} onActiveTabSet={console.log} />
</>;
```
