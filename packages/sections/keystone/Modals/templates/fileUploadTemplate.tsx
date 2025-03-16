import React, { useCallback, useRef, useState } from "react";
import { Button } from "@keystone-ui/button";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";

import { Input } from "@md/components";
import { ProgressBar } from "@md/components";
import { TextArea } from "@md/components/keystone";
import { HeaderText, PlainText } from "@md/components";

const Dropzone = styled.div<{ $isDragActive: boolean }>`
  border: 2px dashed #cccccc;
  background: #f9f9f9;
  padding: 40px;
  text-align: center;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.3s ease-in-out;
  margin-bottom: 1rem;

  ${({ $isDragActive }) =>
    $isDragActive &&
    `
      background-color: #e6f7ff;
      border-color: #1890ff;
    `};
`;

const Message = styled.p<{ $error: boolean }>`
  color: ${(props) => (props.$error ? "#ff4d4f" : "#52c41a")};
  font-size: 14px;
  margin-top: 10px;
`;

const mapExtensionsToMime = (extensions: string[]) => {
  const mimeMap: Record<string, string[]> = {
    "text/plain": ["txt"],
    "text/markdown": ["md"],
    "text/csv": ["csv", "tsv"],
    "application/pdf": ["pdf"],
    "application/msword": ["doc"],
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
      "docx",
    ],
    "application/vnd.oasis.opendocument.text": ["odt"],
    "application/vnd.ms-excel": ["xls"],
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
      "xlsx",
    ],
    "application/vnd.ms-powerpoint": ["ppt"],
    "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      ["pptx"],
    "application/epub+zip": ["epub"],
    "application/xml": ["xml"],
    "text/xml": ["xml"],
    "application/rtf": ["rtf"],
    "message/rfc822": ["eml"],
    "text/html": ["html"],
    "application/vnd.ms-outlook": ["msg"],
    "application/x-tasks": ["tsk"],
    "text/tab-separated-values": ["tsv"],
    "": [".fb2", ".rst"],
  };

  // Extensions, that have "" mime type
  const specialExtensions = new Set(["fb2", "rst"]);
  const result = {} as Record<string, string[]>;

  extensions.forEach((ext) => {
    let found = false;
    for (const [mimeType, extList] of Object.entries(mimeMap)) {
      if (extList.includes(ext)) {
        result[mimeType] = extList;
        found = true;
      }
    }
    if (!found && specialExtensions.has(ext)) {
      if (!result[""]) result[""] = [];
      result[""].push(`.${ext}`);
    }
  });

  return result;
};

interface IFileUpload {
  title?: string;
  onUploaded?: (data: unknown) => void;
  uploadUrl?: string;
  uploadReason?: "contacts" | "file-sets";
  acceptedFileTypes?: string[];
  withName?: boolean;
  multipleFiles?: boolean;
  withDescription?: boolean;
}

const FileUpload = ({
  title,
  onUploaded,
  uploadUrl = "/file-upload",
  uploadReason = "contacts",
  acceptedFileTypes,
  multipleFiles = false,
  withName = false,
  withDescription = false,
}: IFileUpload) => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const xhrRef = useRef<XMLHttpRequest | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    setUploadProgress(0);
    setMessage(""); // Clear any previous messages
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes?.length
      ? mapExtensionsToMime(acceptedFileTypes)
      : undefined,
    multiple: multipleFiles,
    useFsAccessApi: false,
  });

  const uploadFiles = () => {
    if (!files?.length) {
      setMessage("Error: No files selected");
      return;
    }

    // Show error if required fields is not filled
    const errors = [];
    if (withName && !name) errors.push("Name");
    if (withDescription && !description) errors.push("Description");

    if (errors.length) {
      setMessage(`Error: ${errors.join(", ")} is required`);
      return;
    }

    setMessage("");

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
      formData.append("names", file.name);
      formData.append("types", file.type);
    });

    if (withName && name) {
      formData.append("name", name);
    }

    if (withDescription && description) {
      formData.append("description", description);
    }

    try {
      const xhr = new XMLHttpRequest();
      xhrRef.current = xhr;

      const url = `${uploadUrl}`;
      xhr.open("POST", url, true);
      xhr.setRequestHeader("x-reason", uploadReason);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.total) * 100;
          setUploadProgress(percentComplete);
        }
      };

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            try {
              const response = JSON.parse(xhr.responseText);

              setMessage("File(s) uploaded successfully");
              onUploaded && onUploaded(response?.data);
            } catch (err) {
              setMessage(`Error uploading files. Status: ${xhr.status}`);
            }

            setFiles([]); // Clear files after successful upload
            setUploadProgress(0);
            setName("");
            setDescription("");
          } else {
            setMessage(`Error uploading files. Status: ${xhr.status}`);
          }
        }
      };

      xhr.onerror = () => {
        setMessage("Network error occurred during upload.");
      };

      xhr.send(formData);
    } catch (err) {
      console.error(err);
      setMessage("Error uploading file(s).");
    }
  };

  const cancelUpload = () => {
    if (xhrRef.current) {
      xhrRef.current.abort();
      setMessage("Upload canceled");
      setUploadProgress(0);
      xhrRef.current = null;
    }
  };

  return (
    <>
      <HeaderText>{title || `File Upload`}</HeaderText>
      <div className="w-full">
        {withName && (
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
            $offsetBottom
          />
        )}
        {withDescription && (
          <TextArea
            $offsetBottom
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Description"
          />
        )}
        <Dropzone {...getRootProps()} $isDragActive={isDragActive}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <PlainText>Drop the files here ...</PlainText>
          ) : (
            <PlainText>Drop files here or click to browse</PlainText>
          )}
        </Dropzone>
        {files.length > 0 && (
          <div className="mb-4">
            {files.map((file, index) => (
              <div className="mb-2" key={file.name + index}>
                <PlainText>Selected file: {file.name}</PlainText>
              </div>
            ))}
          </div>
        )}
        {uploadProgress > 0 && (
          <ProgressBar percentage={uploadProgress} />
        )}
        {message && (
          <Message $error={message.includes("Error")}>
            {message}
          </Message>
        )}
        <Button
          onClick={uploadFiles}
          className="mr-4"
          weight="bold"
          tone="active"
          isDisabled={!files?.length || !!uploadProgress}
        >
          Upload
        </Button>
        {!!uploadProgress && !message && (
          <Button onClick={cancelUpload} weight="bold" tone="negative">
            Cancel
          </Button>
        )}
      </div>
    </>
  );
};

export { FileUpload };
