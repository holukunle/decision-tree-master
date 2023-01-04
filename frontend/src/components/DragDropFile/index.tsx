import React from "react";
import "./style.css";

export interface IDragDropFile {
  uploadFn: (file: FileList) => void;
  className?: string;
}

export default function DragDropFile({ uploadFn, className }: IDragDropFile) {
  const [dragActive, setDragActive] = React.useState(false);
  const inputRef = React.useRef(null);

  // handle drag events
  const handleDrag = function (e: React.SyntheticEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = function (e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      uploadFn?.(e.dataTransfer.files);
    }
  };

  // triggers when file is selected with click
  const handleChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      uploadFn?.(e.target.files);
    }
  };

  // triggers the input when the button is clicked
  const onButtonClick = () => {
    (inputRef.current as unknown as HTMLInputElement)?.click();
  };

  return (
    <form
      id="form-file-upload"
      onDragEnter={handleDrag}
      onSubmit={(e) => e.preventDefault()}
      className={className}
    >
      <input
        ref={inputRef}
        type="file"
        id="input-file-upload"
        multiple={true}
        onChange={handleChange}
      />
      <label
        id="label-file-upload"
        htmlFor="input-file-upload"
        className={dragActive ? "drag-active" : ""}
      >
        <div>
          <p>Drag and drop your model here or</p>
          <button className="upload-button" onClick={onButtonClick}>
            Click to upload
          </button>
        </div>
      </label>
      {dragActive && (
        <div
          id="drag-file-element"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        ></div>
      )}
    </form>
  );
}
