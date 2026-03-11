import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useFirebase } from '../../Services/Firebase/useFirebase';

// ── Animations ──────────────────────────────────────────────
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const rotateSlow = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const rotateReverse = keyframes`
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

// ── Styled Components ────────────────────────────────────────
const SkillsContainer = styled.section`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(180deg, #040d1a 0%, #071428 50%, #040d1a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px 40px;
  scroll-margin-top: 80px;
`;

const Inner = styled.div`
  max-width: 1100px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 70px;
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

// ── Skill Rings Row ──────────────────────────────────────────
const RingsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
`;

const RingWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  cursor: default;

  &:hover svg circle:last-child {
    filter: drop-shadow(0 0 8px ${({ color }) => color});
  }
`;

const RingSvg = styled.svg`
  transform: rotate(-90deg);
  transition: all 0.3s ease;

  ${RingWrap}:hover & {
    transform: rotate(-90deg) scale(1.05);
  }
`;

const RingLabel = styled.span`
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);

  ${RingWrap}:hover & {
    color: ${({ color }) => color};
  }
  transition: color 0.3s ease;
`;

// ── Category Tabs ────────────────────────────────────────────
const TabRow = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const Tab = styled.button`
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

// ── Skills Grid ──────────────────────────────────────────────
const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: 1024px) { grid-template-columns: repeat(3, 1fr); }
  @media (max-width: 600px)  { grid-template-columns: repeat(2, 1fr); }
`;

const SkillCard = styled.div`
  padding: 24px;
  background: rgba(10, 26, 46, 0.6);
  border: 1px solid ${({ color }) => `${color}22`};
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: default;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, ${({ color }) => `${color}10`}, transparent);
    opacity: 0;
    transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: none;
  }

  &:hover {
    border-color: ${({ color }) => `${color}55`};
    box-shadow: 0 8px 28px ${({ color }) => `${color}15`}, 0 4px 12px rgba(0, 0, 0, 0.24);
    transform: translateY(-6px);
    background: rgba(10, 26, 46, 0.8);
  }

  &:hover::before {
    opacity: 1;
  }
`;

const SkillTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SkillIcon = styled.div`
  font-size: 1.5rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ color }) => `${color}15`};
  border-radius: 8px;
  border: 1px solid ${({ color }) => `${color}30`};
`;

const SkillPercent = styled.span`
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  font-weight: 700;
  color: ${({ color }) => color};
`;

const SkillName = styled.span`
  font-size: 0.88rem;
  font-weight: 700;
  color: white;
  letter-spacing: 0.05em;
`;

const BarTrack = styled.div`
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 2px;
  overflow: hidden;
`;

const BarFill = styled.div`
  height: 100%;
  width: ${({ level }) => level}%;
  background: linear-gradient(90deg, ${({ color }) => color}, ${({ color }) => color}88);
  border-radius: 2px;
  box-shadow: 0 0 8px ${({ color }) => `${color}60`};
  transition: width 1s ease;
`;

// ── Tools Section ────────────────────────────────────────────
const ToolsWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ToolsTitle = styled.h3`
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  color: #22d3ee;
  letter-spacing: 0.2em;
  text-transform: uppercase;
`;

const ToolsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Tool = styled.div`
  padding: 8px 18px;
  background: rgba(10, 26, 46, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  font-size: 0.78rem;
  font-family: 'Space Mono', monospace;
  color: rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;
  cursor: default;

  &:hover {
    border-color: rgba(34, 211, 238, 0.3);
    color: #22d3ee;
    background: rgba(34, 211, 238, 0.06);
  }
`;



// ── Ring Component ────────────────────────────────────────────
const SkillRing = ({ name, level, color, icon }) => {
  const r = 38;
  const circ = 2 * Math.PI * r;
  const offset = circ - (level / 100) * circ;

  return (
    <RingWrap color={color}>
      <div style={{ position: 'relative', width: 100, height: 100 }}>
        <RingSvg width="100" height="100">
          {/* Track */}
          <circle cx="50" cy="50" r={r}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="7"
          />
          {/* Fill */}
          <circle cx="50" cy="50" r={r}
            fill="none"
            stroke={color}
            strokeWidth="7"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{
              filter: `drop-shadow(0 0 6px ${color})`,
              transition: 'stroke-dashoffset 1.2s ease',
            }}
          />
        </RingSvg>
        {/* Center text */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 2,
        }}>
          <span style={{ fontSize: '1rem' }}>{icon}</span>
          <span style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '0.7rem', fontWeight: 700,
            color: color,
          }}>{level}%</span>
        </div>
      </div>
      <RingLabel color={color}>{name}</RingLabel>
    </RingWrap>
  );
};

