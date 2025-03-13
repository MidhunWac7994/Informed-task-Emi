import React, { useState } from 'react';
import { Navbar, Container, Nav, NavDropdown, Modal, Button, Form, Row, Col, Card } from 'react-bootstrap';
import { BsKanban, BsPlus, BsPerson, BsThreeDots } from 'react-icons/bs';
import Select from 'react-select';

const KanbarNavbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedAssignee, setSelectedAssignee] = useState(null);
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Research competitors', category: 'To Do', assignee: 'John Doe' },
    { id: 2, title: 'Design new homepage', category: 'In Progress', assignee: 'Jane Smith' },
    { id: 3, title: 'Fix login bug', category: 'In Progress', assignee: 'Mike Johnson' },
    { id: 4, title: 'Update documentation', category: 'Done', assignee: 'Sarah Williams' },
  ]);

  // Handle modal visibility
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  // Handle task name change
  const handleTaskNameChange = (e) => setTaskName(e.target.value);

  // Handle category change
  const handleCategoryChange = (selectedOption) => setSelectedCategory(selectedOption);
  
  // Handle assignee change
  const handleAssigneeChange = (selectedOption) => setSelectedAssignee(selectedOption);

  // Category options for the dropdown
  const categoryOptions = [
    { value: 'To Do', label: 'To Do' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Done', label: 'Done' },
  ];
  
  // Assignee options
  const assigneeOptions = [
    { value: 'John Doe', label: 'John Doe' },
    { value: 'Jane Smith', label: 'Jane Smith' },
    { value: 'Mike Johnson', label: 'Mike Johnson' },
    { value: 'Sarah Williams', label: 'Sarah Williams' },
  ];

  // Custom modal styles for Jira-like appearance
  const modalStyles = {
    dialog: {
      maxWidth: '550px',
      width: '100%',
      margin: '1.75rem auto'
    },
    content: {
      padding: '20px',
      borderRadius: '3px'
    },
    header: {
      borderBottom: '1px solid #dfe1e6',
      padding: '16px 20px'
    },
    body: {
      padding: '20px'
    },
    footer: {
      borderTop: '1px solid #dfe1e6',
      padding: '16px 20px'
    }
  };
  
  // Handle creating a new task
  const handleCreateTask = () => {
    if (taskName && selectedCategory && selectedAssignee) {
      const newTask = {
        id: tasks.length + 1,
        title: taskName,
        category: selectedCategory.value,
        assignee: selectedAssignee.value
      };
      setTasks([...tasks, newTask]);
      setTaskName('');
      setSelectedCategory(null);
      setSelectedAssignee(null);
      handleClose();
    }
  };
  
  // Get tasks by category
  const getTasksByCategory = (category) => {
    return tasks.filter(task => task.category === category);
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="border-bottom shadow-sm">
        <Container fluid>
          {/* Logo and Brand */}
          <Navbar.Brand href="#home" className="d-flex align-items-center">
            <BsKanban size={24} className="text-primary me-2" />
            <span className="fw-bold">Kanbar</span>
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="kanbar-navbar" />
          
          <Navbar.Collapse id="kanbar-navbar">
            {/* Main Navigation */}
            <Nav className="me-auto">
              {/* Create New Dropdown */}
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
      
      {/* Kanban Board */}
      <Container fluid className="mt-4 px-4">
        <Row>
          {/* Todo Column */}
          <Col md={4}>
            <div className="kanban-column">
              <h5 className="py-2 px-3 bg-light border d-flex justify-content-between align-items-center">
                To Do <span className="badge bg-secondary">{getTasksByCategory('To Do').length}</span>
              </h5>
              <div className="task-list p-2">
                {getTasksByCategory('To Do').map(task => (
                  <Card key={task.id} className="mb-2 task-card shadow-sm">
                    <Card.Body className="p-3">
                      <div className="d-flex justify-content-between">
                        <Card.Title className="h6">{task.title}</Card.Title>
                        <BsThreeDots />
                      </div>
                      <div className="assignee mt-2 d-flex align-items-center">
                        <BsPerson className="me-1" />
                        <small className="text-muted">{task.assignee}</small>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </div>
          </Col>
          
          {/* In Progress Column */}
          <Col md={4}>
            <div className="kanban-column">
              <h5 className="py-2 px-3 bg-light border d-flex justify-content-between align-items-center">
                In Progress <span className="badge bg-primary">{getTasksByCategory('In Progress').length}</span>
              </h5>
              <div className="task-list p-2">
                {getTasksByCategory('In Progress').map(task => (
                  <Card key={task.id} className="mb-2 task-card shadow-sm">
                    <Card.Body className="p-3">
                      <div className="d-flex justify-content-between">
                        <Card.Title className="h6">{task.title}</Card.Title>
                        <BsThreeDots />
                      </div>
                      <div className="assignee mt-2 d-flex align-items-center">
                        <BsPerson className="me-1" />
                        <small className="text-muted">{task.assignee}</small>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </div>
          </Col>
          
          {/* Done Column */}
          <Col md={4}>
            <div className="kanban-column">
              <h5 className="py-2 px-3 bg-light border d-flex justify-content-between align-items-center">
                Done <span className="badge bg-success">{getTasksByCategory('Done').length}</span>
              </h5>
              <div className="task-list p-2">
                {getTasksByCategory('Done').map(task => (
                  <Card key={task.id} className="mb-2 task-card shadow-sm">
                    <Card.Body className="p-3">
                      <div className="d-flex justify-content-between">
                        <Card.Title className="h6">{task.title}</Card.Title>
                        <BsThreeDots />
                      </div>
                      <div className="assignee mt-2 d-flex align-items-center">
                        <BsPerson className="me-1" />
                        <small className="text-muted">{task.assignee}</small>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Modal for Create Option - Centered with Jira-like styling */}
      <Modal 
        show={showModal} 
        onHide={handleClose}
        centered
        dialogClassName="modal-dialog-centered"
        contentClassName="shadow"
      >
        <Modal.Header closeButton style={modalStyles.header}>
          <Modal.Title>Create Task</Modal.Title>
        </Modal.Header>
        <Modal.Body style={modalStyles.body}>
          <Form>
            {/* Task Name Input */}
            <Form.Group controlId="taskName">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task name"
                value={taskName}
                onChange={handleTaskNameChange}
              />
            </Form.Group>
            
            {/* React Select for Task Category */}
            <Form.Group controlId="taskCategory" className="mt-3">
              <Form.Label>Category</Form.Label>
              <Select
                options={categoryOptions}
                value={selectedCategory}
                onChange={handleCategoryChange}
                placeholder="Select a category"
                styles={{
                  control: (base) => ({
                    ...base,
                    borderColor: '#dfe1e6',
                    boxShadow: 'none',
                    '&:hover': {
                      borderColor: '#b3bac5'
                    }
                  })
                }}
              />
            </Form.Group>
            
            {/* React Select for Task Assignee */}
            <Form.Group controlId="taskAssignee" className="mt-3">
              <Form.Label>Assignee</Form.Label>
              <Select
                options={assigneeOptions}
                value={selectedAssignee}
                onChange={handleAssigneeChange}
                placeholder="Select assignee"
                styles={{
                  control: (base) => ({
                    ...base,
                    borderColor: '#dfe1e6',
                    boxShadow: 'none',
                    '&:hover': {
                      borderColor: '#b3bac5'
                    }
                  })
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={modalStyles.footer}>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleCreateTask}>Create Task</Button>
        </Modal.Footer>
      </Modal>

      {/* Add some custom CSS for Jira-like styling */}
      <style jsx>{`
        .kanban-column {
          min-height: 600px;
          background-color: #f4f5f7;
          border-radius: 3px;
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
        }
      `}</style>
    </>
  );
};

export default KanbarNavbar;