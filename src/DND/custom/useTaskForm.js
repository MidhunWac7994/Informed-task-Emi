import { useState } from 'react';

const useTaskForm = () => {
  const [taskName, setTaskName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [description, setDescription] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  
  const handleTaskNameChange = (e) => setTaskName(e.target.value);
  const handleCategoryChange = (selectedOption) => setSelectedCategory(selectedOption);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const handleDeleteTask = (taskId) => {
    setTaskToDelete(taskId);
    setShowDeleteModal(true);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  const confirmDelete = () => {
    setShowDeleteModal(false);
  };

  return {
    taskName,
    selectedCategory,
    description,
    showModal,
    showDeleteModal,
    taskToDelete,
    handleShow,
    handleClose,
    handleTaskNameChange,
    handleCategoryChange,
    handleDescriptionChange,
    handleDeleteTask,
    cancelDelete,
    confirmDelete
  };
};

export default useTaskForm;
