import React, { useState, useEffect } from "react";
import { useField } from "informed";

const FileInput = ({ id, label, required, accept }) => {
  const { fieldState, fieldApi, render } = useField({
    name: id,
    required,
    validate: (value) => (!value ? "This field is required" : undefined),
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: false,
  });

  const { setValue, setTouched } = fieldApi;
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setValue(file);
    setTouched(true);

    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return render(
    <div className="mb-3">
      <label htmlFor={id} className="form-label text-dark">
        {label}
      </label>
      <input
        type="file"
        accept={accept}
        onChange={handleFileChange}
        onBlur={() => setTouched(true)}
        className="form-control bg-white text-dark border-dark"
        id={id}
      />
      {fieldState.value && (
        <div className="mt-2">
          <p className="text-dark">
            Uploaded File:{" "}
            <span className="fw-bold">{fieldState.value.name}</span>
          </p>
          <a
            href={URL.createObjectURL(fieldState.value)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-dark text-decoration-underline"
          >
            View File
          </a>
          {previewUrl && (
            <div className="mt-2">
              <p className="text-dark">Preview:</p>
              <img
                src={previewUrl}
                alt="File Preview"
                className="img-fluid rounded"
                style={{ maxWidth: "200px", maxHeight: "200px" }}
              />
            </div>
          )}
        </div>
      )}
      {fieldState.error && fieldState.touched && (
        <small className="text-danger d-block mt-1">{fieldState.error}</small>
      )}
    </div>
  );
};

export default FileInput;