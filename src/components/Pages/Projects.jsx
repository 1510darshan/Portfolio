import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaGithub, FaExternalLinkAlt, FaReact, FaNodeJs } from 'react-icons/fa';
import { SiMongodb, SiExpress } from 'react-icons/si';



const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const projects = [
    {
      title: "IRCTC Railway Booking System",
      description: "A full-stack web application for railway ticket booking, built with React, Node.js, Express, and Microsoft SQL Server.",
      image: "https://private-user-images.githubusercontent.com/66858036/444770365-0b31fea1-57d8-4569-80f9-cf24bb455514.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTgyMTg0OTIsIm5iZiI6MTc1ODIxODE5MiwicGF0aCI6Ii82Njg1ODAzNi80NDQ3NzAzNjUtMGIzMWZlYTEtNTdkOC00NTY5LTgwZjktY2YyNGJiNDU1NTE0LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA5MTglMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwOTE4VDE3NTYzMlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTI0NWRmZGFmZTA3NzZjZGI1ZDk4MWI3ZDIzZTgwZjcxOGU3ZWI1OWNmNDU4YjI2MGE0ZmJjNTQ3OWJlNDZjNzQmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.bZuuMpGsoWxBiGefJ3Rwfk37GN9vZa3lvv0K5ZtVZw4",
      category: "fullstack",
      tags: ["React", "CSS", "MSSQL","Node Js", "Express"],
      githubLink: "https://github.com/1510darshan/IRCTC-Railway-Booking",
      // liveLink: "https://example.com",
      icons: [<FaReact key="react" />, <FaNodeJs key="node" />, <SiExpress key="express" />]
    },
    {
      title: "Authentication Rest Full API",
      description: "A robust Node.js authentication system featuring email verification, password reset functionality, and secure session management using JWT tokens.",
      image: "./image",
      category: "backend",
      tags: ["Node Js", "MongoDB", "Nodemailer","Express"],
      githubLink: "https://github.com/1510darshan/Authentication",
      // liveLink: "https://example.com",
      icons: [<FaReact key="react" />, <FaNodeJs key="node" />, <SiMongodb key="mongodb" />, <SiExpress key="express" />]
    },
    // {
    //   title: "Task Management API",
    //   description: "RESTful API for task management with user authentication, task CRUD operations, and advanced filtering capabilities.",
    //   image: "/api/placeholder/600/400",
    //   category: "backend",
    //   tags: ["Node.js", "Express", "MongoDB"],
    //   githubLink: "https://github.com",
    //   liveLink: "https://example.com",
    //   icons: [<FaNodeJs key="node" />, <SiExpress key="express" />, <SiMongodb key="mongodb" />]
    // },
    // {
    //   title: "Student Management System",
    //   description: "Java-based application for managing student records, course enrollments, and grade tracking with a streamlined interface.",
    //   image: "/api/placeholder/600/400",
    //   category: "java",
    //   tags: ["Java", "Swing", "MySQL"],
    //   githubLink: "https://github.com",
    //   liveLink: null,
    //   icons: [<FaJava key="java" />, <FaDatabase key="database" />]
    // },
    // {
    //   title: "Automated Data Analysis Tool",
    //   description: "Python tool that automates the process of data cleaning, analysis, and visualization with customizable reporting.",
    //   image: "/api/placeholder/600/400",
    //   category: "python",
    //   tags: ["Python", "Pandas", "Data Visualization"],
    //   githubLink: "https://github.com",
    //   liveLink: null,
    //   icons: [<FaPython key="python" />]
    // },
    // {
    //   title: "Weather Dashboard",
    //   description: "Interactive weather dashboard displaying real-time weather data, forecasts, and historical weather patterns via API.",
    //   image: "/api/placeholder/600/400",
    //   category: "frontend",
    //   tags: ["React", "API Integration", "Charts.js"],
    //   githubLink: "https://github.com",
    //   liveLink: "https://example.com",
    //   icons: [<FaReact key="react" />]
    // }
  ];

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'java', label: 'Java' },
    { id: 'python', label: 'Python' }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <ProjectsContainer id="projects">
      <BackgroundBlob1 />
      <BackgroundBlob2 />
      
      <SectionHeading>
        Featured <SpanHeading>Projects</SpanHeading>
        <HeadingAccent />
      </SectionHeading>
      
      <ParaPhrase>
        A collection of my best work showcasing my skills and passion for creating elegant, functional digital solutions.
      </ParaPhrase>
      
      <FiltersContainer>
        {filters.map(filter => (
          <FilterButton 
            key={filter.id}
            isActive={activeFilter === filter.id}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.label}
          </FilterButton>
        ))}
      </FiltersContainer>
      
      <ProjectGrid>
        {filteredProjects.map((project, index) => (
          <ProjectCard key={index} data-aos="fade-up" data-aos-delay={index * 100}>
            <ProjectImageContainer>
              <ProjectImage src={project.image} alt={project.title} />
              <ProjectOverlay>
                <OverlayContent>
                  <TagsContainer>
                    {project.tags.map((tag, tagIndex) => (
                      <ProjectTag key={tagIndex}>{tag}</ProjectTag>
                    ))}
                  </TagsContainer>
                  <IconsRow>
                    {project.icons.map((icon, iconIndex) => (
                      <TechIcon key={iconIndex}>{icon}</TechIcon>
                    ))}
                  </IconsRow>
                </OverlayContent>
              </ProjectOverlay>
            </ProjectImageContainer>
            
            <ProjectContent>
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectDescription>{project.description}</ProjectDescription>
              
              <ProjectLinks>
                <ProjectLink href={project.githubLink} target="_blank" rel="noopener noreferrer">
                  <FaGithub /> GitHub
                </ProjectLink>
                {project.liveLink && (
                  <ProjectLink href={project.liveLink} target="_blank" rel="noopener noreferrer" primary>
                    <FaExternalLinkAlt /> Live Demo
                  </ProjectLink>
                )}
              </ProjectLinks>
            </ProjectContent>
          </ProjectCard>
        ))}
      </ProjectGrid>
      
      <ViewMoreContainer>
        <ViewMoreButton>
          View All Projects
        </ViewMoreButton>
      </ViewMoreContainer>
    </ProjectsContainer>
  );
};

