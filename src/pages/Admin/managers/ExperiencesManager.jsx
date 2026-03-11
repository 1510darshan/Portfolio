import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ManageData from '../../../Services/Firebase/ManageData';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const SectionTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 700;
  color: white;
  letter-spacing: -0.02em;
`;

const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 600px;
  overflow-y: auto;
  padding-right: 8px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(34, 211, 238, 0.3);
    border-radius: 3px;
  }
`;

const Item = styled.div`
  padding: 16px;
  background: rgba(10, 26, 46, 0.6);
  border: 1px solid rgba(34, 211, 238, 0.15);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    border-color: rgba(34, 211, 238, 0.35);
    background: rgba(10, 26, 46, 0.8);
  }
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ItemName = styled.span`
  color: white;
  font-weight: 600;
  font-size: 0.95rem;
`;

const ItemMeta = styled.span`
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.8rem;
`;

const ActionBtn = styled.button`
  padding: 6px 12px;
  background: ${({ delete: isDelete }) => isDelete ? 'rgba(255, 107, 107, 0.15)' : 'rgba(34, 211, 238, 0.15)'};
  border: 1px solid ${({ delete: isDelete }) => isDelete ? 'rgba(255, 107, 107, 0.3)' : 'rgba(34, 211, 238, 0.3)'};
  border-radius: 4px;
  color: ${({ delete: isDelete }) => isDelete ? '#ff6b6b' : '#22d3ee'};
  font-size: 0.75rem;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ delete: isDelete }) => isDelete ? 'rgba(255, 107, 107, 0.3)' : 'rgba(34, 211, 238, 0.25)'};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  background: rgba(10, 26, 46, 0.6);
  border: 1px solid rgba(34, 211, 238, 0.15);
  border-radius: 12px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-size: 0.8rem;
  font-weight: 600;
  color: #22d3ee;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

const Input = styled.input`
  padding: 10px 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(34, 211, 238, 0.2);
  border-radius: 6px;
  color: white;
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: #22d3ee;
    background: rgba(34, 211, 238, 0.08);
  }
`;

const TextArea = styled.textarea`
  padding: 10px 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(34, 211, 238, 0.2);
  border-radius: 6px;
  color: white;
  font-size: 0.9rem;
  font-family: inherit;
  resize: vertical;
  min-height: 80px;

  &:focus {
    outline: none;
    border-color: #22d3ee;
    background: rgba(34, 211, 238, 0.08);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const Button = styled.button`
  flex: 1;
  padding: 10px 16px;
  background: ${({ secondary }) => secondary ? 'transparent' : 'linear-gradient(135deg, #22d3ee, #7b2fff)'};
  border: ${({ secondary }) => secondary ? '1px solid rgba(34, 211, 238, 0.3)' : 'none'};
  border-radius: 6px;
  color: ${({ secondary }) => secondary ? '#22d3ee' : 'white'};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;

  &:hover {
    ${({ secondary }) => secondary ? `
      border-color: #22d3ee;
      background: rgba(34, 211, 238, 0.1);
    ` : `
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(34, 211, 238, 0.3);
    `}
  }
