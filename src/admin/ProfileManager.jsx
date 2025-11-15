import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaSave, FaUpload, FaTimes, FaImage, FaFilePdf } from 'react-icons/fa';
import { profileAPI, uploadAPI } from '../services/api';

const ProfileManager = () => {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    bio: '',
    email: '',
    phone: '',
    location: '',
    profileImage: '',
    resumeUrl: '',
    github: '',
    linkedin: '',
    twitter: '',
    website: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploading, setUploading] = useState({
    profileImage: false,
    resume: false
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await profileAPI.get();
      if (response.data.data) {
        setFormData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (fieldName === 'profileImage') {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        setError('Please select a valid image file (JPEG, PNG, GIF, WebP)');
        return;
      }
    } else if (fieldName === 'resumeUrl') {
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        setError('Please select a valid document file (PDF, DOC, DOCX)');
        return;
      }
    }

    // Check file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }

    setUploading(prev => ({ ...prev, [fieldName]: true }));
    setError('');

    try {
      const response = await uploadAPI.single(file);
      const fileUrl = `http://localhost:5000${response.data.data.url}`;
      
      setFormData(prev => ({
        ...prev,
        [fieldName]: fileUrl
      }));
      
      setSuccess(`${fieldName === 'profileImage' ? 'Image' : 'Resume'} uploaded successfully!`);
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to upload file');
    } finally {
      setUploading(prev => ({ ...prev, [fieldName]: false }));
    }
  };

  const clearFile = (fieldName) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: ''
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await profileAPI.update(formData);
      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Header>
        <Title>Profile Settings</Title>
      </Header>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}

      <Form onSubmit={handleSubmit}>
        <Section>
          <SectionTitle>Personal Information</SectionTitle>
          <FormGrid>
            <FormGroup>
              <Label>Full Name *</Label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Professional Title *</Label>
              <Input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Full Stack Developer"
                required
              />
            </FormGroup>

            <FormGroup fullWidth>
              <Label>Bio *</Label>
              <TextArea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows="4"
                placeholder="Tell visitors about yourself..."
                required
              />
            </FormGroup>
          </FormGrid>
        </Section>

        <Section>
          <SectionTitle>Contact Information</SectionTitle>
          <FormGrid>
            <FormGroup>
              <Label>Email *</Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Phone</Label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g., San Francisco, CA"
              />
            </FormGroup>
          </FormGrid>
        </Section>

        <Section>
          <SectionTitle>Media</SectionTitle>
          <FormGrid>
            <FormGroup fullWidth>
              <Label>Profile Image</Label>
              <FileUploadWrapper>
                <Input
                  type="url"
                  name="profileImage"
                  value={formData.profileImage}
                  onChange={handleInputChange}
                  placeholder="https://example.com/profile.jpg or upload below"
                />
                <FileInputLabel>
                  <FaImage />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'profileImage')}
                    style={{ display: 'none' }}
                  />
                  {uploading.profileImage ? 'Uploading...' : 'Browse Image'}
                </FileInputLabel>
                {formData.profileImage && (
                  <ClearButton onClick={() => clearFile('profileImage')} type="button">
                    <FaTimes />
                  </ClearButton>
                )}
              </FileUploadWrapper>
              {formData.profileImage && (
                <ImagePreview>
                  <img src={formData.profileImage} alt="Profile Preview" />
                </ImagePreview>
              )}
            </FormGroup>

            <FormGroup fullWidth>
              <Label>Resume / CV</Label>
              <FileUploadWrapper>
                <Input
                  type="url"
                  name="resumeUrl"
                  value={formData.resumeUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com/resume.pdf or upload below"
                />
                <FileInputLabel>
                  <FaFilePdf />
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileUpload(e, 'resumeUrl')}
                    style={{ display: 'none' }}
                  />
                  {uploading.resume ? 'Uploading...' : 'Browse File'}
                </FileInputLabel>
                {formData.resumeUrl && (
                  <ClearButton onClick={() => clearFile('resumeUrl')} type="button">
                    <FaTimes />
                  </ClearButton>
                )}
              </FileUploadWrapper>
              {formData.resumeUrl && (
                <FileInfo>
                  <FaFilePdf /> Current file: {formData.resumeUrl.split('/').pop()}
                </FileInfo>
              )}
            </FormGroup>
          </FormGrid>
        </Section>

        <Section>
          <SectionTitle>Social Links</SectionTitle>
          <FormGrid>
            <FormGroup>
              <Label>GitHub</Label>
              <Input
                type="url"
                name="github"
                value={formData.github}
                onChange={handleInputChange}
                placeholder="https://github.com/username"
              />
            </FormGroup>

            <FormGroup>
              <Label>LinkedIn</Label>
              <Input
                type="url"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleInputChange}
                placeholder="https://linkedin.com/in/username"
              />
            </FormGroup>

            <FormGroup>
              <Label>Twitter</Label>
              <Input
                type="url"
                name="twitter"
                value={formData.twitter}
                onChange={handleInputChange}
                placeholder="https://twitter.com/username"
              />
            </FormGroup>

            <FormGroup>
              <Label>Website</Label>
              <Input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="https://yourwebsite.com"
              />
            </FormGroup>
          </FormGrid>
        </Section>

        <SubmitButton type="submit" disabled={loading}>
          <FaSave /> {loading ? 'Saving...' : 'Save Changes'}
        </SubmitButton>
      </Form>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  padding: 30px;
  max-width: 1200px;
`;

const Header = styled.div`
  margin-bottom: 30px;
`;

const Title = styled.h2`
  color: #fff;
  font-size: 2rem;
`;

const ErrorMessage = styled.div`
  background: #ff4757;
  color: #fff;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const SuccessMessage = styled.div`
  background: #4CAF50;
  color: #fff;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const Form = styled.form`
  background: #1a1a2e;
  padding: 30px;
  border-radius: 12px;
`;

const Section = styled.div`
  margin-bottom: 40px;

  &:last-of-type {
    margin-bottom: 30px;
  }
`;

const SectionTitle = styled.h3`
  color: #00d4ff;
  font-size: 1.3rem;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid rgba(0, 212, 255, 0.3);
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  grid-column: ${props => props.fullWidth ? '1 / -1' : 'span 1'};
`;

const Label = styled.label`
  display: block;
  color: #fff;
  margin-bottom: 8px;
  font-size: 0.95rem;
  font-weight: 500;
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

  &::placeholder {
    color: #666;
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

  &::placeholder {
    color: #666;
  }
`;

const ImagePreview = styled.div`
  margin-top: 15px;
  
  img {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 50%;
    border: 3px solid #00d4ff;
  }
`;

const FileUploadWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  position: relative;
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

const ClearButton = styled.button`
  padding: 12px;
  background: #ff4757;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: #ff3838;
    transform: scale(1.05);
  }
  
  svg {
    font-size: 1rem;
  }
`;

const FileInfo = styled.div`
  margin-top: 10px;
  padding: 10px;
  background: rgba(0, 212, 255, 0.1);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 6px;
  color: #00d4ff;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;
  
  svg {
    font-size: 1.2rem;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 15px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: transform 0.3s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export default ProfileManager;
