```jsx
import { useState } from "react";
import { HtmlEditor } from ".";

<>
  <div>
    <h2>Basic HTML Editor</h2>
    <HtmlEditor
      initialValue="<h1>Hello World</h1><p>This is a basic HTML editor.</p>"
      onSave={(value) => console.log("Saved:", value)}
    />
  </div>

  <div style={{ marginTop: "2rem" }}>
    <h2>Full Height Editor</h2>
    <div style={{ height: "400px" }}>
      <HtmlEditor
        fullHeight
        initialValue="<div>This editor takes up the full height of its container.</div>"
        onSave={(value) => console.log("Saved:", value)}
      />
    </div>
  </div>

  <div style={{ marginTop: "2rem" }}>
    <h2>Interactive Editor</h2>
    {(() => {
      const [content, setContent] = useState("<p>Edit this content</p>");
      return (
        <div>
          <HtmlEditor initialValue={content} onSave={setContent} />
          <div style={{ marginTop: "1rem" }}>
            <h3>Preview:</h3>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
      );
    })()}
  </div>
</>;
```
