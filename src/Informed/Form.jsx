import React from "react";
import { Form } from "informed";
import InputField from "./InputField";
import SelectField from "./SelectField";
import RadioInput from "./RadioInput";
import CheckboxGroup from "./CheckBoxGroup";
import FileInput from "./FileInput";
import userData from '../formData.json'
import useValidations from "./useValidation";
import "bootstrap/dist/css/bootstrap.min.css"; 
import CheckBox from "./CheckBox";


const UseForm = () => {
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm border-dark bg-dark text-white">
            <div className="card-body p-4">
              <h2 className="card-title text-center mb-4 text-white">
                User Registration
              </h2>
              <Form>
                {({ formApi, formState }) => {
                  const handleSubmitWithReset = (e) => {
                    e.preventDefault();

                    const requiredFields = userData.filter(
                      (field) => field.required
                    );
                    const allFieldsValid = requiredFields.every((field) => {
                      const fieldValue = formState.values[field.id];
                      const validationResult = useValidations(
                        fieldValue,
                        field.id
                      );
                      return validationResult === undefined;
                    });

                    if (allFieldsValid) {
                      console.log("Form Submitted:", formState.values);
                      formApi.reset();
                    } else {
                      requiredFields.forEach((field) => {
                        const fieldValue = formState.values[field.id];
                        if (
                          !fieldValue ||
                          (Array.isArray(fieldValue) && fieldValue.length === 0)
                        ) {
                          formApi.setTouched(field.id, true);
                        }
                      });
                    }
                  };

                  return (
                    <>
                      {userData.map((field) => {
                        const {
                          id,
                          type,
                          options,
                          accept,
                          required,
                          label,
                          placeholder,
                        } = field;

                        const commonProps = {
                          label,
                          id,
                          name: id,
                          placeholder: placeholder || "",
                          required,
                        };

                        switch (type) {
                          case "text":
                          case "email":
                          case "tel":
                          case "date":
                            return (
                              <InputField
                                key={id}
                                {...commonProps}
                                type={type}
                                validate={(value) =>
                                  useValidations(value, id)
                                }
                              />
                            );
                          case "radio":
                            return (
                              <RadioInput
                                key={id}
                                {...commonProps}
                                options={options}
                              />
                            );
                          case "select":
                            return (
                              <SelectField
                                key={id}
                                {...commonProps}
                                options={options}
                              />
                            );
                          case "textarea":
                            return (
                              <InputField
                                key={id}
                                {...commonProps}
                                type="textarea"
                                validate={
                                  required
                                    ? (value) => useValidations(value, id)
                                    : undefined
                                }
                              />
                            );
                          case "file":
                            return (
                              <FileInput
                                key={id}
                                {...commonProps}
                                accept={accept}
                              />
                            );
                          case "checkbox-group":
                            return (
                              <CheckboxGroup
                                key={id}
                                {...commonProps}
                                options={options}
                              />
                            );
                          case "checkbox":
                            return <CheckBox key={id} {...commonProps} />;
                          default:
                            return null;
                        }
                      })}
                      <div className="text-center mt-4">
                        <button
                          type="submit"
                          onClick={handleSubmitWithReset}
                          className="btn btn-outline-light btn-lg w-100"
                        >
                          Submit
                        </button>
                      </div>
                    </>
                  );
                }}
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseForm;