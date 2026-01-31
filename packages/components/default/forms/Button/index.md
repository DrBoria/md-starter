```jsx
import { Button } from ".";

<>
  <div className="space-y-8">
    {/* Basic Tones */}
    <div>
      <h2>Button Tones</h2>
      <div className="flex gap-2 flex-wrap">
        <Button text="Active" />
        <Button text="Passive" tone="passive" />
        <Button text="Neutral" tone="neutral" />
        <Button text="Positive" tone="positive" />
        <Button text="Warning" tone="warning" />
        <Button text="Negative" tone="negative" />
        <Button text="Help" tone="help" />
      </div>
    </div>

    {/* Sizes */}
    <div>
      <h2>Button Sizes</h2>
      <div className="flex items-center gap-2 flex-wrap">
        <Button text="Small" size="small" />
        <Button text="Medium" />
        <Button text="Large" size="large" />
      </div>
    </div>

    {/* Weights */}
    <div>
      <h2>Button Weights</h2>
      <div className="flex gap-2 flex-wrap">
        <Button text="Bold" />
        <Button text="Hollow" weight="hollow" />
        <Button text="Light" weight="light" />
        <Button text="Link" weight="link" />
        <Button text="Outline" weight="outline" />
      </div>
    </div>

    {/* States */}
    <div>
      <h2>Button States</h2>
      <div className="flex gap-2 flex-wrap">
        <Button text="Disabled" disabled />
        <Button text="Loading" isLoading />
        <Button text="With Icon" icon="Globe" />
      </div>
    </div>

    {/* Full Width */}
    <div>
      <h2>Full Width</h2>
      <div className="w-full max-w-sm">
        <Button text="Full Width Button" fullWidth />
      </div>
    </div>
  </div>
</>;
```
