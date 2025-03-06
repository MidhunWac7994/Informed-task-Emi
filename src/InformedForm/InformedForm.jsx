import React from "react";
import { Form } from "informed";
import { Button, Form as BootstrapForm, Container, Modal, Image } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import useFormLogic from './useFormLogic';
import {
  TextField, RadioField, SelectField, TextAreaField, FileField, CheckboxField, CheckboxGroupField
} from './FormField';

const DynamicForm = ({ formData = [] }) => {
  const {
    filePreview,
    selectedFile,
    showModal,
    handleFileChange,
    handlePreviewClick,
    handleCloseModal,
    handleSubmit
  } = useFormLogic();

  const renderField = (field, formApi) => {
    switch (field.type) {
      case "text":
      case "email":
      case "tel":
      case "date":
        return <TextField field={field} />;
      
      case "radio":
        return <RadioField field={field} />;
      
      case "select":
        return <SelectField field={field} />;
      
      case "textarea":
        return <TextAreaField field={field} />;
      
      case "file":
        return (
          <FileField 
            field={field} 
            handleFileChange={handleFileChange} 
            filePreview={filePreview} 
            handlePreviewClick={handlePreviewClick} 
          />
        );
      
      case "checkbox-group":
        return <CheckboxGroupField field={field} />;
      
      case "checkbox":
        return <CheckboxField field={field} />;
      
      default:
        return null;
    }
  };

  const renderFilePreview = () => {
    if (!filePreview) return null;

    // Check if the file is an image or a PDF and display accordingly
    const fileType = selectedFile ? selectedFile.type : '';

    if (fileType.startsWith("image")) {
      return (
        <Image 
          src={filePreview} 
          alt="File preview" 
          fluid 
          style={{ cursor: "pointer", maxWidth: "100px" }} 
          onClick={handlePreviewClick}
        />
      );
    } else if (fileType === "application/pdf") {
      return (
        <iframe 
          src={filePreview} 
          width="100px" 
          height="100px" 
          style={{ cursor: "pointer" }} 
          onClick={handlePreviewClick}
        />
      );
    }
    return null;
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
        {({ formApi }) => (
          <>
            {Array.isArray(formData) && formData.length > 0 ? (
              formData.map((field) => (
                <BootstrapForm.Group key={field.id} className="mb-3">
                  <BootstrapForm.Label>{field.label}</BootstrapForm.Label>
                  {renderField(field, formApi)}
                  {field.type === 'file' && renderFilePreview()}
                </BootstrapForm.Group>
              ))
            ) : (
              <p>No form data available</p>
            )}
            <Button type="submit" className="btn btn-primary w-100 mt-3">
              Submit
            </Button>
          </>
        )}
      </Form>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>File Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {filePreview && selectedFile && selectedFile.type.startsWith("image") && (
            <img 
              src={filePreview} 
              alt="Full-size preview" 
              style={{ width: '100%', height: 'auto' }} 
            />
          )}
          {filePreview && selectedFile && selectedFile.type === "application/pdf" && (
            <iframe 
              src={filePreview} 
              width="100%" 
              height="500px" 
              title="File Preview"
            ></iframe>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default DynamicForm;
