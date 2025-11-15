import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import { educationAPI } from '../services/api';

const EducationManager = ({ onUpdate }) => {
  const [education, setEducation] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingEducation, setEditingEducation] = useState(null);
  const [formData, setFormData] = useState({
    degree: '',
    institution: '',
    duration: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    try {
      const response = await educationAPI.getAll();
      setEducation(response.data.data);
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error('Error fetching education:', error);
      setError('Failed to fetch education');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (editingEducation) {
        await educationAPI.update(editingEducation._id, formData);
      } else {
        await educationAPI.create(formData);
      }

      setShowModal(false);
      setEditingEducation(null);
      setFormData({ degree: '', institution: '', duration: '', description: '' });
      fetchEducation();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to save education');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (edu) => {
    setEditingEducation(edu);
    setFormData({
      degree: edu.degree,
      institution: edu.institution,
      duration: edu.duration,
      description: edu.description
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this education entry?')) {
      try {
        await educationAPI.delete(id);
        fetchEducation();
      } catch (error) {
        setError('Failed to delete education');
      }
    }
  };

  const openAddModal = () => {
    setEditingEducation(null);
    setFormData({ degree: '', institution: '', duration: '', description: '' });
    setShowModal(true);
  };

  return (
    <Container>
      <Header>
        <Title>Education Management</Title>
        <AddButton onClick={openAddModal}>
          <FaPlus /> Add Education
        </AddButton>
      </Header>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Timeline>
        {education.map(edu => (
          <TimelineItem key={edu._id}>
            <TimelineDot />
            <TimelineContent>
              <EducationCard>
                <EducationHeader>
                  <div>
                    <Degree>{edu.degree}</Degree>
                    <Institution>{edu.institution}</Institution>
                  </div>
                  <Duration>{edu.duration}</Duration>
                </EducationHeader>
                <Description>{edu.description}</Description>
                <Actions>
                  <EditButton onClick={() => handleEdit(edu)}>
                    <FaEdit /> Edit
                  </EditButton>
                  <DeleteButton onClick={() => handleDelete(edu._id)}>
                    <FaTrash /> Delete
                  </DeleteButton>
                </Actions>
              </EducationCard>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>

      {showModal && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>{editingEducation ? 'Edit Education' : 'Add New Education'}</ModalTitle>
              <CloseButton onClick={() => setShowModal(false)}>
                <FaTimes />
              </CloseButton>
            </ModalHeader>

            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Degree / Certification *</Label>
                <Input
                  type="text"
                  name="degree"
                  value={formData.degree}
                  onChange={handleInputChange}
                  placeholder="e.g., Bachelor of Computer Science"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Institution / University *</Label>
                <Input
                  type="text"
                  name="institution"
                  value={formData.institution}
                  onChange={handleInputChange}
                  placeholder="e.g., Stanford University"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Duration *</Label>
                <Input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  placeholder="e.g., 2020 - 2024"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Description *</Label>
                <TextArea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Describe your education, achievements, or key subjects..."
                  required
                />
              </FormGroup>

              <ModalActions>
                <CancelButton type="button" onClick={() => setShowModal(false)}>
                  Cancel
                </CancelButton>
                <SubmitButton type="submit" disabled={loading}>
                  {loading ? 'Saving...' : (editingEducation ? 'Update' : 'Create')}
                </SubmitButton>
              </ModalActions>
            </Form>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  padding: 30px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;

const Title = styled.h2`
  color: #fff;
  font-size: 2rem;
`;

const AddButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const ErrorMessage = styled.div`
  background: #ff4757;
  color: #fff;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const Timeline = styled.div`
  position: relative;
  padding-left: 40px;
  
  &::before {
    content: '';
    position: absolute;
    left: 15px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(180deg, #00d4ff 0%, #667eea 100%);
  }
`;

const TimelineItem = styled.div`
  position: relative;
  margin-bottom: 30px;
`;

const TimelineDot = styled.div`
  position: absolute;
  left: -32px;
  top: 20px;
  width: 16px;
  height: 16px;
  background: #00d4ff;
  border: 3px solid #0a0a0a;
  border-radius: 50%;
  box-shadow: 0 0 15px rgba(0, 212, 255, 0.5);
`;

const TimelineContent = styled.div``;

const EducationCard = styled.div`
  background: #1a1a2e;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateX(5px);
  }
`;

const EducationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
  flex-wrap: wrap;
  gap: 10px;
`;

const Degree = styled.h3`
  color: #fff;
  font-size: 1.3rem;
  margin-bottom: 5px;
`;

const Institution = styled.p`
  color: #00d4ff;
  font-size: 1rem;
  font-weight: 600;
`;

const Duration = styled.span`
  background: rgba(0, 212, 255, 0.2);
  color: #00d4ff;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
`;

const Description = styled.p`
  color: #aaa;
  line-height: 1.6;
  margin-bottom: 15px;
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
`;

const EditButton = styled.button`
  flex: 1;
  background: #4CAF50;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background 0.3s ease;

  &:hover {
    background: #45a049;
  }
`;

const DeleteButton = styled.button`
  flex: 1;
  background: #ff4757;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background 0.3s ease;

  &:hover {
    background: #e84118;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
`;

const ModalContent = styled.div`
  background: #1a1a2e;
  border-radius: 12px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const ModalTitle = styled.h3`
  color: #fff;
  font-size: 1.5rem;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: #aaa;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 5px;
  transition: color 0.3s ease;

  &:hover {
    color: #fff;
  }
`;

const Form = styled.form`
  padding: 25px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  color: #fff;
  margin-bottom: 8px;
  font-size: 0.95rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  background: #0f0f1e;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  color: #fff;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #00d4ff;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  background: #0f0f1e;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  color: #fff;
  font-size: 1rem;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #00d4ff;
  }
`;

const ModalActions = styled.div`
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  margin-top: 25px;
`;

const CancelButton = styled.button`
  padding: 12px 30px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const SubmitButton = styled.button`
  padding: 12px 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: #fff;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: transform 0.3s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export default EducationManager;
