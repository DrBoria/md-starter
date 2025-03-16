# ButtonLink

```jsx
import { ButtonLink } from "admin/components/ui/buttons";

<div>
  {/* Basic Examples */}
  <ButtonLink href={"/create"} icon="Plus" text="ButtonLink" />
  <ButtonLink href={"/edit"} icon="Pencil" text="Edit Link" />
  <ButtonLink href={"/view"} text="No Icon Link" />

  {/* With Different Icons */}
  <ButtonLink href={"/settings"} icon="SettingsIcon" text="Settings" />
  <ButtonLink href={"/delete"} icon="TrashIcon" text="Delete" tone="danger" />

  {/* Different Tones */}
  <ButtonLink href={"/primary"} text="Primary Link" tone="primary" />
  <ButtonLink href={"/secondary"} text="Secondary Link" tone="secondary" />

  {/* With Loading State */}
  <ButtonLink href={"/loading"} text="Loading Link" isLoading />

  {/* Disabled State */}
  <ButtonLink href={"/disabled"} text="Disabled Link" disabled />

  {/* With External Link */}
  <ButtonLink
    href="https://example.com"
    text="External Link"
    external
    icon="ExternalLinkIcon"
  />
</div>;
```
