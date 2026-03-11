import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useFirebase } from '../../Services/Firebase/useFirebase';

// ── Animations ──────────────────────────────────────────────
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

// ── Styled Components ────────────────────────────────────────
const ProjectsContainer = styled.section`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(180deg, #040d1a 0%, #071428 50%, #040d1a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px 40px;
  scroll-margin-top: 80px;
`;

const Inner = styled.div`
  max-width: 1100px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 60px;
  animation: ${fadeInUp} 0.8s ease forwards;
`;

const SectionTag = styled.p`
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: #22d3ee;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  margin-bottom: 12px;
  font-weight: 500;
`;

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  color: white;
  letter-spacing: -0.02em;

  span {
    background: linear-gradient(135deg, #22d3ee, #7b2fff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

// Filter Tabs
const FilterRow = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const FilterBtn = styled.button`
  padding: 10px 24px;
  border-radius: 12px;
  font-size: 0.76rem;
  font-family: 'Space Mono', monospace;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid ${({ active }) => active ? '#22d3ee' : 'rgba(255,255,255,0.12)'};
  background: ${({ active }) => active ? 'rgba(34,211,238,0.15)' : 'transparent'};
  color: ${({ active }) => active ? '#22d3ee' : 'rgba(255,255,255,0.45)'};
  font-weight: 600;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: rgba(34,211,238,0.1);
    transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: -1;
  }

  &:hover {
    border-color: #22d3ee;
    color: #22d3ee;
    background: rgba(34,211,238,0.12);
    transform: translateY(-2px);
  }

  &:hover::before {
    left: 100%;
  }
`;

// Grid
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 600px)  { grid-template-columns: 1fr; }
`;

// Card
const Card = styled.div`
  background: rgba(10, 26, 46, 0.6);
  border: 1px solid ${({ accent }) => `${accent}22`};
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, ${({ accent }) => `${accent}10`}, transparent);
    opacity: 0;
    transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: none;
  }

  &:hover {
    border-color: ${({ accent }) => `${accent}55`};
    box-shadow: 0 16px 40px ${({ accent }) => `${accent}15`}, 0 8px 24px rgba(0, 0, 0, 0.32);
    transform: translateY(-8px);
    background: rgba(10, 26, 46, 0.8);
  }

  &:hover::before {
    opacity: 1;
  }
`;

// Mockup Preview
const Preview = styled.div`
  position: relative;
  padding: 16px;
  background: rgba(4, 13, 26, 0.6);
  border-bottom: 1px solid rgba(255,255,255,0.05);
`;

const MockupWindow = styled.div`
  border-radius: 8px;
  overflow: hidden;
  background: rgba(255,255,255,0.03);
`;

const MockupBar = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: rgba(255,255,255,0.04);
`;

const Dot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ color }) => color};
`;

const MockupBody = styled.div`
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const MockupLine = styled.div`
  height: 6px;
  border-radius: 3px;
  background: ${({ accent, dim }) => dim ? 'rgba(255,255,255,0.07)' : `${accent}55`};
  width: ${({ width }) => width || '100%'};
`;

const MockupBlocks = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 4px;
`;

const MockupBlock = styled.div`
  height: 28px;
  flex: 1;
  border-radius: 5px;
  background: ${({ accent, dim }) => dim ? 'rgba(255,255,255,0.05)' : `${accent}22`};
`;

const StatusBadge = styled.span`
  position: absolute;
  top: 14px;
  right: 14px;
  font-size: 0.65rem;
  font-family: 'Space Mono', monospace;
  letter-spacing: 0.1em;
  padding: 3px 10px;
  border-radius: 20px;
  border: 1px solid ${({ accent }) => accent};
  color: ${({ accent }) => accent};
  background: ${({ accent }) => `${accent}15`};
`;

// Card Info
const CardInfo = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ProjectType = styled.span`
  font-size: 0.68rem;
  font-family: 'Space Mono', monospace;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ accent }) => accent};
`;

const ProjectName = styled.h3`
  font-size: 1.05rem;
  font-weight: 800;
  color: white;
  letter-spacing: 0.05em;
`;

const ProjectDesc = styled.p`
  font-size: 0.82rem;
  color: rgba(255,255,255,0.45);
  line-height: 1.7;
`;

const TechRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const TechBadge = styled.span`
  font-size: 0.7rem;
  padding: 5px 12px;
  background: rgba(34, 211, 238, 0.1);
  border: 1px solid rgba(34, 211, 238, 0.25);
  border-radius: 6px;
  color: rgba(255,255,255,0.65);
  font-family: 'Space Mono', monospace;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  ${Card}:hover & {
    border-color: ${({ accent }) => `${accent}66`};
    color: rgba(255,255,255,0.85);
    background: rgba(34, 211, 238, 0.15);
  }
`;

const BtnRow = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 4px;
`;

const LiveBtn = styled.a`
  padding: 8px 18px;
  background: linear-gradient(135deg, ${({ accent }) => accent}33, rgba(123, 47, 255, 0.3));
  border: 1px solid ${({ accent }) => `${accent}55`};
  border-radius: 8px;
  color: white;
  font-size: 0.75rem;
  font-family: 'Space Mono', monospace;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: ${({ accent }) => accent}22;
    transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: -1;
  }

  &:hover {
    border-color: ${({ accent }) => `${accent}88`};
    box-shadow: 0 4px 16px ${({ accent }) => `${accent}25`};
    transform: translateY(-2px);
  }

  &:hover::before {
    left: 100%;
  }
`;

