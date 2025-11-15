import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt, FaTwitter, FaGlobe } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import { contactAPI, profileAPI } from '../../services/api';

// Initialize EmailJS with your public key
emailjs.init('wiq1b55zPy2_IdIX3');

const Contact = () => {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isFormHighlighted, setIsFormHighlighted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await profileAPI.get();
      if (response.data.data) {
        setProfile(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  // Listen for external form updates (from navbar button)
  useEffect(() => {
    const handleFormUpdate = (event) => {
      if (event.detail) {
        setFormData(prevData => ({
          ...prevData,
          ...event.detail
        }));
        
        // Add visual feedback
        setIsFormHighlighted(true);
        setTimeout(() => setIsFormHighlighted(false), 2000);
      }
    };

    window.addEventListener('updateContactForm', handleFormUpdate);
    
    return () => {
      window.removeEventListener('updateContactForm', handleFormUpdate);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
    
    // Clear submit status when user makes changes
    if (submitStatus.message) {
      setSubmitStatus({ type: '', message: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'Please fix the errors before submitting' 
      });
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      // Save to database first
      await contactAPI.submit(formData);
      
      // Then send email via EmailJS
      const serviceId = 'service_x3z1nzp';
      const templateId = 'template_3q4xr2j';
      
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        to_name: 'Darshan Walhe',
        to_email: 'darshanwalhe1510@gmail.com',
        subject: formData.subject,
        message: formData.message,
        reply_to: formData.email
      };
      
      await emailjs.send(serviceId, templateId, templateParams);
      
      setSubmitStatus({ 
        type: 'success', 
        message: 'Thank you for your message! I\'ll get back to you soon.' 
      });
      
      // Reset form
      setFormData({ name: '', email: '', subject: '', message: '' });
      
    } catch (error) {
      console.error('Error submitting contact form:', error);
      
      setSubmitStatus({ 
        type: 'error', 
        message: `Failed to send message: ${error.text || error.message}. Please try emailing me directly at darshanwalhe1510@gmail.com` 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ContactContainer id="contact">
      <BackgroundBlob1 />
      <BackgroundBlob2 />
      
      <SectionHeading>
        Get In <SpanHeading>Touch</SpanHeading>
        <HeadingAccent />
      </SectionHeading>
      
      <ParaPhrase>
        Ready to bring your ideas to life? Let's collaborate and create something amazing together.
      </ParaPhrase>

      <ContactContent>
        <ContactInfo>
          <ContactInfoTitle>Let's Connect</ContactInfoTitle>
          <ContactInfoText>
            I'm always open to discussing new opportunities, interesting projects, 
            or just having a chat about technology and development.
          </ContactInfoText>
          
          <ContactDetails>
            <ContactItem>
              <ContactIcon>
                <FaEnvelope />
              </ContactIcon>
              <ContactText>
                <ContactLabel>Email</ContactLabel>
                <ContactValue>{profile?.email || 'darshanwalhe1510@gmail.com'}</ContactValue>
              </ContactText>
            </ContactItem>
            
            {profile?.phone && (
              <ContactItem>
                <ContactIcon>
                  <FaPhone />
                </ContactIcon>
                <ContactText>
                  <ContactLabel>Phone</ContactLabel>
                  <ContactValue>{profile.phone}</ContactValue>
                </ContactText>
              </ContactItem>
            )}
            
            {profile?.location && (
              <ContactItem>
                <ContactIcon>
                  <FaMapMarkerAlt />
                </ContactIcon>
                <ContactText>
                  <ContactLabel>Location</ContactLabel>
                  <ContactValue>{profile.location}</ContactValue>
                </ContactText>
              </ContactItem>
            )}
          </ContactDetails>

          <SocialLinksContainer>
            {profile?.github && (
              <SocialLink href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="Visit my GitHub profile">
                <FaGithub />
              </SocialLink>
            )}
            {profile?.linkedin && (
              <SocialLink href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Visit my LinkedIn profile">
                <FaLinkedin />
              </SocialLink>
            )}
            {profile?.twitter && (
              <SocialLink href={profile.twitter} target="_blank" rel="noopener noreferrer" aria-label="Visit my Twitter profile">
                <FaTwitter />
              </SocialLink>
            )}
            {profile?.website && (
              <SocialLink href={profile.website} target="_blank" rel="noopener noreferrer" aria-label="Visit my website">
                <FaGlobe />
              </SocialLink>
            )}
            {!profile && (
              <>
                <SocialLink href="https://github.com/1510darshan" target="_blank" rel="noopener noreferrer" aria-label="Visit my GitHub profile">
                  <FaGithub />
                </SocialLink>
                <SocialLink href="https://in.linkedin.com/in/darshan-walhe-475b60255" target="_blank" rel="noopener noreferrer" aria-label="Visit my LinkedIn profile">
                  <FaLinkedin />
                </SocialLink>
                <SocialLink href="https://www.instagram.com/dwalhe2402/" target="_blank" rel="noopener noreferrer" aria-label="Visit my Instagram profile">
                  <FaInstagram />
                </SocialLink>
              </>
            )}
          </SocialLinksContainer>
        </ContactInfo>

        <ContactForm onSubmit={handleSubmit} $isHighlighted={isFormHighlighted}>
          <FormTitle>Send me a message</FormTitle>
          
          {submitStatus.message && (
            <StatusMessage type={submitStatus.type}>
              {submitStatus.message}
            </StatusMessage>
          )}
          
          <FormGroup>
            <FormInput
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              $hasError={!!errors.name}
              disabled={isSubmitting}
              aria-label="Your Name"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && <ErrorMessage id="name-error">{errors.name}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <FormInput
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              $hasError={!!errors.email}
              disabled={isSubmitting}
              aria-label="Your Email"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && <ErrorMessage id="email-error">{errors.email}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <FormInput
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              $hasError={!!errors.subject}
              disabled={isSubmitting}
              aria-label="Subject"
              aria-invalid={!!errors.subject}
              aria-describedby={errors.subject ? "subject-error" : undefined}
            />
            {errors.subject && <ErrorMessage id="subject-error">{errors.subject}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <FormTextarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              $hasError={!!errors.message}
              disabled={isSubmitting}
              aria-label="Your Message"
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
            />
            {errors.message && <ErrorMessage id="message-error">{errors.message}</ErrorMessage>}
          </FormGroup>
          
          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Message'}
            <ButtonGlow />
          </SubmitButton>
        </ContactForm>
      </ContactContent>
    </ContactContainer>
  );
};

export default Contact;

// Animations
const float = keyframes`
  0% { transform: translate(0, 0); }
  50% { transform: translate(10px, -10px); }
  100% { transform: translate(0, 0); }
`;

// Styled Components
const ContactContainer = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 2rem 1rem 4rem;
  overflow: hidden;
  background-color: #0f172a;
  color: #e2e8f0;
  
  @media (min-width: 768px) {
    padding: 4rem 1.5rem 6rem;
  }
  
  @media (min-width: 860px) {
    padding: 6rem 2rem 8rem;
  }
`;

const SectionHeading = styled.h2`
  font-family: "Quicksand", sans-serif;
  font-weight: 700;
  font-size: 2rem;
  text-align: center;
  margin-bottom: 1rem;
  position: relative;
  z-index: 2;
  color: #f8fafc;
  
  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
  
  @media (min-width: 1024px) {
    font-size: 3rem;
  }
`;

const SpanHeading = styled.span`
  background: linear-gradient(90deg, #3b82f6, #a855f7);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const HeadingAccent = styled.div`
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #3b82f6, #a855f7);
  margin: 1rem auto 0;
  border-radius: 2px;
`;

const ParaPhrase = styled.p`
  font-size: 1rem;
  line-height: 1.8;
  color: #94a3b8;
  text-align: center;
  margin-bottom: 2rem;
  max-width: 600px;
  z-index: 2;
  position: relative;
  
  @media (min-width: 768px) {
    font-size: 1.125rem;
    margin-bottom: 3rem;
  }
`;

const ContactContent = styled.div`
  max-width: 1200px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  z-index: 2;
  
  @media (min-width: 768px) {
    gap: 3rem;
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
  }
`;

const ContactInfo = styled.div`
  padding: 1.5rem;
  background: rgba(30, 41, 59, 0.3);
  border-radius: 16px;
  border: 1px solid rgba(59, 130, 246, 0.2);
  backdrop-filter: blur(10px);
  
  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const ContactInfoTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #f8fafc;
  margin-bottom: 1rem;
  
  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ContactInfoText = styled.p`
  color: #94a3b8;
  line-height: 1.6;
  margin-bottom: 2rem;
  font-size: 0.9rem;
  
  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

const ContactDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  @media (min-width: 768px) {
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  @media (min-width: 768px) {
    gap: 1rem;
  }
`;

const ContactIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(168, 85, 247, 0.2));
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #60a5fa;
  font-size: 1rem;
  flex-shrink: 0;
  
  @media (min-width: 768px) {
    width: 48px;
    height: 48px;
    font-size: 1.2rem;
  }
`;

const ContactText = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: 1;
`;

const ContactLabel = styled.span`
  font-size: 0.75rem;
  color: #94a3b8;
  font-weight: 500;
  
  @media (min-width: 768px) {
    font-size: 0.875rem;
  }
`;

const ContactValue = styled.span`
  color: #f8fafc;
  font-weight: 500;
  font-size: 0.9rem;
  word-break: break-word;
  
  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

const SocialLinksContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
  
  @media (min-width: 768px) {
    gap: 1rem;
  }
`;

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  background: rgba(30, 41, 59, 0.5);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  font-size: 1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  flex-shrink: 0;
  
  @media (min-width: 768px) {
    width: 48px;
    height: 48px;
    font-size: 1.2rem;
  }
  
  &:hover {
    background: rgba(59, 130, 246, 0.1);
    border-color: rgba(59, 130, 246, 0.5);
    color: #60a5fa;
    transform: translateY(-2px);
  }
`;

const ContactForm = styled.form`
  padding: 1.5rem;
  background: rgba(30, 41, 59, 0.3);
  border-radius: 16px;
  border: 1px solid ${props => props.isHighlighted ? 'rgba(59, 130, 246, 0.6)' : 'rgba(59, 130, 246, 0.2)'};
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  @media (min-width: 768px) {
    padding: 2rem;
  }
  
  ${props => props.isHighlighted && `
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
    background: rgba(30, 41, 59, 0.4);
  `}
`;

const FormTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #f8fafc;
  margin-bottom: 1.5rem;
  
  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
  
  @media (min-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid ${props => props.$hasError ? '#ef4444' : 'rgba(59, 130, 246, 0.3)'};
  border-radius: 8px;
  color: #f8fafc;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  box-sizing: border-box;
  
  @media (min-width: 768px) {
    padding: 1rem;
    font-size: 1rem;
  }
  
  &::placeholder {
    color: #64748b;
  }
  
  &:focus {
    outline: none;
    border-color: ${props => props.$hasError ? '#ef4444' : 'rgba(59, 130, 246, 0.6)'};
    background: rgba(15, 23, 42, 0.7);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid ${props => props.$hasError ? '#ef4444' : 'rgba(59, 130, 246, 0.3)'};
  border-radius: 8px;
  color: #f8fafc;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  resize: vertical;
  font-family: inherit;
  box-sizing: border-box;
  min-height: 100px;
  
  @media (min-width: 768px) {
    padding: 1rem;
    font-size: 1rem;
    min-height: 120px;
  }
  
  &::placeholder {
    color: #64748b;
  }
  
  &:focus {
    outline: none;
    border-color: ${props => props.$hasError ? '#ef4444' : 'rgba(59, 130, 246, 0.6)'};
    background: rgba(15, 23, 42, 0.7);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.span`
  display: block;
  color: #ef4444;
  font-size: 0.8rem;
  margin-top: 0.25rem;
  margin-left: 0.25rem;
  
  @media (min-width: 768px) {
    font-size: 0.85rem;
  }
`;

const StatusMessage = styled.div`
  padding: 0.75rem 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  background: ${props => props.type === 'success' 
    ? 'rgba(34, 197, 94, 0.1)' 
    : 'rgba(239, 68, 68, 0.1)'};
  border: 1px solid ${props => props.type === 'success' 
    ? 'rgba(34, 197, 94, 0.3)' 
    : 'rgba(239, 68, 68, 0.3)'};
  color: ${props => props.type === 'success' ? '#4ade80' : '#f87171'};
  
  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(90deg, #3b82f6, #a855f7);
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(168, 85, 247, 0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  width: 100%;
  
  @media (min-width: 768px) {
    padding: 1rem 2rem;
    font-size: 1rem;
  }
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 25px rgba(168, 85, 247, 0.4);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }
  
  &:hover:not(:disabled)::before {
    left: 100%;
  }
`;

const ButtonGlow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, #3b82f6, #a855f7);
  z-index: -1;
  filter: blur(20px);
  opacity: 0.3;
`;

const BackgroundBlob1 = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, rgba(59, 130, 246, 0.03) 70%, transparent 100%);
  top: -100px;
  right: -100px;
  z-index: 1;
  animation: ${float} 15s ease-in-out infinite alternate;
  
  @media (min-width: 768px) {
    width: 500px;
    height: 500px;
    top: -150px;
    right: -150px;
  }
  
  @media (min-width: 1024px) {
    width: 600px;
    height: 600px;
    top: -200px;
    right: -200px;
  }
`;

const BackgroundBlob2 = styled.div`
  position: absolute;
  width: 250px;
  height: 250px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(168, 85, 247, 0.08) 0%, rgba(168, 85, 247, 0.03) 70%, transparent 100%);
  bottom: -50px;
  left: -50px;
  z-index: 1;
  animation: ${float} 20s ease-in-out infinite alternate-reverse;
  
  @media (min-width: 768px) {
    width: 400px;
    height: 400px;
    bottom: -75px;
    left: -75px;
  }
  
  @media (min-width: 1024px) {
    width: 500px;
    height: 500px;
    bottom: -100px;
    left: -100px;
  }
`;