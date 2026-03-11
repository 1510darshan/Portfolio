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

const ItemInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ItemIcon = styled.span`
  font-size: 1.2rem;
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
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

const SkillsManager = ({ onDataUpdate }) => {
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Frontend',
    level: 80,
    color: '#22d3ee',
    icon: '⚛',
    featured: false,
    order: 0,
  });

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      const data = await ManageData.getAllSkills();
      setSkills(data || []);
    } catch (error) {
      console.error('Error loading skills:', error);
    }
  };

  const handleSelectSkill = (skill) => {
    setSelectedSkill(skill);
    setFormData({
      name: skill.name || '',
      category: skill.category || 'Frontend',
      level: skill.level || 80,
      color: skill.color || '#22d3ee',
      icon: skill.icon || '⚛',
      featured: skill.featured || false,
      order: skill.order || 0,
    });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedSkill) {
        await ManageData.updateSkill(selectedSkill.id, formData);
      } else {
        await ManageData.insertSkill(formData);
      }

      loadSkills();
      resetForm();
      onDataUpdate?.();
    } catch (error) {
      console.error('Error saving skill:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this skill?')) {
      try {
        await ManageData.deleteSkill(id);
        loadSkills();
        resetForm();
        onDataUpdate?.();
      } catch (error) {
        console.error('Error deleting skill:', error);
      }
    }
  };

  const resetForm = () => {
    setSelectedSkill(null);
    setFormData({
      name: '',
      category: 'Frontend',
      level: 80,
      color: '#22d3ee',
      icon: '⚛',
      featured: false,
      order: 0,
    });
  };

  return (
    <Container>
      <Section>
        <SectionTitle>Skills ({skills.length})</SectionTitle>
        <ItemsList>
          {skills.map(skill => (
            <Item key={skill.id} onClick={() => handleSelectSkill(skill)}>
              <ItemInfo>
                <ItemIcon>{skill.icon}</ItemIcon>
                <ItemDetails>
                  <ItemName>{skill.name}</ItemName>
                  <ItemMeta>{skill.category} • {skill.level}%</ItemMeta>
                </ItemDetails>
              </ItemInfo>
              <ActionBtn delete onClick={(e) => { e.stopPropagation(); handleDelete(skill.id); }}>
                Delete
              </ActionBtn>
            </Item>
          ))}
        </ItemsList>
      </Section>

      <Section>
        <SectionTitle>{selectedSkill ? 'Edit Skill' : 'New Skill'}</SectionTitle>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Skill Name *</Label>
            <Input
              required
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="e.g., React"
            />
          </FormGroup>

          <FormGroup>
            <Label>Category</Label>
            <Input
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              placeholder="e.g., Frontend, Backend, DevOps"
            />
          </FormGroup>

          <FormGroup>
            <Label>Proficiency Level (0-100)</Label>
            <Input
              type="number"
              min="0"
              max="100"
              value={formData.level}
              onChange={(e) => handleInputChange('level', parseInt(e.target.value))}
            />
          </FormGroup>

          <FormGroup>
            <Label>Icon/Emoji</Label>
            <Input
              value={formData.icon}
              onChange={(e) => handleInputChange('icon', e.target.value)}
              placeholder="e.g., ⚛ or 💚"
              maxLength="2"
            />
          </FormGroup>

          <FormGroup>
            <Label>Color</Label>
            <Input
              type="color"
              value={formData.color}
              onChange={(e) => handleInputChange('color', e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>Order</Label>
            <Input
              type="number"
              value={formData.order}
              onChange={(e) => handleInputChange('order', parseInt(e.target.value))}
            />
          </FormGroup>

          <FormGroup style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => handleInputChange('featured', e.target.checked)}
              style={{ width: 16, height: 16, cursor: 'pointer' }}
            />
            <Label htmlFor="featured" style={{ margin: 0 }}>Featured Skill (show in rings)</Label>
          </FormGroup>

          <ButtonGroup>
            <Button type="submit">
              {selectedSkill ? 'Update Skill' : 'Create Skill'}
            </Button>
            {selectedSkill && (
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

export default SkillsManager;
