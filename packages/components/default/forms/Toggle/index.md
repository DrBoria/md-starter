```jsx
import { Toggle } from ".";

<>
  <div>
    <h2>Basic Toggle</h2>
    <Toggle title="Click to expand">
      <div style={{ padding: "1rem" }}>
        This is the content that can be toggled.
      </div>
    </Toggle>
  </div>

  <div style={{ marginTop: "2rem" }}>
    <h2>Toggle with Complex Content</h2>
    <Toggle title="Settings Section">
      <div style={{ padding: "1rem" }}>
        <h3>User Settings</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <label>
            Username
            <input type="text" placeholder="Enter username" />
          </label>
          <label>
            Email
            <input type="email" placeholder="Enter email" />
          </label>
        </div>
      </div>
    </Toggle>
  </div>

  <div style={{ marginTop: "2rem" }}>
    <h2>Multiple Toggles</h2>
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Toggle title="Section 1" defaultState={false}>
        <div style={{ padding: "1rem" }}>Content for section 1</div>
      </Toggle>
      <Toggle title="Section 2" defaultState={false}>
        <div style={{ padding: "1rem" }}>Content for section 2</div>
      </Toggle>
      <Toggle title="Section 3" defaultState={false}>
        <div style={{ padding: "1rem" }}>Content for section 3</div>
      </Toggle>
    </div>
  </div>
</>;
```
