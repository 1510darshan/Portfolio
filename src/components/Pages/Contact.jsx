import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isFormHighlighted, setIsFormHighlighted] = useState(false);

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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to a backend service

    alert('Thank you for your message! I\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
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
                <ContactValue>darshanwalhe1510@gmail.com</ContactValue>
              </ContactText>
            </ContactItem>
            
            <ContactItem>
              <ContactIcon>
                <FaPhone />
              </ContactIcon>
              <ContactText>
                <ContactLabel>Phone</ContactLabel>
                <ContactValue>+91 8007582566</ContactValue>
              </ContactText>
            </ContactItem>
            
            <ContactItem>
              <ContactIcon>
                <FaMapMarkerAlt />
              </ContactIcon>
              <ContactText>
                <ContactLabel>Location</ContactLabel>
                <ContactValue>Khalane, Dist-Tal Dhule, Maharashtra</ContactValue>
              </ContactText>
            </ContactItem>
          </ContactDetails>

          <SocialLinksContainer>
            <SocialLink href="https://github.com/1510darshan" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </SocialLink>
            <SocialLink href="https://in.linkedin.com/in/darshan-walhe-475b60255" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </SocialLink>
            <SocialLink href="https://www.instagram.com/dwalhe2402/" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </SocialLink>
          </SocialLinksContainer>
        </ContactInfo>

        <ContactForm onSubmit={handleSubmit} isHighlighted={isFormHighlighted}>
          <FormTitle>Send me a message</FormTitle>
          
          <FormGroup>
            <FormInput
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <FormInput
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <FormInput
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <FormTextarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </FormGroup>
          
          <SubmitButton type="submit">
            Send Message
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
  border: 1px solid rgba(59, 130, 246, 0.3);
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
    border-color: rgba(59, 130, 246, 0.6);
    background: rgba(15, 23, 42, 0.7);
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid rgba(59, 130, 246, 0.3);
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
    border-color: rgba(59, 130, 246, 0.6);
    background: rgba(15, 23, 42, 0.7);
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
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 25px rgba(168, 85, 247, 0.4);
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
  
  &:hover::before {
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