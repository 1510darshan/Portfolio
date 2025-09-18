import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaCode, FaArrowDown } from 'react-icons/fa';
import scrollToSection from './Scroll';

const Hero = () => {
  const downloadResume = () => {
    // Create a link element and trigger download
    const link = document.createElement('a');
    link.href = '/assets/Darshan_Walhe_Resume.pdf'; // You'll need to add this file to public/assets
    link.download = 'Darshan_Walhe_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <HeroContainer id="home">
      <BackgroundBlob1 />
      <BackgroundBlob2 />
      
      <HeroContent>
        <HeadingContainer data-aos="fade-right">
          <PreTitle>
            <IconWrapper>
              <FaCode />
              <IconBackground />
            </IconWrapper>
            Aspiring Software and Web Development Enthusiast
          </PreTitle>
          
          <MainTitle>
            Hi, I'm <GradientText>Darshan Walhe</GradientText>
          </MainTitle>
          
          <SubTitle>
            I'm a passionate Web Developer and Programmer, crafting seamless digital experiences through
            clean architecture, high performance, and a creative edge.
          </SubTitle>
          
          <SkillsList>
            <SkillTag>React</SkillTag>
            <SkillTag>JavaScript</SkillTag>
            <SkillTag>Node.js</SkillTag>
            <SkillTag>MongoDB</SkillTag>
            <SkillTag>SQL</SkillTag>
            <SkillTag>Java</SkillTag>
          </SkillsList>
          
          <ButtonGroup>
            <PrimaryButton onClick={() => scrollToSection("projects")}>View My Projects</PrimaryButton>
            <SecondaryButton onClick={downloadResume}>Download Resume</SecondaryButton>
          </ButtonGroup>
        </HeadingContainer>

        <HeroImageContainer data-aos="fade-left">
          <ProfileImageWrapper>
            <ProfileImage src="/assets/image.png" alt="Darshan Walhe" />
            <GlowEffect />
          </ProfileImageWrapper>
        </HeroImageContainer>
      </HeroContent>

      <ScrollIndicator>
        <MouseIcon>
          <MouseWheel />
        </MouseIcon>
        <ScrollText>Scroll Down</ScrollText>
        <ScrollArrow><FaArrowDown /></ScrollArrow>
      </ScrollIndicator>
    </HeroContainer>
  );
};

export default Hero;

// Animations
const float = keyframes`
  0% { transform: translate(0, 0); }
  50% { transform: translate(10px, -10px); }
  100% { transform: translate(0, 0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.6; }
  50% { transform: scale(1.05); opacity: 0.8; }
  100% { transform: scale(1); opacity: 0.6; }
`;

const scroll = keyframes`
  0% { transform: translateY(0); opacity: 1; }
  50% { transform: translateY(10px); opacity: 0.5; }
  100% { transform: translateY(0); opacity: 1; }
`;

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Styled Components
const HeroContainer = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 4rem 1rem 6rem;
  overflow: hidden;
  background-color: #0f172a; /* Dark background */
  color: #e2e8f0;
  
  @media (min-width: 860px) {
    padding: 6rem 2rem 8rem;
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  z-index: 2;
  
  @media (min-width: 768px) {
    gap: 3rem;
  }
  
  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 4rem;
  }
`;

const HeadingContainer = styled.div`
  flex: 1;
  max-width: 600px;
  text-align: center;
  
  @media (min-width: 1024px) {
    text-align: left;
  }
`;

const PreTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 1.5rem;
  color: #a855f7;
  background: rgba(168, 85, 247, 0.1);
  border-radius: 8px;
  padding: 0.5rem 1rem;
  border: 1px solid rgba(168, 85, 247, 0.2);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  
  @media (min-width: 768px) {
    font-size: 0.9rem;
    letter-spacing: 2px;
  }
  
  @media (min-width: 1024px) {
    justify-content: flex-start;
  }
`;

const IconWrapper = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  color: #60a5fa; /* Brighter blue for dark theme */
  z-index: 1;
`;

const IconBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(168, 85, 247, 0.2));
  z-index: -1;
  animation: ${pulse} 3s ease-in-out infinite;
`;

const MainTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  color: #f1f5f9;
  
  @media (min-width: 480px) {
    font-size: 2.5rem;
  }
  
  @media (min-width: 768px) {
    font-size: 3rem;
  }
  
  @media (min-width: 1024px) {
    font-size: 3.5rem;
  }
`;

const GradientText = styled.span`
  background: linear-gradient(90deg, #3b82f6, #a855f7);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, #3b82f6, #a855f7);
    border-radius: 2px;
  }
