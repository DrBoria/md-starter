```jsx
import { Checkbox, Input, MultiSelect, Select } from "./index";

<>
  <h2>Input</h2>
  <Input />
  <h2>Checkbox</h2>
  <Checkbox />
  <h2>Select</h2>
  <Select
    value={{ label: "1", value: "1" }}
    onChange={console.log}
    options={[
      { label: "1", value: "1" },
      { label: "2", value: "2" },
    ]}
  />
  <h2>MultiSelect</h2>
  <MultiSelect
    value={[{ label: "1", value: "1" }]}
    onChange={console.log}
    options={[
      { label: "1", value: "1" },
      { label: "2", value: "2" },
      { label: "3", value: "3" },
    ]}
  />
</>;
```
