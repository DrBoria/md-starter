```jsx
import {
  ErrorValidationContainer,
  ErrorValidationMessage,
} from ".";

<>
  <div>
    <h2>Error Message</h2>
    <ErrorValidationMessage>This field is required</ErrorValidationMessage>
  </div>

  <div style={{ marginTop: "2rem" }}>
    <h2>Error Container</h2>
    <ErrorValidationContainer $isError={true}>
      <div style={{ padding: "1rem" }}>
        <input
          type="text"
          placeholder="Type something..."
          style={{ width: "100%", padding: "0.5rem" }}
        />
        <ErrorValidationMessage>
          Please enter a valid value
        </ErrorValidationMessage>
      </div>
    </ErrorValidationContainer>
  </div>

  <div style={{ marginTop: "2rem" }}>
    <h2>No Error State</h2>
    <ErrorValidationContainer $isError={false}>
      <div style={{ padding: "1rem" }}>
        <input
          type="text"
          placeholder="Type something..."
          style={{ width: "100%", padding: "0.5rem" }}
        />
      </div>
    </ErrorValidationContainer>
  </div>
</>;
```
