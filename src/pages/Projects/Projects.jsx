import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

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
  margin-bottom: 8px;
`;

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 900;
  color: white;
  letter-spacing: 0.05em;

  span {
    background: linear-gradient(135deg, #22d3ee, #7b2fff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

// Filter Tabs
const FilterRow = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const FilterBtn = styled.button`
  padding: 8px 20px;
  border-radius: 50px;
  font-size: 0.78rem;
  font-family: 'Space Mono', monospace;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid ${({ active }) => active ? '#22d3ee' : 'rgba(255,255,255,0.1)'};
  background: ${({ active }) => active ? 'rgba(34,211,238,0.1)' : 'transparent'};
  color: ${({ active }) => active ? '#22d3ee' : 'rgba(255,255,255,0.4)'};

  &:hover {
    border-color: #22d3ee;
    color: #22d3ee;
    background: rgba(34,211,238,0.08);
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
  background: rgba(10, 26, 46, 0.8);
  border: 1px solid ${({ accent }) => `${accent}22`};
  border-radius: 14px;
  overflow: hidden;
  transition: all 0.35s ease;
  cursor: pointer;

  &:hover {
    border-color: ${({ accent }) => `${accent}66`};
    box-shadow: 0 0 30px ${({ accent }) => `${accent}18`};
    transform: translateY(-6px);
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
  font-size: 0.68rem;
  padding: 3px 10px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 4px;
  color: rgba(255,255,255,0.5);
  font-family: 'Space Mono', monospace;
  transition: all 0.2s ease;

  ${Card}:hover & {
    border-color: ${({ accent }) => `${accent}44`};
    color: rgba(255,255,255,0.7);
  }
`;

const BtnRow = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 4px;
`;

const LiveBtn = styled.a`
  padding: 7px 16px;
  background: linear-gradient(135deg, ${({ accent }) => accent}44, #7b2fff44);
  border: 1px solid ${({ accent }) => `${accent}55`};
  border-radius: 6px;
  color: white;
  font-size: 0.75rem;
  font-family: 'Space Mono', monospace;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    background: linear-gradient(135deg, ${({ accent }) => accent}66, #7b2fff66);
    box-shadow: 0 0 14px ${({ accent }) => `${accent}30`};
  }
`;

const GhostBtn = styled.a`
  padding: 7px 16px;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 6px;
  color: rgba(255,255,255,0.45);
  font-size: 0.75rem;
  font-family: 'Space Mono', monospace;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    border-color: rgba(255,255,255,0.3);
    color: white;
  }
`;

// ── Data ─────────────────────────────────────────────────────
const projects = [
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

// ── Component ────────────────────────────────────────────────
const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');

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

        {/* Grid */}
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
                <StatusBadge accent={p.accent}>{p.status}</StatusBadge>
              </Preview>

              {/* Info */}
              <CardInfo>
                <ProjectType accent={p.accent}>{p.type}</ProjectType>
                <ProjectName>{p.name}</ProjectName>
                <ProjectDesc>{p.desc}</ProjectDesc>
                <TechRow>
                  {p.tech.map(t => (
                    <TechBadge key={t} accent={p.accent}>{t}</TechBadge>
                  ))}
                </TechRow>
                <BtnRow>
                  <LiveBtn href={p.live} accent={p.accent}>View Live →</LiveBtn>
                  <GhostBtn href={p.github}>GitHub</GhostBtn>
                </BtnRow>
              </CardInfo>

            </Card>
          ))}
        </Grid>

      </Inner>
    </ProjectsContainer>
  );
};

export default Projects;