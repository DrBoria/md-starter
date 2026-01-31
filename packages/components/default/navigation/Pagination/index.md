```jsx
import { useState } from "react";
import { Pagination } from ".";

<>
  <div>
    <h2>Basic Pagination</h2>
    <Pagination
      totalPages={5}
      currentPage={1}
      onPageChange={(page) => console.log("Page changed to:", page)}
    />
  </div>

  <div style={{ marginTop: "2rem" }}>
    <h2>Many Pages</h2>
    <Pagination
      totalPages={20}
      currentPage={7}
      onPageChange={(page) => console.log("Page changed to:", page)}
    />
  </div>

  <div style={{ marginTop: "2rem" }}>
    <h2>Interactive Pagination</h2>
    {(() => {
      const [currentPage, setCurrentPage] = useState(1);
      return (
        <div>
          <Pagination
            totalPages={10}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
          <div style={{ marginTop: "1rem" }}>Current Page: {currentPage}</div>
        </div>
      );
    })()}
  </div>
</>;
```
