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

const ItemName = styled.span`
  color: white;
  font-weight: 600;
  font-size: 0.95rem;
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
  min-height: 100px;

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

const ProjectsManager = ({ onDataUpdate }) => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Fullstack',
    desc: '',
    tech: '',
    type: 'Web',
    accent: '#22d3ee',
    status: 'Completed',
    live: '',
    github: '',
  });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await ManageData.getAllProjects();
      setProjects(data || []);
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  };

  const handleSelectProject = (project) => {
    setSelectedProject(project);
    setFormData({
      name: project.name || '',
      category: project.category || 'Fullstack',
      desc: project.desc || '',
      tech: Array.isArray(project.tech) ? project.tech.join(', ') : project.tech || '',
      type: project.type || 'Web',
      accent: project.accent || '#22d3ee',
      status: project.status || 'Completed',
      live: project.live || '',
      github: project.github || '',
    });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const techArray = formData.tech.split(',').map(t => t.trim()).filter(t => t);
      const projectData = {
        ...formData,
        tech: techArray,
      };

      if (selectedProject) {
        await ManageData.updateProject(selectedProject.id, projectData);
      } else {
        await ManageData.insertProject(projectData);
      }

      loadProjects();
      resetForm();
      onDataUpdate?.();
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this project?')) {
      try {
        await ManageData.deleteProject(id);
        loadProjects();
        resetForm();
        onDataUpdate?.();
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const resetForm = () => {
    setSelectedProject(null);
    setFormData({
      name: '',
      category: 'Fullstack',
      desc: '',
      tech: '',
      type: 'Web',
      accent: '#22d3ee',
      status: 'Completed',
      live: '',
      github: '',
    });
  };

  return (
    <Container>
      <Section>
        <SectionTitle>Projects ({projects.length})</SectionTitle>
        <ItemsList>
          {projects.map(project => (
            <Item key={project.id} onClick={() => handleSelectProject(project)}>
              <ItemName>{project.name}</ItemName>
              <ActionBtn delete onClick={(e) => { e.stopPropagation(); handleDelete(project.id); }}>
                Delete
              </ActionBtn>
            </Item>
          ))}
        </ItemsList>
      </Section>

      <Section>
        <SectionTitle>{selectedProject ? 'Edit Project' : 'New Project'}</SectionTitle>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Project Name *</Label>
            <Input
              required
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="e.g., E-Commerce Platform"
            />
          </FormGroup>

          <FormGroup>
            <Label>Category</Label>
            <Input
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              placeholder="e.g., Fullstack, Frontend, Backend"
            />
          </FormGroup>

          <FormGroup>
            <Label>Description *</Label>
            <TextArea
              required
              value={formData.desc}
              onChange={(e) => handleInputChange('desc', e.target.value)}
              placeholder="Describe your project..."
            />
          </FormGroup>

          <FormGroup>
            <Label>Technologies (comma-separated)</Label>
            <Input
              value={formData.tech}
              onChange={(e) => handleInputChange('tech', e.target.value)}
              placeholder="React, Node.js, MongoDB"
            />
          </FormGroup>

          <FormGroup>
            <Label>Type</Label>
            <Input
              value={formData.type}
              onChange={(e) => handleInputChange('type', e.target.value)}
              placeholder="e.g., Web, Mobile, Desktop"
            />
          </FormGroup>

          <FormGroup>
            <Label>Accent Color</Label>
            <Input
              type="color"
              value={formData.accent}
              onChange={(e) => handleInputChange('accent', e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>Status</Label>
            <Input
              value={formData.status}
              onChange={(e) => handleInputChange('status', e.target.value)}
              placeholder="e.g., Completed, In Progress"
            />
          </FormGroup>

          <FormGroup>
            <Label>Live URL</Label>
            <Input
              value={formData.live}
              onChange={(e) => handleInputChange('live', e.target.value)}
              placeholder="https://example.com"
            />
          </FormGroup>

          <FormGroup>
            <Label>GitHub URL</Label>
            <Input
              value={formData.github}
              onChange={(e) => handleInputChange('github', e.target.value)}
              placeholder="https://github.com/..."
            />
          </FormGroup>

          <ButtonGroup>
            <Button type="submit">
              {selectedProject ? 'Update Project' : 'Create Project'}
            </Button>
            {selectedProject && (
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

export default ProjectsManager;
