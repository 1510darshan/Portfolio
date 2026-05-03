import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { resolveIcon as resolveIconAsync, findIcon } from '../../Services/IconLoader';
import { useFirebase } from '../../Services/FetchData';

// ── Animations ──────────────────────────────────────────────
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.4; }
  50%       { opacity: 0.8; }
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

// ── Rings ────────────────────────────────────────────────────
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
`;

const RingSvg = styled.svg`
  transform: rotate(-90deg);
  transition: all 0.3s ease;
  ${RingWrap}:hover & { transform: rotate(-90deg) scale(1.05); }
`;

const RingLabel = styled.span`
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.6);
  transition: color 0.3s ease;
  ${RingWrap}:hover & { color: ${({ color }) => color}; }
`;

// ── Tabs ─────────────────────────────────────────────────────
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
  border: 1px solid ${({ $active }) => $active ? '#22d3ee' : 'rgba(255,255,255,0.12)'};
  background: ${({ $active }) => $active ? 'rgba(34,211,238,0.15)' : 'transparent'};
  color: ${({ $active }) => $active ? '#22d3ee' : 'rgba(255,255,255,0.45)'};
  font-weight: 600;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 100%; height: 100%;
    background: rgba(34,211,238,0.1);
    transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: -1;
  }

  &:hover { border-color: #22d3ee; color: #22d3ee; background: rgba(34,211,238,0.12); transform: translateY(-2px); }
  &:hover::before { left: 100%; }
`;

// ── Grid ─────────────────────────────────────────────────────
const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  @media (max-width: 1024px) { grid-template-columns: repeat(3, 1fr); }
  @media (max-width: 600px)  { grid-template-columns: repeat(2, 1fr); }
`;

const SkillCard = styled.div`
  padding: 24px;
  background: rgba(10,26,46,0.6);
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
    box-shadow: 0 8px 28px ${({ color }) => `${color}15`}, 0 4px 12px rgba(0,0,0,0.24);
    transform: translateY(-6px);
    background: rgba(10,26,46,0.8);
  }

  &:hover::before { opacity: 1; }
`;

const SkillTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SkillIcon = styled.div`
  font-size: 1.4rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ color }) => `${color}15`};
  border-radius: 8px;
  border: 1px solid ${({ color }) => `${color}30`};
  color: ${({ color }) => color};
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
  background: rgba(255,255,255,0.06);
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

// ── Skeleton ─────────────────────────────────────────────────
const SkeletonBlock = styled.div`
  border-radius: 6px;
  background: linear-gradient(
    90deg,
    rgba(255,255,255,0.05) 25%,
    rgba(255,255,255,0.1)  50%,
    rgba(255,255,255,0.05) 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.6s infinite, ${pulse} 2s ease-in-out infinite;
  height: ${({ h }) => h || '12px'};
  width:  ${({ w }) => w || '100%'};
`;

// ── Tools ────────────────────────────────────────────────────
const ToolsWrap = styled.div`display: flex; flex-direction: column; gap: 20px;`;

const ToolsTitle = styled.h3`
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  color: #22d3ee;
  letter-spacing: 0.2em;
  text-transform: uppercase;
`;

const ToolsGrid = styled.div`display: flex; flex-wrap: wrap; gap: 10px;`;

const Tool = styled.div`
  padding: 8px 18px;
  background: rgba(10,26,46,0.6);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 6px;
  font-size: 0.78rem;
  font-family: 'Space Mono', monospace;
  color: rgba(255,255,255,0.5);
  transition: all 0.3s ease;
  cursor: default;
  &:hover { border-color: rgba(34,211,238,0.3); color: #22d3ee; background: rgba(34,211,238,0.06); }
`;

const StateBox = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: rgba(255,255,255,0.45);
  p:first-child { font-size: 1rem; color: rgba(255,255,255,0.6); margin-bottom: 6px; }
  p:last-child  { font-size: 0.85rem; }
`;

// ── Ring Component ────────────────────────────────────────────
const SkillRing = ({ name, level, color, icon }) => {
  const r      = 38;
  const circ   = 2 * Math.PI * r;
  const offset = circ - (level / 100) * circ;
  const faIcon = findIcon(icon);

  return (
    <RingWrap color={color}>
      <div style={{ position: 'relative', width: 100, height: 100 }}>
        <RingSvg width="100" height="100">
          <circle cx="50" cy="50" r={r}
            fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="7"
          />
          <circle cx="50" cy="50" r={r}
            fill="none" stroke={color} strokeWidth="7"
            strokeDasharray={circ} strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 6px ${color})`, transition: 'stroke-dashoffset 1.2s ease' }}
          />
        </RingSvg>
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 3,
        }}>
          {faIcon
            ? <FontAwesomeIcon icon={faIcon} style={{ fontSize: '1rem', color }} />
            : <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)' }}>?</span>
          }
          <span style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '0.7rem', fontWeight: 700, color,
          }}>{level}%</span>
        </div>
      </div>
      <RingLabel color={color}>{name}</RingLabel>
    </RingWrap>
  );
};

