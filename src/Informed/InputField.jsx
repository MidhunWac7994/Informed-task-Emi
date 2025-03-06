import { useField } from "informed";

const   InputField = (props) => {
  const { fieldState, fieldApi, render, ref, userProps } = useField(props);

  const { value, error, showError } = fieldState;
  const { setValue, setTouched, setError } = fieldApi;
  const { label, id, type, validate, ...rest } = userProps;

  const handleChange = (e) => {
    let newValue = e.target.value;

    if (type === "tel") {
      newValue = newValue.replace(/[^\d\+]/g, '');  
    }

    setValue(newValue, e);

    if (validate) {
      const validationError = validate(newValue); 
      if (validationError) {
        setError(validationError); 
      } else {
        setError(""); 
      }
    }
    if (showError) {  
      setError(""); 
    }
  };

  return render(
    <div style={{ marginBottom: "1rem"}}>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        {...rest}
        id={id}
        ref={ref}
        value={!value && value !== 0 ? "" : value}
        onChange={handleChange} 
        onBlur={(e) => {
          setTouched(true, e);
        }}
        style={{
          padding: "0.5rem",
          border: "1px solid",
          borderColor: showError || error ? "red" : "#ccc",
          borderRadius: "4px",
          width: "100%",
        }}
      />
      {showError && (
        <small style={{ color: "red", fontSize: "0.8rem" }}>{error}</small>
      )}
    </div>
  );
};

export default InputField;