// ── Component ────────────────────────────────────────────────
const Skills = () => {
  const [activeTab, setActiveTab] = useState('Frontend');
  const { data: firebaseSkills, loading } = useFirebase('skills');

  // Fallback data for each category if Firebase data is not available
  const defaultCategories = {
    Frontend: [
      { name: 'React',      level: 95, color: '#22d3ee', icon: '⚛' },
      { name: 'TypeScript', level: 87, color: '#3178c6', icon: 'TS' },
      { name: 'Next.js',    level: 85, color: '#ffffff', icon: '▲' },
      { name: 'Vue.js',     level: 75, color: '#42b883', icon: '💚' },
      { name: 'Three.js',   level: 70, color: '#ff6b6b', icon: '3D' },
      { name: 'CSS/SASS',   level: 92, color: '#ff2d78', icon: '🎨' },
      { name: 'Tailwind',   level: 90, color: '#38bdf8', icon: '💨' },
      { name: 'Redux',      level: 83, color: '#764abc', icon: '🔄' },
    ],
    Backend: [
      { name: 'Node.js',    level: 90, color: '#00ff88', icon: '⬡' },
      { name: 'Python',     level: 88, color: '#7b2fff', icon: '🐍' },
      { name: 'Java',       level: 80, color: '#f89820', icon: '☕' },
      { name: 'Go',         level: 72, color: '#00acd7', icon: '🐹' },
      { name: 'PostgreSQL', level: 85, color: '#336791', icon: '🐘' },
      { name: 'MongoDB',    level: 82, color: '#47a248', icon: '🍃' },
      { name: 'Redis',      level: 75, color: '#ff4438', icon: '⚡' },
      { name: 'GraphQL',    level: 78, color: '#e535ab', icon: '◈' },
    ],
    DevOps: [
      { name: 'AWS',        level: 82, color: '#ff9900', icon: '☁' },
      { name: 'Docker',     level: 78, color: '#2496ed', icon: '🐳' },
      { name: 'Kubernetes', level: 70, color: '#326ce5', icon: '⚙' },
      { name: 'Terraform',  level: 68, color: '#7b42bc', icon: '🏗' },
      { name: 'GitHub CI',  level: 85, color: '#f05032', icon: '🔁' },
      { name: 'Linux',      level: 88, color: '#fcc624', icon: '🐧' },
      { name: 'Nginx',      level: 75, color: '#009639', icon: '🌐' },
      { name: 'Prometheus', level: 65, color: '#e6522c', icon: '📊' },
    ],
  };

  // Build categories from Firebase data if available
  const categories = firebaseSkills && firebaseSkills.length > 0
    ? firebaseSkills.reduce((acc, skill) => {
        const cat = skill.category || 'Frontend';
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(skill);
        return acc;
      }, {})
    : defaultCategories;

  // Get ring skills from Firebase or default
  const ringSkills = firebaseSkills && firebaseSkills.length > 0
    ? firebaseSkills.filter(s => s.featured === true).slice(0, 3)
    : [
        { name: 'React',      level: 95, color: '#22d3ee', icon: '⚛' },
        { name: 'Node.js',    level: 90, color: '#00ff88', icon: '⬡' },
        { name: 'TypeScript', level: 87, color: '#3178c6', icon: 'TS' },
      ];

  const tools = ['VS Code', 'Git', 'Figma', 'Postman', 'Jest',
    'Webpack', 'Vite', 'ESLint', 'Prettier', 'Jira',
    'Slack', 'Notion', 'Vercel', 'Netlify', 'Firebase'];

  const tabOptions = Object.keys(categories);

  // Set active tab if not available in current data
  if (!tabOptions.includes(activeTab) && tabOptions.length > 0) {
    setActiveTab(tabOptions[0]);
  }

  return (
    <SkillsContainer id="skills">
      <Inner>

        {/* Header */}
        <div>
          <SectionTag>// What I Know</SectionTag>
          <SectionTitle>Tech <span>Skills</span></SectionTitle>
        </div>

        {/* Rings */}
        {!loading && (
          <RingsRow>
            {ringSkills.map(s => (
              <SkillRing key={s.name} {...s} />
            ))}
          </RingsRow>
        )}

        {/* Category Tabs + Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <TabRow>
            {tabOptions.map(cat => (
              <Tab
                key={cat}
                active={activeTab === cat ? 1 : 0}
                onClick={() => setActiveTab(cat)}
              >
                {cat}
              </Tab>
            ))}
          </TabRow>

          {loading ? (
            <SkillsGrid>
              {[...Array(4)].map((_, i) => (
                <SkillCard key={i} color="#22d3ee" style={{ opacity: 0.5 }}>
                  <SkillName style={{ height: '20px', background: 'rgba(255,255,255,0.1)' }} />
                </SkillCard>
              ))}
            </SkillsGrid>
          ) : (
            <SkillsGrid>
              {categories[activeTab] && categories[activeTab].map(skill => (
                <SkillCard key={skill.name} color={skill.color}>
                  <SkillTop>
                    <SkillIcon color={skill.color}>{skill.icon}</SkillIcon>
                    <SkillPercent color={skill.color}>{skill.level}%</SkillPercent>
                  </SkillTop>
                  <SkillName>{skill.name}</SkillName>
                  <BarTrack>
                    <BarFill level={skill.level} color={skill.color} />
                  </BarTrack>
                </SkillCard>
              ))}
            </SkillsGrid>
          )}
        </div>

        {/* Tools */}
        <ToolsWrap>
          <ToolsTitle>// Tools & Workflow</ToolsTitle>
          <ToolsGrid>
            {tools.map(t => <Tool key={t}>{t}</Tool>)}
          </ToolsGrid>
        </ToolsWrap>

      </Inner>
    </SkillsContainer>
  );
};

export default Skills;