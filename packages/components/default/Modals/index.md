```jsx
import { Button } from "admin/components/core/Button";
import {
  DeleteTemplate,
  SubmitTemplate,
} from "admin/components/core/Modals/CentralModal";
import { FileUpload } from "admin/components/core/Modals/CentralModal/fileUploadTemplate";

// Note: The actual modal components (CentralModal, FullScreenModal, SideBarModal)
// cannot be demonstrated here as they need to be mounted to document.body
// These are the template components that are used within the modals

<>
  <div>
    <h2>Delete Template</h2>
    <DeleteTemplate
      item="Example Item"
      onCancel={() => console.log("Cancel clicked")}
      onDelete={() => console.log("Delete clicked")}
    />
  </div>

  <div style={{ marginTop: "2rem" }}>
    <h2>Submit Template</h2>
    <SubmitTemplate
      actionName="publish"
      title="Publish Confirmation"
      messageText="Are you sure you want to publish this item?"
      onCancel={() => console.log("Cancel clicked")}
      onSubmit={() => console.log("Submit clicked")}
    />
  </div>

  <div style={{ marginTop: "2rem" }}>
    <h2>File Upload Template</h2>
    <FileUpload
      title="Upload Documents"
      onUploaded={(data) => console.log("Uploaded:", data)}
      acceptedFileTypes={["pdf", "doc", "docx"]}
      withName
      withDescription
    />
  </div>
</>;
```
