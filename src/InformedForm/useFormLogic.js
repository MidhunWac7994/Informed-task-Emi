import { useState } from 'react';

const useFormLogic = () => {
  const [filePreview, setFilePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleFileChange = (event, formApi, field) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const fileURL = URL.createObjectURL(file);
      setFilePreview(fileURL);
      formApi.setValue(field.id, file);
    }
  };

  const handlePreviewClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = (values) => {
    console.log("Form Data:", values);
    if (selectedFile) {
      console.log("Selected File:", selectedFile);
    }
  };

  return {
    filePreview,
    selectedFile,
    showModal,
    handleFileChange,
    handlePreviewClick,
    handleCloseModal,
    handleSubmit
  };
};

export default useFormLogic;
