```jsx
import { NotFoundSection } from ".";

<>
  <div>
    <h2>Basic Not Found</h2>
    <NotFoundSection name="contact" />
  </div>

  <div style={{ marginTop: "2rem" }}>
    <h2>With Import Button</h2>
    <NotFoundSection
      name="contact"
      buttonText="Import Contacts"
      onClick={() => console.log("Import clicked")}
    />
  </div>

  <div style={{ marginTop: "2rem" }}>
    <h2>Custom Entity</h2>
    <NotFoundSection
      name="template"
      buttonText="Create Template"
      onClick={() => console.log("Create clicked")}
    />
  </div>
</>;
```
