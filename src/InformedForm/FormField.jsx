import React from 'react';
import { RadioGroup, Radio, Select, Checkbox, TextArea, Input } from 'informed';
import { Form as BootstrapForm } from 'react-bootstrap';

export const TextField = ({ field }) => (
  <Input field={field.id} type={field.type} placeholder={field.placeholder} required={field.required} className="form-control" />
);

export const RadioField = ({ field }) => (
  <RadioGroup field={field.id} required={field.required} className="d-flex gap-3">
    {field.options.map((option) => (
      <label key={option.value} className="me-3">
        <Radio field={field.id} value={option.value} className="me-1" /> {option.label}
      </label>
    ))}
  </RadioGroup>
);

export const SelectField = ({ field }) => (
  <Select field={field.id} required={field.required} className="form-select">
    <option value="">Select</option>
    {field.options.map((option) => (
      <option key={option.value} value={option.value}>{option.label}</option>
    ))}
  </Select>
);

export const TextAreaField = ({ field }) => (
  <TextArea field={field.id} placeholder={field.placeholder} required={field.required} className="form-control" />
);

export const FileField = ({ field, handleFileChange, filePreview, handlePreviewClick }) => (
  <>
    <BootstrapForm.Control 
      type="file" 
      accept={field.accept} 
      onChange={(event) => handleFileChange(event, field)} 
      required={field.required} 
    />
    {filePreview && (
      <div className="mt-2" onClick={handlePreviewClick} style={{ cursor: 'pointer' }}>
        <p>Click to view preview:</p>
        <img 
          src={filePreview} 
          alt="Preview" 
          width="100" 
          height="auto" 
          style={{ border: '1px solid #ccc', borderRadius: '4px' }} 
        />
      </div>
    )}
    <Input field={field.id} type="hidden" />
  </>
);

export const CheckboxField = ({ field }) => (
  <Checkbox field={field.id} required={field.required} className="form-check-input" />
);

export const CheckboxGroupField = ({ field }) => (
  field.options.map((option) => (
    <BootstrapForm.Check key={option.value} type="checkbox" label={option.label} />
  ))
);
