# Modal Windows
```jsx
import { Button } from "../Button";
import { ModalProvider } from ".";
import { FullScreenModal } from "./FullScreenModal";
import { CentralModal } from "./CentralModal";
import { useModal } from "./useModal";

const { setModalData, setFullScreenData } = useModal();

<>
  <FullScreenModal />
  <CentralModal />
  <Button
    onClick={() => {
      setModalData({
        content: (
          <div>
            <Button onClick={() => setModalData(null)}>Close</Button>
          </div>
        ),
      });
    }}
  >
    Central Modal
  </Button>
  <Button
    onClick={() => {
      setFullScreenData({
        content: (
          <div>
            <Button onClick={() => setFullScreenData(null)}>Close</Button>
          </div>
        ),
      });
    }}
  >
    Full Screen Modal
  </Button>
</>;
```
