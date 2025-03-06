import React from "react";
import { useField } from "informed";

const RadioInput = ({ id, label, options, required }) => {
  const { fieldState, fieldApi, render } = useField({
    name: id,
    required,
    validate: (value) => (!value ? "This field is required" : undefined),
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: false,
  });

  const { setValue, setTouched } = fieldApi;

  return render(
    <div className="mb-3">
      {label && <label className="form-label text-white">{label}</label>}
      <div className="d-flex flex-wrap gap-3">
        {options.map((option) => (
          <div key={option.value} className="form-check">
            <input
              type="radio"
              name={id}
              value={option.value}
              checked={fieldState.value === option.value}
              onChange={() => {
                setValue(option.value);
                setTouched(true);
              }}
              onBlur={() => setTouched(true)}
              className="form-check-input"
              id={`${id}-${option.value}`}
            />
            <label
              className="form-check-label text-white"
              htmlFor={`${id}-${option.value}`}
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {fieldState.error && fieldState.touched && (
        <small className="text-danger d-block mt-1">{fieldState.error}</small>
      )}
    </div>
  );
};

export default RadioInput;