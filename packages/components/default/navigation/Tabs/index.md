```jsx
import { Tabs } from ".";

<>
  <div>
    <h2>Basic Tabs</h2>
    <Tabs
      tabs={[
        {
          label: "Tab 1",
          content: <div>Content for Tab 1</div>,
        },
        {
          label: "Tab 2",
          content: <div>Content for Tab 2</div>,
        },
        {
          label: "Tab 3",
          content: <div>Content for Tab 3</div>,
        },
      ]}
    />
  </div>

  <div style={{ marginTop: "2rem" }}>
    <h2>Tabs with Complex Content</h2>
    <Tabs
      tabs={[
        {
          label: "Information",
          content: (
            <div>
              <h3>Detailed Information</h3>
              <p>This is a paragraph with more detailed information.</p>
              <ul>
                <li>List item 1</li>
                <li>List item 2</li>
                <li>List item 3</li>
              </ul>
            </div>
          ),
        },
        {
          label: "Settings",
          content: (
            <div>
              <h3>Settings Panel</h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <label>
                  Setting 1
                  <input type="text" />
                </label>
                <label>
                  Setting 2
                  <input type="text" />
                </label>
              </div>
            </div>
          ),
        },
      ]}
      onTabChange={(tabIndex) => console.log("Tab changed to:", tabIndex)}
    />
  </div>
</>;
```
