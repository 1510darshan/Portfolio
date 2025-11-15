import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaImage } from 'react-icons/fa';
import { projectAPI, uploadAPI } from '../services/api';

const ProjectManager = ({ onUpdate }) => {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    categories: [],
    tags: '',
    githubLink: '',
    liveLink: '',
    featured: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchProjects = async () => {
    try {
      const response = await projectAPI.getAll();
      setProjects(response.data.data);
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error('Error fetching projects:', error);
      setError('Failed to fetch projects');
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCategoryChange = (category) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('Please select a valid image file (JPEG, PNG, GIF, WebP)');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const response = await uploadAPI.single(file);
      const imageUrl = `http://localhost:5000${response.data.data.url}`;
      setFormData(prev => ({ ...prev, image: imageUrl }));
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate categories
    if (formData.categories.length === 0) {
      setError('Please select at least one category');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      const projectData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };

      console.log('Submitting project data:', projectData);

      if (editingProject) {
        await projectAPI.update(editingProject._id, projectData);
      } else {
        await projectAPI.create(projectData);
      }

      setShowModal(false);
      setEditingProject(null);
      setFormData({
        title: '',
        description: '',
        image: '',
        categories: [],
        tags: '',
        githubLink: '',
        liveLink: '',
        featured: false
      });
      fetchProjects();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to save project');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      image: project.image,
      categories: project.categories || (project.category ? [project.category] : []),
      tags: project.tags.join(', '),
      githubLink: project.githubLink || '',
      liveLink: project.liveLink || '',
      featured: project.featured || false
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectAPI.delete(id);
        fetchProjects();
      } catch (error) {
        setError('Failed to delete project');
      }
    }
  };

  const openAddModal = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      description: '',
      image: '',
      categories: [],
      tags: '',
      githubLink: '',
      liveLink: '',
      featured: false
    });
    setShowModal(true);
  };

  return (
    <Container>
      <Header>
        <Title>Project Management</Title>
        <AddButton onClick={openAddModal}>
          <FaPlus /> Add Project
        </AddButton>
      </Header>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <ProjectGrid>
        {projects.map(project => (
          <ProjectCard key={project._id}>
            <ProjectImage src={project.image} alt={project.title} />
            <ProjectInfo>
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectCategory>
                {(project.categories || [project.category]).join(', ')}
              </ProjectCategory>
              <ProjectTags>
                {project.tags.map((tag, index) => (
                  <Tag key={index}>{tag}</Tag>
                ))}
              </ProjectTags>
              <ProjectDescription>{project.description}</ProjectDescription>
              <ProjectActions>
                <EditButton onClick={() => handleEdit(project)}>
                  <FaEdit /> Edit
                </EditButton>
                <DeleteButton onClick={() => handleDelete(project._id)}>
                  <FaTrash /> Delete
                </DeleteButton>
              </ProjectActions>
            </ProjectInfo>
          </ProjectCard>
        ))}
      </ProjectGrid>

      {showModal && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>{editingProject ? 'Edit Project' : 'Add New Project'}</ModalTitle>
              <CloseButton onClick={() => setShowModal(false)}>
                <FaTimes />
              </CloseButton>
            </ModalHeader>

            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Title *</Label>
                <Input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
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
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Project Image *</Label>
                <FileUploadWrapper>
                  <Input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg or upload below"
                    required
                  />
                  <FileInputLabel>
                    <FaImage />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ display: 'none' }}
                    />
                    {uploading ? 'Uploading...' : 'Browse'}
                  </FileInputLabel>
                </FileUploadWrapper>
                {formData.image && (
                  <ImagePreview>
                    <img src={formData.image} alt="Project Preview" />
                  </ImagePreview>
                )}
              </FormGroup>

              <FormRow>
                <FormGroup>
                  <Label>Categories * (Select one or more)</Label>
                  <CategoryGrid>
                    {[
                      { value: 'fullstack', label: 'Full Stack' },
                      { value: 'frontend', label: 'Frontend' },
                      { value: 'backend', label: 'Backend' },
                      { value: 'mobile', label: 'Mobile App' },
                      { value: 'devops', label: 'DevOps' },
                      { value: 'ai-ml', label: 'AI/ML' },
                      { value: 'uiux', label: 'UI/UX Design' },
                      { value: 'database', label: 'Database' },
                      { value: 'security', label: 'Security' },
                      { value: 'java', label: 'Java' },
                      { value: 'python', label: 'Python' },
                      { value: 'android', label: 'Android' },
                      { value: 'other', label: 'Other' }
                    ].map(cat => (
                      <CategoryCheckbox 
                        key={cat.value}
                        $selected={formData.categories.includes(cat.value)}
                        onClick={() => handleCategoryChange(cat.value)}
                      >
                        <input
                          type="checkbox"
                          checked={formData.categories.includes(cat.value)}
                          onChange={() => {}}
                        />
                        <span>{cat.label}</span>
                      </CategoryCheckbox>
                    ))}
                  </CategoryGrid>
                  {formData.categories.length === 0 && (
                    <ErrorText>Please select at least one category</ErrorText>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label>Tags (comma separated) *</Label>
                  <Input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    placeholder="React, Node.js, MongoDB"
                    required
                  />
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <Label>GitHub Link</Label>
                  <Input
                    type="url"
                    name="githubLink"
                    value={formData.githubLink}
                    onChange={handleInputChange}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Live Link</Label>
                  <Input
                    type="url"
                    name="liveLink"
                    value={formData.liveLink}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </FormRow>

              <FormGroup>
                <CheckboxLabel>
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                  />
                  <span>Featured Project</span>
                </CheckboxLabel>
              </FormGroup>

              <ModalActions>
                <CancelButton type="button" onClick={() => setShowModal(false)}>
                  Cancel
                </CancelButton>
                <SubmitButton type="submit" disabled={loading || formData.categories.length === 0}>
                  {loading ? 'Saving...' : (editingProject ? 'Update' : 'Create')}
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

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
`;

const ProjectCard = styled.div`
  background: #1a1a2e;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ProjectInfo = styled.div`
  padding: 20px;
`;

const ProjectTitle = styled.h3`
  color: #fff;
  font-size: 1.3rem;
  margin-bottom: 8px;
`;

const ProjectCategory = styled.span`
  display: inline-block;
  background: #00d4ff;
  color: #0a0a0a;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 12px;
  text-transform: capitalize;
`;

const ProjectTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
`;

const Tag = styled.span`
  background: rgba(255, 255, 255, 0.1);
  color: #aaa;
  padding: 4px 10px;
  border-radius: 15px;
  font-size: 0.8rem;
`;

const ProjectDescription = styled.p`
  color: #aaa;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 15px;
`;

const ProjectActions = styled.div`
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
  max-width: 700px;
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

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
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

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #fff;
  cursor: pointer;

  input[type="checkbox"] {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
`;

const FileUploadWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  width: 100%;
  
  ${Input} {
    flex: 1;
    min-width: 0;
  }
`;

const FileInputLabel = styled.label`
  padding: 12px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }
  
  svg {
    font-size: 1rem;
  }
`;

const ImagePreview = styled.div`
  margin-top: 15px;
  
  img {
    width: 200px;
    height: 150px;
    object-fit: cover;
    border-radius: 8px;
    border: 2px solid #00d4ff;
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

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
  margin-top: 10px;
`;

const CategoryCheckbox = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 15px;
  background: ${props => props.$selected ? 'rgba(102, 126, 234, 0.3)' : 'rgba(255, 255, 255, 0.05)'};
  border: 2px solid ${props => props.$selected ? '#667eea' : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 6px;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  user-select: none;

  &:hover {
    background: ${props => props.$selected ? 'rgba(102, 126, 234, 0.4)' : 'rgba(255, 255, 255, 0.1)'};
    border-color: #667eea;
  }

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
    accent-color: #667eea;
  }

  span {
    font-size: 0.9rem;
    font-weight: 500;
  }
`;

const ErrorText = styled.div`
  color: #ff4757;
  font-size: 0.85rem;
  margin-top: 5px;
`;

export default ProjectManager;
