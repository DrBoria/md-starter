# Styled Buttons

```jsx
import { ActionsMenuButton } from ".";
import { AdminButton } from ".";
import { ButtonLink } from ".";
import { ButtonWithArrow } from ".";
import { CopyButton } from ".";
import { CreateButton } from ".";
import { DeleteButton } from ".";
import { DuplicateButton } from ".";
import { ExpandButton } from ".";
import { ResetButton } from ".";
import { UpdateButton } from ".";

<div>
  {/* Basic Examples */}
  <ActionsMenuButton>ActionsMenuButton</ActionsMenuButton>
  <ActionsMenuButton disabled>Disabled Menu</ActionsMenuButton>
  <ActionsMenuButton size="sm">Small Menu</ActionsMenuButton>
  {/* Different Sizes */}
  <ActionsMenuButton size="large">Large Menu</ActionsMenuButton>
  <ActionsMenuButton size="xl">Extra Large Menu</ActionsMenuButton>
  {/* With Loading State */}
  <ActionsMenuButton isLoading>Loading Menu</ActionsMenuButton>
  {/* With Custom Icon */}
  <ActionsMenuButton icon="HamburgerIcon">Custom Icon</ActionsMenuButton>
  {/* Basic Examples */}
  <AdminButton onClick={console.log}>AdminButton</AdminButton>
  <AdminButton onClick={console.log} disabled>
    Disabled Admin Button
  </AdminButton>
  {/* With Loading State */}
  <AdminButton onClick={console.log} isLoading>
    Loading State
  </AdminButton>
  {/* With Icon */}
  <AdminButton onClick={console.log} icon="SettingsIcon">
    With Icon
  </AdminButton>
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
  {/* Basic Examples */}
  <ButtonWithArrow onClick={console.log}>ButtonWithArrow</ButtonWithArrow>
  <ButtonWithArrow onClick={console.log} direction="left">
    Left Arrow
  </ButtonWithArrow>
  {/* Different Directions */}
  <ButtonWithArrow onClick={console.log} direction="up">
    Up Arrow
  </ButtonWithArrow>
  <ButtonWithArrow onClick={console.log} direction="down">
    Down Arrow
  </ButtonWithArrow>
  {/* With Loading State */}
  <ButtonWithArrow onClick={console.log} isLoading>
    Loading
  </ButtonWithArrow>
  {/* With Custom Text */}
  <CopyButton value="custom-id" text="Copy ID" />
  {/* With Loading State */}
  <CopyButton value="loading-example" isLoading />
  {/* Disabled State */}
  <CopyButton value="disabled-example" disabled />


{/* Basic Example */}
<CreateButton listName="ListName" />;

{ /* With Custom Icon */}
<CreateButton listName="Custom" icon="PlusCircle" />;

{/* Without Icon */}
<CreateButton listName="No Icon" showIcon={false} />;

{/* With Loading State */}
<CreateButton listName="Loading" isLoading />;

{/* Disabled State */}
<CreateButton listName="Disabled" disabled />;

{/* With Custom Text Format */}
<CreateButton listName="Item" customText="Add New {listName}" />

{/* Basic Example */}
<DeleteButton onDelete={() => console.log("Deleting...")} isVertical={false} />;

{/* Vertical Layout */}
<DeleteButton onDelete={() => console.log("Deleting...")} isVertical={true} />;


{/* Basic Example */}
<DuplicateButton />;

{/* Loading State */}
<DuplicateButton isLoading />;

{/* With Custom Text */}
<DuplicateButton text="Clone Item" />;

{/* Disabled State */}
<DuplicateButton disabled />;

{/* With Custom Icon */}
<DuplicateButton icon="Copy" />;

{/* With Success State */}
<DuplicateButton success text="Duplicated!" />;


{/* Basic Example */}
<div
  style={{ position: "relative", height: "100px", border: "1px solid #ccc" }}
>
  <ExpandButton isExpanded={false} onClick={() => console.log("Clicked")} />
</div>;

{/* Disabled State */}
<div
  style={{  position: "relative",
    height: "100px",
    border: "1px solid #ccc",
    marginTop: "1rem",
  }}
>
  <ExpandButton isExpanded={false} disabled />
</div>;

{/* With Loading State */}
<div
  style={{  position: "relative",
    height: "100px",
    border: "1px solid #ccc",
    marginTop: "1rem",
  }}
>
  <ExpandButton isExpanded={false} isLoading />
</div>


{/* Basic Example */}
<ResetButton onReset={() => console.log("Resetting...")} isVertical={false} />

{/* Vertical Layout */}
<ResetButton onReset={() => console.log("Resetting...")} isVertical={true} />


{/* Basic Example */}
<UpdateButton
  isPristine={false}
  onUpdate={() => console.log("Updating...")}
  isVertical={false}
/>

{/* Vertical Layout */}
<UpdateButton
  isPristine={false}
  onUpdate={() => console.log("Updating...")}
  isVertical={true}
/>

{/* Disabled State (isPristine=true) */}
<UpdateButton
  isPristine={true}
  onUpdate={() => console.log("Updating...")}
  isVertical={false}
/>
</div>;
```
