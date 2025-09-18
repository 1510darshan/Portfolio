import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaGithub, FaLinkedin, FaTwitter, FaDownload } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const About = () => {
  // Skills data for the skill bars
  const skills = [
    { name: "Frontend Development", level: 92 },
    { name: "Backend Development", level: 85 },
    { name: "Java Programming", level: 90 },
    { name: "Python", level: 80 },
    { name: "Database Management", level: 75 },
    { name: "UI/UX Design", level: 70 },
  ];

  // Education timeline data
  const education = [
    {
      degree: "Bachelor of Computer Science",
      institution: "SVKM's NMIMS Shirpur",
      duration: "2023 - 2027",
      description: "Currently pursuing B.Tech in Computer Science, having completed the second year with a strong focus on software engineering, web development, and database systems. Actively working on real-world projects and building hands-on experience in full-stack development and cybersecurity."
    },
    {
      degree: "Full Stack Web Development",
      institution: "Tech Academy Bootcamp",
      duration: "2022",
      description: "Intensive program covering modern JavaScript frameworks, API development, and deployment strategies."
    },
    {
      degree: "Mobile App Development Certificate",
      institution: "Online Learning Institute",
      duration: "2023",
      description: "Specialized training in cross-platform application development and native mobile technologies."
    }
  ];

  return (
    <AboutContainer id="about">
      <BackgroundBlob1 />
      <BackgroundBlob2 />
      
      <SectionHeading>
        About <SpanHeading>Me</SpanHeading>
        <HeadingAccent />
      </SectionHeading>
      
      <ContentWrapper>
        <AboutMeSection>
          <ProfileImageContainer>
            <ProfileImage src="/assets/image.png" alt="Darshan Walhe Profile" />
            <ProfileImageBorder />
            <ProfileGlow />
          </ProfileImageContainer>
          
          <AboutContent>
            <AboutTitle>Full Stack Developer & Problem Solver</AboutTitle>
            <AboutText>
              I'm Darsh, a passionate developer with 4+ years of experience creating elegant, 
              efficient solutions for the web. My journey in software development 
              began with a curiosity about how things work, which evolved into a 
              career built on continuous learning and problem-solving.
            </AboutText>
            <AboutText>
              I specialize in building robust full-stack applications, with expertise 
              in modern JavaScript frameworks, Java, Python, and database technologies. 
              My approach combines technical excellence with creative thinking to deliver 
              solutions that not only meet requirements but exceed expectations.
            </AboutText>
            
            <StatsContainer>
              {/* <StatItem>
                <StatNumber>4+</StatNumber>
                <StatLabel>Years Experience</StatLabel>
              </StatItem> */}
              <StatDivider className="desktop-only" />
              <StatItem>
                <StatNumber>2</StatNumber>
                <StatLabel>Projects</StatLabel>
              </StatItem>
              <StatDivider className="desktop-only" />
              {/* <StatItem>
                <StatNumber>30+</StatNumber>
                <StatLabel>Clients</StatLabel>
              </StatItem> */}
            </StatsContainer>
            
            <SocialLinks>
              <SocialLink href="https://github.com/1510darshan" target="_blank" rel="noopener noreferrer">
                <FaGithub />
              </SocialLink>
              <SocialLink href="https://in.linkedin.com/in/darshan-walhe-475b60255" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </SocialLink>
              <SocialLink href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </SocialLink>
              {/* <SocialLink href="https://codepen.io" target="_blank" rel="noopener noreferrer">
                <FaCodepen />
              </SocialLink> */}
              <SocialLink href="mailto:Darshanwalhe1510@gmail.com">
                <MdEmail />
              </SocialLink>
            </SocialLinks>
            
            <DownloadButton>
              <FaDownload /> Download Resume
            </DownloadButton>
          </AboutContent>
        </AboutMeSection>
        
        <SkillsSection>
          <SectionSubHeading>My Skills</SectionSubHeading>
          
          <SkillBarsContainer>
            {skills.map((skill, index) => (
              <SkillBar key={index}>
                <SkillInfo>
                  <SkillName>{skill.name}</SkillName>
                  <SkillPercentage>{skill.level}%</SkillPercentage>
                </SkillInfo>
                <SkillBarOuter>
                  <SkillBarInner width={skill.level} delay={index * 0.1} />
                </SkillBarOuter>
              </SkillBar>
            ))}
          </SkillBarsContainer>
        </SkillsSection>
        
        <EducationSection>
          <SectionSubHeading>Education & Certifications</SectionSubHeading>
          
          <Timeline>
            {education.map((item, index) => (
              <TimelineItem key={index} align={index % 2 === 0 ? 'left' : 'right'}>
                <TimelineContent>
                  <TimelineDuration>{item.duration}</TimelineDuration>
                  <TimelineDegree>{item.degree}</TimelineDegree>
                  <TimelineInstitution>{item.institution}</TimelineInstitution>
                  <TimelineDescription>{item.description}</TimelineDescription>
                </TimelineContent>
                <TimelineDot />
                {index < education.length - 1 && <TimelineLine />}
              </TimelineItem>
            ))}
          </Timeline>
        </EducationSection>
      </ContentWrapper>
    </AboutContainer>
  );
};