const GhostBtn = styled.a`
  padding: 8px 18px;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 8px;
  color: rgba(255,255,255,0.55);
  font-size: 0.75rem;
  font-family: 'Space Mono', monospace;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  position: relative;

  &:hover {
    border-color: rgba(255,255,255,0.35);
    color: white;
    background: rgba(255,255,255,0.08);
    box-shadow: 0 4px 16px rgba(255,255,255,0.08);
    transform: translateY(-2px);
  }
`;

// ── Component ────────────────────────────────────────────────
const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const { data: firebaseProjects, loading, error } = useFirebase('projects');

  // Fallback to hardcoded data if Firebase fails
  const projects = firebaseProjects && firebaseProjects.length > 0 ? firebaseProjects : [
    {
      id: 1,
      name: 'Project Nexus',
      type: 'SaaS Dashboard',
      category: 'fullstack',
      desc: 'Real-time analytics platform with AI-powered insights and customizable widgets.',
      tech: ['React', 'Node.js', 'PostgreSQL'],
      accent: '#22d3ee',
      status: 'Live',
      live: '#',
      github: '#',
    },
    {
      id: 2,
      name: 'Project Genz',
      type: 'Mobile App',
      category: 'frontend',
      desc: 'Cross-platform social commerce app with AR try-on features and real-time chat.',
      tech: ['React Native', 'AWS', 'TensorFlow'],
      accent: '#7b2fff',
      status: 'Live',
      live: '#',
      github: '#',
    },
    {
      id: 3,
      name: 'Project Outo',
      type: 'API Platform',
      category: 'backend',
      desc: 'Microservices API gateway with auto-scaling, rate limiting and developer portal.',
      tech: ['Python', 'Kubernetes', 'Redis'],
      accent: '#ff2d78',
      status: 'Beta',
      live: '#',
      github: '#',
    },
    {
      id: 4,
      name: 'Project Goon',
      type: 'E-Commerce',
      category: 'fullstack',
      desc: 'High-conversion storefront with headless CMS, edge caching and Stripe payments.',
      tech: ['Next.js', 'Stripe', 'Sanity'],
      accent: '#00ff88',
      status: 'Live',
      live: '#',
      github: '#',
    },
    {
      id: 5,
      name: 'Project Cone',
      type: 'Analytics Tool',
      category: 'frontend',
      desc: 'Data visualization suite with drag-and-drop report builder and export options.',
      tech: ['D3.js', 'Python', 'BigQuery'],
      accent: '#22d3ee',
      status: 'Dev',
      live: '#',
      github: '#',
    },
    {
      id: 6,
      name: 'Project Doto',
      type: 'DevOps Tool',
      category: 'backend',
      desc: 'CI/CD pipeline manager with Slack integrations and cloud cost optimization.',
      tech: ['Go', 'Terraform', 'AWS'],
      accent: '#7b2fff',
      status: 'Live',
      live: '#',
      github: '#',
    },
  ];

  const filters = ['All', 'Fullstack', 'Frontend', 'Backend'];

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter.toLowerCase());

  return (
    <ProjectsContainer id="projects">
      <Inner>

        {/* Header */}
        <div>
          <SectionTag>// What I Build</SectionTag>
          <SectionTitle>Project <span>Showcases</span></SectionTitle>
        </div>

        {/* Filters */}
        <FilterRow>
          {filters.map(f => (
            <FilterBtn
              key={f}
              active={activeFilter === f ? 1 : 0}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </FilterBtn>
          ))}
        </FilterRow>

        {/* Loading State */}
        {loading && (
          <Grid>
            {[...Array(3)].map((_, i) => (
              <Card key={i} accent="#22d3ee" style={{ opacity: 0.5 }}>
                <Preview style={{ height: '150px', background: 'rgba(255,255,255,0.02)' }} />
                <CardInfo>
                  <div style={{ height: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', marginBottom: '10px' }} />
                </CardInfo>
              </Card>
            ))}
          </Grid>
        )}

        {/* Error State */}
        {error && !loading && (
          <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)', padding: '40px 20px' }}>
            <p>Unable to load projects. Showing default projects.</p>
          </div>
        )}

        {/* Grid */}
        {!loading && (
          <Grid>
            {filtered.map(p => (
              <Card key={p.id} accent={p.accent}>

                {/* Mockup Preview */}
                <Preview>
                  <MockupWindow>
                    <MockupBar>
                      <Dot color="#ff2d78" />
                      <Dot color="#ffcc00" />
                      <Dot color="#00ff88" />
                    </MockupBar>
                    <MockupBody>
                      <MockupLine accent={p.accent} width="65%" />
                      <MockupLine dim width="45%" />
                      <MockupLine dim width="30%" />
                      <MockupBlocks>
                        <MockupBlock accent={p.accent} />
                        <MockupBlock dim />
                        <MockupBlock dim />
                      </MockupBlocks>
                    </MockupBody>
                  </MockupWindow>
                  <StatusBadge accent={p.accent}>{p.status || 'Active'}</StatusBadge>
                </Preview>

                {/* Info */}
                <CardInfo>
                  <ProjectType accent={p.accent}>{p.type}</ProjectType>
                  <ProjectName>{p.name}</ProjectName>
                  <ProjectDesc>{p.desc}</ProjectDesc>
                  <TechRow>
                    {p.tech && p.tech.map(t => (
                      <TechBadge key={t} accent={p.accent}>{t}</TechBadge>
                    ))}
                  </TechRow>
                  <BtnRow>
                    <LiveBtn href={p.live || '#'} accent={p.accent}>View Live →</LiveBtn>
                    <GhostBtn href={p.github || '#'}>GitHub</GhostBtn>
                  </BtnRow>
                </CardInfo>

              </Card>
            ))}
          </Grid>
        )}

      </Inner>
    </ProjectsContainer>
  );
};

export default Projects;