const SkeletonRing = () => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
    <SkeletonBlock h="100px" w="100px" style={{ borderRadius: '50%' }} />
    <SkeletonBlock h="10px" w="70px" />
  </div>
);

// ── Constants ─────────────────────────────────────────────────
const TOOLS = [
  'VS Code', 'Git', 'Figma', 'Postman',
  'Webpack', 'Vite', 'Vercel', 'Netlify', 'Firebase',
];

// ── Main Component ────────────────────────────────────────────
const Skills = () => {
  const { data: allSkills, loading, error } = useFirebase('skills');
  const [activeTab, setActiveTab] = useState(null);
  const [iconsReady, setIconsReady] = useState(false);

  // Preload all icons used by skills once data arrives
  useEffect(() => {
    if (!allSkills || allSkills.length === 0) return;
    setIconsReady(false);
    const iconDefs = allSkills.map(s => s.icon).filter(Boolean);
    Promise.all(iconDefs.map(resolveIconAsync)).then(() => setIconsReady(true));
  }, [allSkills]);

  const categories = React.useMemo(() => {
    if (!allSkills || allSkills.length === 0) return {};
    return allSkills.reduce((acc, skill) => {
      const cat = skill.category || 'Other';
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(skill);
      return acc;
    }, {});
  }, [allSkills]);

  const tabOptions = Object.keys(categories);

  useEffect(() => {
    if (tabOptions.length > 0 && !tabOptions.includes(activeTab)) {
      setActiveTab(tabOptions[0]);
    }
  }, [tabOptions]);

  const ringSkills = React.useMemo(() => {
    if (!allSkills || allSkills.length === 0) return [];
    return allSkills
      .filter(s => s.featured === true)
      .sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
      .slice(0, 3);
  }, [allSkills]);

  const activeSkills = (activeTab && categories[activeTab])
    ? [...categories[activeTab]].sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
    : [];

  return (
    <SkillsContainer id="skills">
      <Inner>

        <div>
          <SectionTag>// What I Know</SectionTag>
          <SectionTitle>Tech <span>Skills</span></SectionTitle>
        </div>

        {/* Rings */}
        <RingsRow>
          {loading
            ? [...Array(3)].map((_, i) => <SkeletonRing key={i} />)
            : ringSkills.map(s => <SkillRing key={s.id || s.name} {...s} />)
          }
        </RingsRow>

        {/* Tabs + Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {loading && (
            <TabRow>
              {[...Array(3)].map((_, i) => (
                <SkeletonBlock key={i} h="40px" w="90px" style={{ borderRadius: '12px' }} />
              ))}
            </TabRow>
          )}

          {!loading && tabOptions.length > 0 && (
            <TabRow>
              {tabOptions.map(cat => (
                <Tab key={cat} $active={activeTab === cat ? 1 : 0} onClick={() => setActiveTab(cat)}>
                  {cat}
                </Tab>
              ))}
            </TabRow>
          )}

          {loading && (
            <SkillsGrid>
              {[...Array(8)].map((_, i) => (
                <SkillCard key={i} color="#22d3ee" style={{ pointerEvents: 'none' }}>
                  <SkillTop>
                    <SkeletonBlock h="40px" w="40px" style={{ borderRadius: '8px' }} />
                    <SkeletonBlock h="12px" w="36px" />
                  </SkillTop>
                  <SkeletonBlock h="14px" w="60%" />
                  <SkeletonBlock h="4px" />
                </SkillCard>
              ))}
            </SkillsGrid>
          )}

          {error && !loading && (
            <StateBox>
              <p>Unable to load skills.</p>
              <p>Please check your connection and try again.</p>
            </StateBox>
          )}

          {!loading && !error && activeSkills.length > 0 && (
            <SkillsGrid>
              {activeSkills.map(skill => {
                const faIcon = findIcon(skill.icon);
                const color  = skill.color || '#22d3ee';
                return (
                  <SkillCard key={skill.id || skill.name} color={color}>
                    <SkillTop>
                      <SkillIcon color={color}>
                        {faIcon
                          ? <FontAwesomeIcon icon={faIcon} />
                          : <span style={{ fontSize: '0.65rem', opacity: 0.4 }}>?</span>
                        }
                      </SkillIcon>
                      <SkillPercent color={color}>{skill.level}%</SkillPercent>
                    </SkillTop>
                    <SkillName>{skill.name}</SkillName>
                    <BarTrack>
                      <BarFill level={skill.level} color={color} />
                    </BarTrack>
                  </SkillCard>
                );
              })}
            </SkillsGrid>
          )}

          {!loading && !error && activeTab && activeSkills.length === 0 && (
            <StateBox>
              <p>No skills found in this category.</p>
              <p>Add skills via the admin panel.</p>
            </StateBox>
          )}

        </div>

        {/* Tools */}
        <ToolsWrap>
          <ToolsTitle>// Tools &amp; Workflow</ToolsTitle>
          <ToolsGrid>
            {TOOLS.map(t => <Tool key={t}>{t}</Tool>)}
          </ToolsGrid>
        </ToolsWrap>

      </Inner>
    </SkillsContainer>
  );
};

export default Skills;