`;

const ExperiencesManager = ({ onDataUpdate }) => {
  const [experiences, setExperiences] = useState([]);
  const [selectedExp, setSelectedExp] = useState(null);
  const [formData, setFormData] = useState({
    role: '',
    company: '',
    type: 'Full-time',
    date: '',
    current: false,
    desc: '',
    tags: '',
  });

  useEffect(() => {
    loadExperiences();
  }, []);

  const loadExperiences = async () => {
    try {
      const data = await ManageData.getAllExperiences();
      setExperiences(data || []);
    } catch (error) {
      console.error('Error loading experiences:', error);
    }
  };

  const handleSelectExp = (exp) => {
    setSelectedExp(exp);
    setFormData({
      role: exp.role || '',
      company: exp.company || '',
      type: exp.type || 'Full-time',
      date: exp.date || '',
      current: exp.current || false,
      desc: exp.desc || '',
      tags: Array.isArray(exp.tags) ? exp.tags.join(', ') : exp.tags || '',
    });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(t => t);
      const expData = {
        ...formData,
        tags: tagsArray,
      };

      if (selectedExp) {
        await ManageData.updateExperience(selectedExp.id, expData);
      } else {
        await ManageData.insertExperience(expData);
      }

      loadExperiences();
      resetForm();
      onDataUpdate?.();
    } catch (error) {
      console.error('Error saving experience:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this experience?')) {
      try {
        await ManageData.deleteExperience(id);
        loadExperiences();
        resetForm();
        onDataUpdate?.();
      } catch (error) {
        console.error('Error deleting experience:', error);
      }
    }
  };

  const resetForm = () => {
    setSelectedExp(null);
    setFormData({
      role: '',
      company: '',
      type: 'Full-time',
      date: '',
      current: false,
      desc: '',
      tags: '',
    });
  };

  return (
    <Container>
      <Section>
        <SectionTitle>Experiences ({experiences.length})</SectionTitle>
        <ItemsList>
          {experiences.map(exp => (
            <Item key={exp.id} onClick={() => handleSelectExp(exp)}>
              <ItemDetails>
                <ItemName>{exp.role}</ItemName>
                <ItemMeta>{exp.company} • {exp.type}</ItemMeta>
              </ItemDetails>
              <ActionBtn delete onClick={(e) => { e.stopPropagation(); handleDelete(exp.id); }}>
                Delete
              </ActionBtn>
            </Item>
          ))}
        </ItemsList>
      </Section>

      <Section>
        <SectionTitle>{selectedExp ? 'Edit Experience' : 'New Experience'}</SectionTitle>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Job Title/Role *</Label>
            <Input
              required
              value={formData.role}
              onChange={(e) => handleInputChange('role', e.target.value)}
              placeholder="e.g., Senior Frontend Developer"
            />
          </FormGroup>

          <FormGroup>
            <Label>Company *</Label>
            <Input
              required
              value={formData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              placeholder="e.g., TechCorp Global"
            />
          </FormGroup>

          <FormGroup>
            <Label>Employment Type</Label>
            <Input
              value={formData.type}
              onChange={(e) => handleInputChange('type', e.target.value)}
              placeholder="e.g., Full-time, Contract, Freelance"
            />
          </FormGroup>

          <FormGroup>
            <Label>Duration</Label>
            <Input
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              placeholder="e.g., Aug 2024 — Present"
            />
          </FormGroup>

          <FormGroup>
            <Label>Description *</Label>
            <TextArea
              required
              value={formData.desc}
              onChange={(e) => handleInputChange('desc', e.target.value)}
              placeholder="Describe your responsibilities and achievements..."
            />
          </FormGroup>

          <FormGroup>
            <Label>Skills Used (comma-separated)</Label>
            <Input
              value={formData.tags}
              onChange={(e) => handleInputChange('tags', e.target.value)}
              placeholder="React, Node.js, AWS, PostgreSQL"
            />
          </FormGroup>

          <FormGroup style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <input
              type="checkbox"
              id="current"
              checked={formData.current}
              onChange={(e) => handleInputChange('current', e.target.checked)}
              style={{ width: 16, height: 16, cursor: 'pointer' }}
            />
            <Label htmlFor="current" style={{ margin: 0 }}>Currently Working Here</Label>
          </FormGroup>

          <ButtonGroup>
            <Button type="submit">
              {selectedExp ? 'Update Experience' : 'Create Experience'}
            </Button>
            {selectedExp && (
              <Button type="button" secondary onClick={resetForm}>
                Clear
              </Button>
            )}
          </ButtonGroup>
        </Form>
      </Section>
    </Container>
  );
};

export default ExperiencesManager;
