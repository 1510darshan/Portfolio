import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaCode, FaServer, FaMobile, FaDatabase, FaTools, FaJava, FaPython, FaAndroid } from 'react-icons/fa';

const Speciality = () => {
  const specialities = [
    {
      icon: <FaCode size={36} />,
      title: "Frontend Development",
      description: "Creating responsive, intuitive user interfaces with modern frameworks and clean, semantic HTML/CSS.",
      skills: ["React", "JavaScript", "HTML5/CSS3", "Tailwind CSS"]
    },
    {
      icon: <FaServer size={36} />,
      title: "Backend Development",
      description: "Building robust server-side applications with scalable architecture and efficient API design.",
      skills: ["Node.js", "Express", "RESTful APIs", "MongoDB", "GraphQL"]
    },
    {
      icon: <FaJava size={36} />,
      title: "Java Programming",
      description: "Building high-performance applications with robust architecture and optimized multithreading techniques.",
      skills: ["Spring Boot", "OOP", "JVM Tuning", "Multithreading"]
    },

    {
      icon: <FaPython size={36} />,
      title: "Python Programming",
      description: "Automating processes, developing APIs, and solving real-world problems with clean, efficient code.",
      skills: ["Flask", "OOP", "Scripting", "Data Structures", "Tkinter"]
    },
    {
      icon: <FaAndroid size={36} />,
      title: "Android Development",
      description: "Building smart Android solutions with clean code, efficient automation, and strong backend logic.",
      skills: ["Java", "OOP", "XML", "SQLite", "Firebase"]
    },


    {
      icon: <FaMobile size={36} />,
      title: "Responsive Design",
      description: "Crafting adaptive layouts that provide optimal viewing experience across all devices.",
      skills: ["Mobile-First Design", "CSS Grid/Flexbox", "Media Queries", "Progressive Enhancement"]
    },
    {
      icon: <FaDatabase size={36} />,
      title: "Database Management",
      description: "Designing and optimizing database structures for performance, security, and scalability.",
      skills: ["MongoDB", "MSSQL", "MySQL"]
    },
    {
      icon: <FaTools size={36} />,
      title: "Development Tools",
      description: "Utilizing modern development workflows and tools to increase productivity and code quality.",
      skills: ["Git/GitHub"]
    }

  ];

  return (
    <SpecialityContainer id="specialities">
      <SectionHeading>
        My <SpanHeading>Specialities</SpanHeading>
        <HeadingAccent />
      </SectionHeading>
      <ParaPhrase>
        I'm a web developer and programmer, specialized in full-stack development — crafting efficient, secure, and scalable web applications with clean architecture, high performance, and a creative edge.
      </ParaPhrase>

      <SpecialityGrid>
        {specialities.map((specialty, index) => (
          <SpecialtyCard key={index} data-aos="fade-up" data-aos-delay={index * 100}>
            <IconWrapper>
              {specialty.icon}
              <IconBackground />
            </IconWrapper>
            <CardContent>
              <CardTitle>{specialty.title}</CardTitle>
              <CardDescription>{specialty.description}</CardDescription>
              <SkillsList>
                {specialty.skills.map((skill, skillIndex) => (
                  <SkillTag key={skillIndex}>{skill}</SkillTag>
                ))}
              </SkillsList>
            </CardContent>
          </SpecialtyCard>
        ))}
      </SpecialityGrid>

      <BackgroundBlob1 />
      <BackgroundBlob2 />
    </SpecialityContainer>
  );
};

export default Speciality;

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

// const shimmer = keyframes`
//   0% { background-position: -200% 0; }
//   100% { background-position: 200% 0; }
// `;

// Styled Components
const SpecialityContainer = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 4rem 1rem 6rem;
  overflow: hidden;
  background-color: #0f172a; /* Dark background */
  color: #e2e8f0;
  
  @media (min-width: 860px) {
    padding: 6rem 2rem 8rem;
  }
`;

const SectionHeading = styled.h2`
  font-family: "Quicksand", sans-serif;
  font-weight: 700;
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
  position: relative;
  z-index: 2;
  color: #f8fafc; /* Light text for dark background */
  
  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

const HeadingAccent = styled.div`
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #3b82f6, #a855f7);
  margin: 1rem auto 0;
  border-radius: 2px;
`;

const SpanHeading = styled.span`
  background: linear-gradient(90deg, #3b82f6, #a855f7);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  position: relative;
`;

const ParaPhrase = styled.p`
  max-width: 800px;
  text-align: center;
  margin: 1rem auto 4rem;
  color: #94a3b8; /* Subtle gray for dark theme */
  font-size: 1.1rem;
  line-height: 1.8;
  z-index: 2;
  
  @media (max-width: 768px) {
    width: 90%;
    font-size: 1rem;
  }
`;

const SpecialityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  z-index: 2;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const SpecialtyCard = styled.div`
  background: rgba(30, 41, 59, 0.7); /* Dark card with transparency */
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(71, 85, 105, 0.3); /* Subtle border */
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    background: rgba(30, 41, 59, 0.8); /* Slightly more opaque on hover */
    
    &::before {
      opacity: 1;
    }
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #3b82f6, #a855f7);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
`;

const IconWrapper = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
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

const CardContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #f1f5f9; /* Light text */
`;

const CardDescription = styled.p`
  color: #cbd5e1; /* Light gray text */
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex: 1;
`;

const SkillsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
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