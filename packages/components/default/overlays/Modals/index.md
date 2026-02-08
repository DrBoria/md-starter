# Modal Windows

The ModalProvider is already provided by the Wrapper component. Use the `useModal` hook inside a component.

```jsx
import { Button } from "../../forms/Button";
import { FullScreenModal, CentralModal, useModal, ModalProvider } from ".";

const ModalDemo = () => {
  var { setModalData, setFullScreenData } = useModal();
  
  return (
    <>
      <FullScreenModal />
      <CentralModal />
      <div style={{ display: 'flex', gap: 10 }}>
        <Button
          text="Open Central Modal"
          onClick={() => {
            setModalData({
              content: (
                <div>
                  <h3 style={{ marginBottom: 16 }}>Viking Modal</h3>
                  <p style={{ marginBottom: 16 }}>This modal features the stone slab aesthetic with cut corners.</p>
                  <Button text="Close" onClick={() => setModalData(null)} />
                </div>
              ),
            });
          }}
        />
        <Button
          text="Open Full Screen Modal"
          onClick={() => {
            setFullScreenData({
              content: (
                <div>
                  <Button text="Close" onClick={() => setFullScreenData(null)} />
                </div>
              ),
            });
          }}
        />
      </div>
    </>
  );
};

<ModalProvider>
  <ModalDemo />
</ModalProvider>
```