export default Projects;

// Animations
const float = keyframes`
  0% { transform: translate(0, 0); }
  50% { transform: translate(10px, -10px); }
  100% { transform: translate(0, 0); }
`;

// Styled Components
const ProjectsContainer = styled.section`
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
  margin: 1rem auto 3rem;
  color: #94a3b8; /* Subtle gray for dark theme */
  font-size: 1.1rem;
  line-height: 1.8;
  z-index: 2;
  
  @media (max-width: 768px) {
    width: 90%;
    font-size: 1rem;
  }
`;

const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 3rem;
  z-index: 2;
  max-width: 100%;
  padding: 0 1rem;
`;

const FilterButton = styled.button`
  padding: 0.5rem 1.25rem;
  background: ${props => props.isActive 
    ? 'linear-gradient(90deg, #3b82f6, #a855f7)'
    : 'rgba(30, 41, 59, 0.7)'};
  color: ${props => props.isActive ? 'white' : '#cbd5e1'};
  border: 1px solid ${props => props.isActive 
    ? 'transparent'
    : 'rgba(59, 130, 246, 0.3)'};
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    background: ${props => props.isActive 
      ? 'linear-gradient(90deg, #3b82f6, #a855f7)'
      : 'rgba(30, 41, 59, 0.9)'};
    border-color: ${props => props.isActive 
      ? 'transparent'
      : 'rgba(59, 130, 246, 0.5)'};
  }
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2.5rem;
  width: 100%;
  max-width: 1200px;
  z-index: 2;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ProjectCard = styled.div`
  background: rgba(30, 41, 59, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(71, 85, 105, 0.3);
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    border-color: rgba(59, 130, 246, 0.3);
    
    img {
      transform: scale(1.05);
    }
  }
`;

const ProjectImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
`;

const ProjectOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(15, 23, 42, 0.9), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.5rem;
  
  ${ProjectImageContainer}:hover & {
    opacity: 1;
  }
`;

const OverlayContent = styled.div`
  transform: translateY(20px);
  opacity: 0;
  transition: all 0.3s ease;
  
  ${ProjectImageContainer}:hover & {
    transform: translateY(0);
    opacity: 1;
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const ProjectTag = styled.span`
  padding: 0.25rem 0.6rem;
  background: rgba(30, 41, 59, 0.9);
  border-radius: 20px;
  font-size: 0.7rem;
  color: #93c5fd;
  font-weight: 500;
  border: 1px solid rgba(59, 130, 246, 0.3);
`;

const IconsRow = styled.div`
  display: flex;
  gap: 1rem;
`;

const TechIcon = styled.div`
  color: #60a5fa;
  font-size: 1.25rem;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
  }
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ProjectTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #f1f5f9;
`;

const ProjectDescription = styled.p`
  color: #cbd5e1;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex: 1;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: auto;
`;

const ProjectLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: ${props => props.primary 
    ? 'linear-gradient(90deg, #3b82f6, #a855f7)'
    : 'rgba(30, 41, 59, 0.8)'};
  color: white;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 1px solid ${props => props.primary 
    ? 'transparent'
    : 'rgba(59, 130, 246, 0.3)'};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`;

const ViewMoreContainer = styled.div`
  margin-top: 4rem;
  z-index: 2;
`;

const ViewMoreButton = styled.button`
  background: linear-gradient(90deg, #3b82f6, #a855f7);
  color: white;
  padding: 0.75rem 2rem;
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
    transform: translateY(-3px);
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

const BackgroundBlob1 = styled.div`
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, rgba(59, 130, 246, 0.03) 70%, transparent 100%);
  top: 10%;
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
  bottom: 10%;
  left: -100px;
  z-index: 1;
  animation: ${float} 20s ease-in-out infinite alternate-reverse;
`;