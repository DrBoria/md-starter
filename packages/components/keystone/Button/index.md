```jsx
import {
  ActionsMenuButton,
  AdminButton,
  Button,
  ButtonLink,
  ButtonWithArrow,
  CreateButton,
  DeleteButton,
  Duplicate,
  MenuButton,
  ResetButton,
  UpdateButton,
} from ".";

<>
  <div>
    <h2>ActionsMenuButton</h2>
    <ActionsMenuButton onDuplicate={console.log} onEdit={console.log} />
  </div>

  <div>
    <h2>Button</h2>
    <Button tone="active">active</Button>
    <Button tone="passive">passive</Button>
    <Button tone="positive">positive</Button>
    <Button tone="warning">warning</Button>
    <Button tone="negative">negative</Button>
    <Button tone="help">help</Button>
  </div>

  <div>
    <h2>AdminButton</h2>
    <AdminButton onClick={console.log}>AdminButton</AdminButton>
  </div>

  <div>
    <h2> ButtonWithArrow</h2>
    <ButtonWithArrow onClick={console.log}>ButtonWithArrow</ButtonWithArrow>
  </div>

  <div>
    <h2> CreateButton</h2>
    <CreateButton listName="ListName" />
  </div>

  <div>
    <h2> DeleteButton</h2>
    <DeleteButton isVertical={false} />
    <DeleteButton isVertical={true} />
  </div>

  <div>
    <h2> Duplicate</h2>
    <Duplicate />
  </div>

  <div>
    <h2> MenuButton</h2>
    <MenuButton>MenuButton</MenuButton>
  </div>

  <div>
    <h2>ResetButton</h2>
    <ResetButton isVertical={false}>ResetButton</ResetButton>
    <ResetButton isVertical={true}>ResetButton Vertical</ResetButton>
  </div>

  <div>
    <h2>UpdateButton</h2>
    <UpdateButton isPristine={false} isVertical={false} />
    <UpdateButton isPristine={true} isVertical={true} />
  </div>

  <div>
    <h2>ButtonLink</h2>
    <ButtonLink href={"/create"} icon="PlusIcon" text="ButtonLink" />
  </div>
</>;
```