export default About;

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

const slideIn = keyframes`
  from { 
    transform: translateX(-20px);
    opacity: 0;
  }
  to { 
    transform: translateX(0);
    opacity: 1;
  }
`;

const fillBar = keyframes`
  from { width: 0; }
  to { width: 100%; }
`;

// Styled Components
const AboutContainer = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 3rem 1rem;
  overflow: hidden;
  background-color: #0f172a; /* Dark background */
  color: #e2e8f0;
  
  @media (min-width: 768px) {
    padding: 4rem 2rem 6rem;
  }
  
  @media (min-width: 1024px) {
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
  color: #f8fafc; /* Light text for dark background */
  
  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
  
  @media (min-width: 1024px) {
    font-size: 3rem;
  }
`;

const HeadingAccent = styled.div`
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #3b82f6, #a855f7);
  margin: 0.8rem auto 0;
  border-radius: 2px;
  
  @media (min-width: 768px) {
    width: 80px;
    height: 4px;
    margin: 1rem auto 0;
  }
`;

const SpanHeading = styled.span`
  background: linear-gradient(90deg, #3b82f6, #a855f7);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  position: relative;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-top: 2rem;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
  
  @media (min-width: 768px) {
    margin-top: 3rem;
    gap: 4rem;
  }
`;

const AboutMeSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const ProfileImageContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 280px;
  height: 280px;
  margin-bottom: 1rem;
  
  @media (min-width: 640px) {
    max-width: 300px;
    height: 300px;
  }
  
  @media (min-width: 768px) {
    flex: 0 0 300px;
    margin-bottom: 0;
  }
  
  @media (min-width: 1024px) {
    flex: 0 0 320px;
    max-width: 320px;
    height: 320px;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
  position: relative;
  z-index: 2;
`;

const ProfileImageBorder = styled.div`
  position: absolute;
  top: -8px;
  left: -8px;
  right: -8px;
  bottom: -8px;
  border: 2px solid rgba(59, 130, 246, 0.4);
  border-radius: 20px;
  z-index: 1;
`;

const ProfileGlow = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  background: radial-gradient(
    circle at center,
    rgba(59, 130, 246, 0.3) 0%,
    rgba(168, 85, 247, 0.2) 50%,
    transparent 70%
  );
  filter: blur(20px);
  z-index: 0;
  top: 0;
  left: 0;
  animation: ${pulse} 4s ease-in-out infinite;
`;

const AboutContent = styled.div`
  flex: 1;
  width: 100%;
  
  @media (min-width: 768px) {
    padding-left: 1rem;
  }
`;

const AboutTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.25rem;
  color: #f1f5f9;
  
  @media (min-width: 640px) {
    font-size: 1.75rem;
  }
  
  @media (min-width: 1024px) {
    font-size: 2rem;
  }
`;

const AboutText = styled.p`
  color: #cbd5e1;
  line-height: 1.7;
  margin-bottom: 1.25rem;
  font-size: 0.95rem;
  
  @media (min-width: 640px) {
    font-size: 1rem;
    line-height: 1.8;
  }
  
  @media (min-width: 1024px) {
    font-size: 1.1rem;
  }
`;

const StatsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  margin: 2rem 0;
  padding: 1.25rem 1rem;
  background: rgba(30, 41, 59, 0.5);
  border-radius: 16px;
  border: 1px solid rgba(71, 85, 105, 0.3);
  
  @media (min-width: 640px) {
    padding: 1.5rem;
    justify-content: space-between;
  }

  .desktop-only {
    display: none;
    
    @media (min-width: 640px) {
      display: block;
    }
  }
`;

const StatItem = styled.div`
  text-align: center;
  padding: 0.5rem;
  flex: 1;
  min-width: 80px;
  
  @media (min-width: 640px) {
    padding: 0 1rem;
    min-width: auto;
  }
`;

const StatNumber = styled.div`
  font-size: 1.75rem;
  font-weight: 700;
  background: linear-gradient(90deg, #3b82f6, #a855f7);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 0.25rem;
  
  @media (min-width: 640px) {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
`;

const StatLabel = styled.div`
  font-size: 0.8rem;
  color: #94a3b8;
  
  @media (min-width: 640px) {
    font-size: 0.9rem;
  }
`;

const StatDivider = styled.div`
  height: 40px;
  width: 1px;
  background: rgba(59, 130, 246, 0.3);
`;

const SocialLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.5rem;
  
  @media (min-width: 640px) {
    gap: 1rem;
    margin-top: 2rem;
  }
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: rgba(30, 41, 59, 0.7);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 50%;
  color: #60a5fa;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  
  @media (min-width: 640px) {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }
  
  &:hover {
    transform: translateY(-3px);
    background: rgba(30, 41, 59, 1);
    border-color: rgba(59, 130, 246, 0.5);
    color: #93c5fd;
    box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
  }
`;

const DownloadButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: linear-gradient(90deg, #3b82f6, #a855f7);
  color: white;
  padding: 0.75rem 1.25rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.95rem;
  cursor: pointer;
  margin-top: 1.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  
  @media (min-width: 640px) {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    margin-top: 2rem;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
  }
`;

const SkillsSection = styled.div`
  margin-top: 1rem;
  width: 100%;
  
  @media (min-width: 640px) {
    margin-top: 2rem;
  }
`;

const SectionSubHeading = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #f1f5f9;
  position: relative;
  display: inline-block;
  
  @media (min-width: 640px) {
    font-size: 1.75rem;
    margin-bottom: 2rem;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 50%;
    height: 3px;
    background: linear-gradient(90deg, #3b82f6, #a855f7);
    border-radius: 2px;
  }
`;

const SkillBarsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  
  @media (min-width: 640px) {
    gap: 1.5rem;
  }
`;

const SkillBar = styled.div`
  width: 100%;
`;

const SkillInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const SkillName = styled.span`
  color: #f1f5f9;
  font-weight: 500;
  font-size: 0.95rem;
  
  @media (min-width: 640px) {
    font-size: 1rem;
  }
`;

const SkillPercentage = styled.span`
  color: #93c5fd;
  font-weight: 600;
  font-size: 0.95rem;
  
  @media (min-width: 640px) {
    font-size: 1rem;
  }
`;

const SkillBarOuter = styled.div`
  width: 100%;
  height: 6px;
  background: rgba(30, 41, 59, 0.8);
  border-radius: 4px;
  overflow: hidden;
  
  @media (min-width: 640px) {
    height: 8px;
  }
`;

const SkillBarInner = styled.div`
  height: 100%;
  width: ${props => props.width}%;
  background: linear-gradient(90deg, #3b82f6, #a855f7);
  border-radius: 4px;
  animation: ${fillBar} 1.5s ease-out forwards;
  animation-delay: ${props => props.delay}s;
`;

const EducationSection = styled.div`
  margin-top: 1rem;
  width: 100%;
  
  @media (min-width: 640px) {
    margin-top: 2rem;
  }
`;

const Timeline = styled.div`
  position: relative;
  max-width: 100%;
  margin: 1.5rem auto 0;
  
  @media (min-width: 640px) {
    margin: 2rem auto 0;
  }
  
  @media (min-width: 768px) {
    margin: 3rem auto 0;
    
    &::before {
      content: '';
      position: absolute;
      left: 50%;
      top: 0;
      bottom: 0;
      width: 2px;
      background: linear-gradient(to bottom, #3b82f6, rgba(71, 85, 105, 0.3));
      transform: translateX(-50%);
      z-index: 1;
    }
  }
`;

const TimelineItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 2rem;
  width: 100%;
  
  @media (min-width: 640px) {
    margin-bottom: 2.5rem;
  }
  
  @media (min-width: 768px) {
    flex-direction: ${props => props.align === 'left' ? 'row' : 'row-reverse'};
    margin-bottom: 3rem;
    justify-content: ${props => props.align === 'left' ? 'flex-start' : 'flex-end'};
  }
`;

const TimelineContent = styled.div`
  flex: 1;
  background: rgba(30, 41, 59, 0.7);
  border: 1px solid rgba(71, 85, 105, 0.3);
  border-radius: 12px;
  padding: 1rem;
  max-width: calc(100% - 2.5rem);
  animation: ${slideIn} 0.5s ease-out forwards;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  margin-left: 0.5rem;
  
  @media (min-width: 480px) {
    padding: 1.25rem;
    max-width: calc(100% - 3rem);
  }
  
  @media (min-width: 640px) {
    padding: 1.5rem;
  }
  
  @media (min-width: 768px) {
    max-width: calc(50% - 1.5rem);
    margin-left: ${props => props.align === 'left' ? '0.5rem' : '0'};
    margin-right: ${props => props.align === 'right' ? '0.5rem' : '0'};
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    background: rgba(30, 41, 59, 0.9);
    border-color: rgba(59, 130, 246, 0.3);
  }
`;

const TimelineDot = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: linear-gradient(90deg, #3b82f6, #a855f7);
  margin: 0 0.75rem 0 0;
  position: relative;
  z-index: 2;
  flex-shrink: 0;
  margin-top: 0.5rem;
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
  
  @media (min-width: 480px) {
    width: 18px;
    height: 18px;
    margin-top: 0.75rem;
  }
  
  @media (min-width: 640px) {
    width: 20px;
    height: 20px;
    margin-top: 1rem;
  }
  
  @media (min-width: 768px) {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin: 0;
    top: 1rem;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    border-radius: 50%;
    background: rgba(59, 130, 246, 0.2);
    animation: ${pulse} 2s infinite;
  }
`;

const TimelineLine = styled.div`
  position: absolute;
  left: 8px;
  top: 24px;
  bottom: -24px;
  width: 2px;
  background: linear-gradient(to bottom, #3b82f6, rgba(71, 85, 105, 0.3));
  z-index: 1;
  
  @media (min-width: 480px) {
    left: 9px;
    top: 28px;
  }
  
  @media (min-width: 640px) {
    left: 10px;
    top: 32px;
  }
  
  @media (min-width: 768px) {
    left: 50%;
    transform: translateX(-50%);
    top: 32px;
  }
`;

const TimelineDuration = styled.div`
  display: inline-block;
  background: rgba(59, 130, 246, 0.2);
  color: #93c5fd;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  margin-bottom: 0.75rem;
  border: 1px solid rgba(59, 130, 246, 0.3);
  
  @media (min-width: 640px) {
    font-size: 0.85rem;
  }
`;

const TimelineDegree = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: #f1f5f9;
  margin-bottom: 0.5rem;
  
  @media (min-width: 640px) {
    font-size: 1.2rem;
  }
`;

const TimelineInstitution = styled.div`
  font-size: 0.95rem;
  color: #cbd5e1;
  margin-bottom: 0.75rem;
  
  @media (min-width: 640px) {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
`;

const TimelineDescription = styled.p`
  font-size: 0.9rem;
  color: #94a3b8;
  line-height: 1.5;
  
  @media (min-width: 640px) {
    font-size: 0.95rem;
    line-height: 1.6;
  }
`;

const BackgroundBlob1 = styled.div`
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, rgba(59, 130, 246, 0.03) 70%, transparent 100%);
  top: 20%;
  left: -300px;
  z-index: 1;
  animation: ${float} 15s ease-in-out infinite alternate;
  
  @media (min-width: 768px) {
    width: 600px;
    height: 600px;
    left: -200px;
  }
`;

const BackgroundBlob2 = styled.div`
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(168, 85, 247, 0.08) 0%, rgba(168, 85, 247, 0.03) 70%, transparent 100%);
  bottom: 5%;
  right: -250px;
  z-index: 1;
  animation: ${float} 20s ease-in-out infinite alternate-reverse;
  
  @media (min-width: 768px) {
    width: 500px;
    height: 500px;
    right: -150px;
  }
`;