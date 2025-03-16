# ButtonWithArrow

```jsx
import { ButtonWithArrow } from "admin/components/ui/buttons";

<div>
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
</div>;
```
