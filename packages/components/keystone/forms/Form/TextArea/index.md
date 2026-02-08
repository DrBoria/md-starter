```jsx
const { useState } = require("react");
const { TextArea } = require(".");

const [text, setText] = useState("");

return (
  <>
    <h2>Auto complete</h2>
    <TextArea
      placeholder="Placeholder of textarea"
      value={text}
      onChange={(e) => setText(e.target.value)}
      plugin="auto-complete"
      variables={[
        "Apple",
        "Banana",
        "Baanana",
        "Baaanana",
        "Cherry",
        "Date",
        "Elderberry",
        "Fig",
        "Grape",
        "Honeydew",
        "Iced Raspberry",
        "Jackfruit",
      ]}
    />

    <h2>With Variables</h2>
    <TextArea
      placeholder="Placeholder of textarea"
      value={text}
      onChange={(e) => setText(e.target.value)}
      plugin="variables"
      variables={[
        "Apple",
        "Banana",
        "Baanana",
        "Baaanana",
        "Cherry",
        "Date",
        "Elderberry",
        "Fig",
        "Grape",
        "Honeydew",
        "Iced Raspberry",
        "Jackfruit",
      ]}
    />
  </>
);
```
