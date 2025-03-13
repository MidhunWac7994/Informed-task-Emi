import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, NavDropdown, Modal, Button, Form, Row, Col, Card } from 'react-bootstrap';
import { BsKanban, BsPlus, BsThreeDots, BsTrash } from 'react-icons/bs';
import Select from 'react-select';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const KanbanBoard = () => {
  const [showModal, setShowModal] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleTaskNameChange = (e) => setTaskName(e.target.value);
  const handleCategoryChange = (selectedOption) => setSelectedCategory(selectedOption);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const categoryOptions = [
    { value: 'To Do', label: 'To Do' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Done', label: 'Done' },
  ];


  const handleCreateTask = () => {
    if (taskName && selectedCategory) {
      const newTask = {
        id: `${Date.now()}`, 
        title: taskName,
        category: selectedCategory.value,
        description: description,
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setTaskName('');
      setSelectedCategory(null);
      setDescription('');
      handleClose();
    }
  };

  const getTasksByCategory = (category) => {
    return tasks.filter((task) => task.category === category);
  };

  const handleDragEnd = (result) => {
    const { destination, draggableId } = result;
    if (!destination) return;

    const taskIndex = tasks.findIndex((task) => task.id === draggableId);
    if (taskIndex === -1) return;

    const updatedTasks = [...tasks];
    const movedTask = updatedTasks[taskIndex];

    updatedTasks.splice(taskIndex, 1);
    movedTask.category = destination.droppableId;
    updatedTasks.splice(destination.index, 0, movedTask);

    setTasks(updatedTasks);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="border-bottom shadow-sm">
        <Container fluid>
          <Navbar.Brand href="#home" className="d-flex align-items-center">
            <BsKanban size={24} className="text-primary me-2" />
            <span className="fw-bold">Kanban Board</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="kanban-navbar" />

          <Navbar.Collapse id="kanban-navbar">
            <Nav className="me-auto">
              <NavDropdown
                title={
                  <span>
                    <BsPlus size={20} className="me-1" />
                    Create
                  </span>
                }
                onClick={handleShow}
              >
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container fluid className="mt-4 px-4">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Row>
            <Col md={4}>
              <Droppable droppableId="To Do">
                {(provided) => (
                  <div
                    className="kanban-column"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{ backgroundColor: '#d1ecf1' }} 
                  >
                    <h5 className="py-2 px-3 bg-light border d-flex justify-content-between align-items-center">
                      To Do <span className="badge bg-secondary">{getTasksByCategory('To Do').length}</span>
                    </h5>
                    <div className="task-list p-2">
                      {getTasksByCategory('To Do').map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided) => (
                            <Card
                              className="mb-2 task-card shadow-sm"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <Card.Body className="p-3">
                                <div className="d-flex justify-content-between align-items-center">
                                  <Card.Title className="h6">{task.title}</Card.Title>
                                  <Button 
                                    variant="outline-danger" 
                                    size="sm"
                                    onClick={() => handleDeleteTask(task.id)}
                                    style={{ backgroundColor: 'transparent', border: 'none' }}
                                  >
                                    <BsTrash />
                                  </Button>
                                </div>
                                <div className="description mt-2">
                                  <small className="text-muted">{task.description}</small>
                                </div>
                              </Card.Body>
                            </Card>
                          )}
                        </Draggable>
                      ))}
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Col>

            <Col md={4}>
              <Droppable droppableId="In Progress">
                {(provided) => (
                  <div
                    className="kanban-column"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{ backgroundColor: '#fff3cd' }} 
                  >
                    <h5 className="py-2 px-3 bg-light border d-flex justify-content-between align-items-center">
                      In Progress <span className="badge bg-primary">{getTasksByCategory('In Progress').length}</span>
                    </h5>
                    <div className="task-list p-2">
                      {getTasksByCategory('In Progress').map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided) => (
                            <Card
                              className="mb-2 task-card shadow-sm"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <Card.Body className="p-3">
                                <div className="d-flex justify-content-between align-items-center">
                                  <Card.Title className="h6">{task.title}</Card.Title>
                                  <Button 
                                    variant="outline-danger" 
                                    size="sm"
                                    onClick={() => handleDeleteTask(task.id)}
                                    style={{ backgroundColor: 'transparent', border: 'none' }}
                                  >
                                    <BsTrash />
                                  </Button>
                                </div>
                                <div className="description mt-2">
                                  <small className="text-muted">{task.description}</small>
                                </div>
                              </Card.Body>
                            </Card>
                          )}
                        </Draggable>
                      ))}
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Col>

            <Col md={4}>
              <Droppable droppableId="Done">
                {(provided) => (
                  <div
                    className="kanban-column"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{ backgroundColor: '#d4edda' }} 
                  >
                    <h5 className="py-2 px-3 bg-light border d-flex justify-content-between align-items-center">
                      Done <span className="badge bg-success">{getTasksByCategory('Done').length}</span>
                    </h5>
                    <div className="task-list p-2">
                      {getTasksByCategory('Done').map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided) => (
                            <Card
                              className="mb-2 task-card shadow-sm"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <Card.Body className="p-3">
                                <div className="d-flex justify-content-between align-items-center">
                                  <Card.Title className="h6">{task.title}</Card.Title>
                                  <Button 
                                    variant="outline-danger" 
                                    size="sm"
                                    onClick={() => handleDeleteTask(task.id)}
                                    style={{ backgroundColor: 'transparent', border: 'none' }}
                                  >
                                    <BsTrash />
                                  </Button>
                                </div>
                                <div className="description mt-2">
                                  <small className="text-muted">{task.description}</small>
                                </div>
                              </Card.Body>
                            </Card>
                          )}
                        </Draggable>
                      ))}
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Col>
          </Row>
        </DragDropContext>
      </Container>

      <Modal 
        show={showModal} 
        onHide={handleClose}
        centered
        dialogClassName="modal-dialog-centered"
        contentClassName="shadow"
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="taskName">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task name"
                value={taskName}
                onChange={handleTaskNameChange}
              />  
            </Form.Group>
            
            <Form.Group controlId="taskCategory" className="mt-3">
              <Form.Label>Category</Form.Label>
              <Select
                options={categoryOptions}
                value={selectedCategory}
                onChange={handleCategoryChange}
                placeholder="Select a category"
              />
            </Form.Group>

            <Form.Group controlId="taskDescription" className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter task description"
                value={description}
                onChange={handleDescriptionChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleCreateTask}>Create Task</Button>
        </Modal.Footer>
      </Modal>

      <style>{
        `.kanban-column {
          min-height: 600px;
          border-radius: 3px;
          margin-bottom: 1rem;
        }
        
        .task-list {
          min-height: 200px;
        }
        
        .task-card {
          background-color: white;
          border-radius: 3px;
          border-left: 3px solid #4b9fda;
          cursor: pointer;
        }
        
        .task-card:hover {
          background-color: #f9f9f9;
        }`
      }</style>
    </>
  );
};

export default KanbanBoard;