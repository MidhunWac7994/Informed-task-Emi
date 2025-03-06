import React from "react";
import { useField } from "informed";

const CheckBox = ({ id, label, required }) => {
  const { fieldState, fieldApi, render } = useField({
    name: id,
    required,
    validate: (value) => (!value ? "This field is required" : undefined),
    validateOnChange: true,
    validateOnMount: false,
  });

  const { setValue, setTouched } = fieldApi;

  return render(
    <div className="mb-3">
      <div className="form-check">
        <input
          type="checkbox"
          checked={fieldState.value || false}
          onChange={(e) => {
            setValue(e.target.checked);
            setTouched(true);
          }}
          onBlur={() => setTouched(true)}
          className="form-check-input"
          id={id}
        />
        <label className="form-check-label text-dark" htmlFor={id}>
          {label}
        </label>
      </div>
      {fieldState.error && fieldState.touched && (
        <small className="text-danger d-block mt-1">{fieldState.error}</small>
      )}
    </div>
  );
};

export default CheckBox;