```jsx
const { BasicSection } = require("../../layout/Containers");
const ProgressBar = require(".").default || require(".");
const { dark } = require("@md/styles");
const tabs = [{ title: "Tab 1" }, { title: "Tab 2" }, { title: "Tab 3" }];
<>
  <ProgressBar percentage={20} $offsetBottom />
</>
```
