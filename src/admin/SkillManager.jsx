import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import { skillAPI } from '../services/api';

const SkillManager = ({ onUpdate }) => {
  const [skills, setSkills] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    level: 50,
    category: 'technical'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await skillAPI.getAll();
      setSkills(response.data.data);
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error('Error fetching skills:', error);
      setError('Failed to fetch skills');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'level' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (editingSkill) {
        await skillAPI.update(editingSkill._id, formData);
      } else {
        await skillAPI.create(formData);
      }

      setShowModal(false);
      setEditingSkill(null);
      setFormData({ name: '', level: 50, category: 'technical' });
      fetchSkills();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to save skill');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      level: skill.level,
      category: skill.category
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try {
        await skillAPI.delete(id);
        fetchSkills();
      } catch (error) {
        setError('Failed to delete skill');
      }
    }
  };

  const openAddModal = () => {
    setEditingSkill(null);
    setFormData({ name: '', level: 50, category: 'technical' });
    setShowModal(true);
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <Container>
      <Header>
        <Title>Skills Management</Title>
        <AddButton onClick={openAddModal}>
          <FaPlus /> Add Skill
        </AddButton>
      </Header>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {Object.entries(groupedSkills).map(([category, categorySkills]) => (
        <SkillSection key={category}>
          <CategoryTitle>{category}</CategoryTitle>
          <SkillGrid>
            {categorySkills.map(skill => (
              <SkillCard key={skill._id}>
                <SkillHeader>
                  <SkillName>{skill.name}</SkillName>
                  <SkillLevel>{skill.level}%</SkillLevel>
                </SkillHeader>
                <ProgressBar>
                  <ProgressFill level={skill.level} />
                </ProgressBar>
                <SkillActions>
                  <EditButton onClick={() => handleEdit(skill)}>
                    <FaEdit /> Edit
                  </EditButton>
                  <DeleteButton onClick={() => handleDelete(skill._id)}>
                    <FaTrash /> Delete
                  </DeleteButton>
                </SkillActions>
              </SkillCard>
            ))}
          </SkillGrid>
        </SkillSection>
      ))}

      {showModal && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>{editingSkill ? 'Edit Skill' : 'Add New Skill'}</ModalTitle>
              <CloseButton onClick={() => setShowModal(false)}>
                <FaTimes />
              </CloseButton>
            </ModalHeader>

            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Skill Name *</Label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., React, Java, MongoDB"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Proficiency Level: {formData.level}%</Label>
                <RangeInput
                  type="range"
                  name="level"
                  min="0"
                  max="100"
                  value={formData.level}
                  onChange={handleInputChange}
                />
                <RangeLabels>
                  <span>Beginner</span>
                  <span>Expert</span>
                </RangeLabels>
              </FormGroup>

              <FormGroup>
                <Label>Category *</Label>
                <Select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="technical">Technical</option>
                  <option value="soft">Soft Skills</option>
                  <option value="tools">Tools</option>
                  <option value="languages">Programming Languages</option>
                </Select>
              </FormGroup>

              <ModalActions>
                <CancelButton type="button" onClick={() => setShowModal(false)}>
                  Cancel
                </CancelButton>
                <SubmitButton type="submit" disabled={loading}>
                  {loading ? 'Saving...' : (editingSkill ? 'Update' : 'Create')}
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
  margin-bottom: 30px;
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

const SkillSection = styled.div`
  margin-bottom: 40px;
`;

const CategoryTitle = styled.h3`
  color: #00d4ff;
  font-size: 1.5rem;
  margin-bottom: 20px;
  text-transform: capitalize;
`;

const SkillGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const SkillCard = styled.div`
  background: #1a1a2e;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-3px);
  }
`;

const SkillHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const SkillName = styled.h4`
  color: #fff;
  font-size: 1.1rem;
`;

const SkillLevel = styled.span`
  color: #00d4ff;
  font-weight: 600;
  font-size: 1rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 15px;
`;

const ProgressFill = styled.div`
  width: ${props => props.level}%;
  height: 100%;
  background: linear-gradient(90deg, #00d4ff 0%, #667eea 100%);
  border-radius: 10px;
  transition: width 0.5s ease;
`;

const SkillActions = styled.div`
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
  max-width: 500px;
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

const RangeInput = styled.input`
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  outline: none;
  -webkit-appearance: none;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    background: #00d4ff;
    border-radius: 50%;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: #00d4ff;
    border-radius: 50%;
    cursor: pointer;
    border: none;
  }
`;

const RangeLabels = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  
  span {
    color: #aaa;
    font-size: 0.85rem;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  background: #0f0f1e;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #00d4ff;
  }

  option {
    background: #0f0f1e;
    color: #fff;
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

export default SkillManager;