`;

const SubTitle = styled.p`
  font-size: 1rem;
  line-height: 1.8;
  color: #94a3b8; /* Subtle gray matching speciality section */
  margin-bottom: 1.5rem;
  max-width: 500px;
  
  @media (min-width: 768px) {
    font-size: 1.125rem;
  }
`;

const SkillsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
  justify-content: center;
  
  @media (min-width: 1024px) {
    justify-content: flex-start;
  }
`;

const SkillTag = styled.span`
  padding: 0.35rem 0.75rem;
  background: rgba(51, 65, 85, 0.5); /* Dark background */
  border-radius: 20px;
  font-size: 0.8rem;
  color: #93c5fd; /* Light blue */
  font-weight: 500;
  border: 1px solid rgba(59, 130, 246, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(51, 65, 85, 0.8);
    transform: translateY(-2px);
    border-color: rgba(59, 130, 246, 0.5);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  
  @media (min-width: 1024px) {
    justify-content: flex-start;
  }
`;

const PrimaryButton = styled.button`
  background: linear-gradient(90deg, #3b82f6, #a855f7);
  color: white;
  padding: 0.75rem 1.75rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(168, 85, 247, 0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
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

const SecondaryButton = styled.button`
  background: rgba(30, 41, 59, 0.7);
  color: white;
  padding: 0.75rem 1.75rem;
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 8px;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(30, 41, 59, 0.9);
    transform: translateY(-2px);
    border-color: rgba(59, 130, 246, 0.5);
  }
`;

const HeroImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-top: 2rem;
  
  @media (min-width: 1024px) {
    margin-top: 0;
  }
`;

const ProfileImageWrapper = styled.div`
  position: relative;
  z-index: 5;
  width: 280px;
  height: 280px;
  margin: 0 auto;
  border-radius: 16px;
  overflow: hidden;
  border: 3px solid rgba(59, 130, 246, 0.3);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  /* animation: ${float} 6s ease-in-out infinite; */
    
    &::before {
      content: '';
      position: absolute;
      top: -8px;
      left: -8px;
      right: -8px;
      bottom: -8px;
      border-radius: 20px;
      border: 2px dashed rgba(168, 85, 247, 0.5);
      animation: ${rotate} 20s linear infinite;
      z-index: -1;
    }
  
  @media (min-width: 480px) {
    width: 320px;
    height: 320px;
    border: 4px solid rgba(59, 130, 246, 0.3);
    
    &::before {
      top: -10px;
      left: -10px;
      right: -10px;
      bottom: -10px;
    }
  }
  
  @media (min-width: 768px) {
    width: 400px;
    height: 400px;
  }
  
  @media (min-width: 1024px) {
    width: 450px;
    height: 450px;
  }
  
  @media (min-width: 1200px) {
    width: 500px;
    height: 500px;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.5s ease;
  filter: contrast(1.05) brightness(1.05);
`;

const GlowEffect = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  background: radial-gradient(
    circle,
    rgba(168, 85, 247, 0.2) 0%,
    rgba(59, 130, 246, 0.15) 45%,
    transparent 70%
  );
  z-index: 0;
  filter: blur(20px);
  animation: ${pulse} 4s ease-in-out infinite;
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0.7;
  transition: opacity 0.3s ease;
  z-index: 2;
  
  &:hover {
    opacity: 1;
  }
`;

const MouseIcon = styled.div`
  width: 26px;
  height: 42px;
  border: 2px solid rgba(59, 130, 246, 0.4);
  border-radius: 20px;
  position: relative;
  display: flex;
  justify-content: center;
`;

const MouseWheel = styled.div`
  width: 4px;
  height: 8px;
  background: linear-gradient(90deg, #3b82f6, #a855f7);
  border-radius: 2px;
  position: absolute;
  top: 8px;
  animation: ${scroll} 2s ease infinite;
`;

const ScrollText = styled.div`
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-top: 8px;
`;

const ScrollArrow = styled.div`
  color: rgba(59, 130, 246, 0.6);
  font-size: 14px;
  margin-top: 8px;
  animation: ${scroll} 2s ease infinite;
`;

const BackgroundBlob1 = styled.div`
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, rgba(59, 130, 246, 0.03) 70%, transparent 100%);
  top: -200px;
  right: -200px;
  z-index: 1;
  animation: ${float} 15s ease-in-out infinite alternate;
`;

const BackgroundBlob2 = styled.div`
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(168, 85, 247, 0.08) 0%, rgba(168, 85, 247, 0.03) 70%, transparent 100%);
  bottom: -100px;
  left: -100px;
  z-index: 1;
  animation: ${float} 20s ease-in-out infinite alternate-reverse;
`;