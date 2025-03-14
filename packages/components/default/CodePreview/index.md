```jsx
import { CodePreview } from ".";

<>
  <div>
    <h2>String Content</h2>
    <CodePreview rawValue='{"name": "John Doe", "age": 30}' />
  </div>

  <div style={{ marginTop: "2rem" }}>
    <h2>Object Content</h2>
    <CodePreview
      rawValue={{
        user: {
          name: "John Doe",
          email: "john@example.com",
          preferences: {
            theme: "dark",
            notifications: true,
          },
        },
        settings: {
          language: "en",
          timezone: "UTC",
        },
      }}
    />
  </div>

  <div style={{ marginTop: "2rem" }}>
    <h2>Custom Styled</h2>
    <CodePreview
      rawValue='{"status": "success", "message": "Operation completed"}'
      className="bg-gray-50 rounded-lg"
    />
  </div>
</>;
```
