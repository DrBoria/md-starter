```jsx
import Breadcrumbs from '.';

<>
  <div>
    <h2>Single Level</h2>
    <Breadcrumbs items={[{ label: "Dashboard" }]} />
  </div>

  <div>
    <h2>Multiple Levels</h2>
    <Breadcrumbs
      items={[
        { label: "Users", link: "/users" },
        { label: "Settings", link: "/users/settings" },
        { label: "Profile" },
      ]}
    />
  </div>
</>;
```
