```jsx
import Modal from '.';

const [$isOpen, setIsOpen] = React.useState(false);
<div style={{ height: '600px', width: '600px' }}>
  <button onClick={() => setIsOpen(!$isOpen)}>Open Modal</button>
  <Modal open={$isOpen} handleClose={() => setIsOpen(!$isOpen)}>
    <div>
      <h1>Some child content</h1>
      <span>Child context description</span>
    </div>
  </Modal>
</div>;
```
