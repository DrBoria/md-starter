# ExpandButton

```jsx
import { useState } from "react";
import { ExpandButton } from "admin/components/ui/buttons";

{
  /* Basic Example */
}
<div
  style={{ position: "relative", height: "100px", border: "1px solid #ccc" }}
>
  <ExpandButton isExpanded={false} onClick={() => console.log("Clicked")} />
</div>;

{
  /* Interactive Example */
}
{
  (() => {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
      <div
        style={{
          position: "relative",
          height: "100px",
          border: "1px solid #ccc",
          marginTop: "1rem",
        }}
      >
        <ExpandButton
          isExpanded={isExpanded}
          onClick={() => setIsExpanded(!isExpanded)}
        />
      </div>
    );
  })();
}

{
  /* Disabled State */
}
<div
  style={{
    position: "relative",
    height: "100px",
    border: "1px solid #ccc",
    marginTop: "1rem",
  }}
>
  <ExpandButton isExpanded={false} disabled />
</div>;

{
  /* With Loading State */
}
<div
  style={{
    position: "relative",
    height: "100px",
    border: "1px solid #ccc",
    marginTop: "1rem",
  }}
>
  <ExpandButton isExpanded={false} isLoading />
</div>;
```
