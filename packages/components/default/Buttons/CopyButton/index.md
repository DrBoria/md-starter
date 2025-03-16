# CopyButton

```jsx
import { useState } from "react";
import { CopyButton } from "admin/components/ui/buttons";

{
  /* Basic Example */
}
<CopyButton value="id" />;

{
  /* With Success State */
}
{
  (() => {
    const [copied, setCopied] = useState(false);
    return (
      <CopyButton
        value="Copy me!"
        onCopy={() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}
        copied={copied}
      />
    );
  })();
}

{
  /* With Custom Text */
}
<CopyButton value="custom-id" text="Copy ID" />;

{
  /* With Loading State */
}
<CopyButton value="loading-example" isLoading />;

{
  /* Disabled State */
}
<CopyButton value="disabled-example" disabled />;
```
