import React from "react";
import { useField } from "informed";

const SelectField = ({ label, id, options, required }) => {
  const { fieldState, fieldApi, render, ref } = useField({
    name: id,
    required,
    validate: (value) => (!value ? "This field is required" : undefined),
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: false,
  });

  const { value, error, touched } = fieldState;
  const { setValue, setTouched } = fieldApi;

  return render(
    <div className="mb-3">
      {label && (
        <label htmlFor={id} className="form-label text-white">
          {label}
        </label>
      )}
      <select
        id={id}
        ref={ref}
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          setTouched(true);
        }}
        onBlur={() => setTouched(true)}
        className="form-select bg-dark text-white border-light"
      >
        <option value="" className="text-muted">
          Select an option
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && touched && (
        <small className="text-danger d-block mt-1">{error}</small>
      )}
    </div>
  );
};

export default SelectField;