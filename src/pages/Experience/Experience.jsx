import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useFirebase } from '../../Services/Firebase/useFirebase';

// ── Animations ──────────────────────────────────────────────
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulseDot = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.4); opacity: 0.6; }
`;

const glowLine = keyframes`
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.8; }
`;

// ── Styled Components ────────────────────────────────────────
const ExperienceContainer = styled.section`
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

// ── Tab Switch ───────────────────────────────────────────────
const TabRow = styled.div`
  display: flex;
  gap: 10px;
`;

const Tab = styled.button`
  padding: 11px 28px;
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

// ── Timeline ─────────────────────────────────────────────────
const TimelineWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const TimelineLine = styled.div`
  position: absolute;
  left: 19px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(
    180deg,
    #22d3ee 0%,
    #7b2fff 50%,
    transparent 100%
  );
  animation: ${glowLine} 3s ease-in-out infinite;
`;

const TimelineItem = styled.div`
  position: relative;
  display: flex;
  gap: 32px;
  padding-left: 60px;
  padding-bottom: 48px;

  &:last-child {
    padding-bottom: 0;
  }
`;

const DotWrap = styled.div`
  position: absolute;
  left: 0;
  top: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
`;

const Dot = styled.div`
  width: ${({ current }) => current ? '16px' : '12px'};
  height: ${({ current }) => current ? '16px' : '12px'};
  border-radius: 50%;
  background: ${({ current }) => current ? '#7b2fff' : '#22d3ee'};
  border: 2px solid ${({ current }) => current ? '#040d1a' : '#040d1a'};
  box-shadow: 0 0 ${({ current }) => current ? '16px' : '10px'}
    ${({ current }) => current ? '#7b2fff' : '#22d3ee'};
  z-index: 1;
  animation: ${({ current }) => current ? pulseDot : 'none'} 2s ease-in-out infinite;
`;

const Card = styled.div`
  flex: 1;
  padding: 28px 32px;
  background: rgba(10, 26, 46, 0.6);
  border: 1px solid ${({ current }) =>
    current ? 'rgba(123,47,255,0.3)' : 'rgba(34,211,238,0.15)'};
  border-radius: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: default;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, ${({ current }) =>
      current ? 'rgba(123,47,255,0.1)' : 'rgba(34,211,238,0.08)'}, transparent);
    opacity: 0;
    transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: none;
  }

  &:hover {
    border-color: ${({ current }) =>
      current ? 'rgba(123,47,255,0.5)' : 'rgba(34,211,238,0.35)'};
    box-shadow: 0 8px 28px ${({ current }) =>
      current ? 'rgba(123,47,255,0.15)' : 'rgba(34,211,238,0.12)'}, 0 4px 12px rgba(0, 0, 0, 0.24);
    transform: translateY(-4px);
    background: rgba(10, 26, 46, 0.8);
  }

  &:hover::before {
    opacity: 1;
  }
`;

const CardTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 6px;
  flex-wrap: wrap;
  gap: 8px;
`;

const Role = styled.h3`
  font-size: 1rem;
  font-weight: 800;
  color: white;
  letter-spacing: 0.05em;
`;

const DateBadge = styled.span`
  font-family: 'Space Mono', monospace;
  font-size: 0.7rem;
  color: #22d3ee;
  letter-spacing: 0.15em;
  padding: 4px 12px;
  border: 1px solid rgba(34,211,238,0.2);
  border-radius: 20px;
  background: rgba(34,211,238,0.06);
  white-space: nowrap;
`;

const Company = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
`;

const CompanyName = styled.span`
  font-size: 0.88rem;
  font-weight: 600;
  color: ${({ current }) => current ? '#7b2fff' : '#22d3ee'};
  letter-spacing: 0.05em;
`;

const CompanyType = styled.span`
  font-size: 0.7rem;
  color: rgba(255,255,255,0.3);
  font-family: 'Space Mono', monospace;
`;

const CurrentBadge = styled.span`
  font-size: 0.65rem;
  font-family: 'Space Mono', monospace;
  letter-spacing: 0.1em;
  padding: 3px 10px;
  border-radius: 20px;
  border: 1px solid #7b2fff;
  color: #7b2fff;
  background: rgba(123,47,255,0.1);
`;

const Desc = styled.p`
  font-size: 0.85rem;
  color: rgba(255,255,255,0.45);
  line-height: 1.8;
  margin-bottom: 14px;
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Tag = styled.span`
  font-size: 0.68rem;
  padding: 3px 10px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 4px;
  color: rgba(255,255,255,0.45);
  font-family: 'Space Mono', monospace;
  transition: all 0.2s ease;

  ${Card}:hover & {
    border-color: rgba(34,211,238,0.2);
    color: rgba(255,255,255,0.65);
  }
`;

// ── Education ─────────────────────────────────────────────────
const EduGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const EduCard = styled.div`
  padding: 24px;
  background: rgba(10, 26, 46, 0.8);
  border: 1px solid rgba(0,212,255,0.1);
  border-radius: 14px;
  display: flex;
  gap: 18px;
  align-items: flex-start;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(34,211,238,0.35);
    box-shadow: 0 0 20px rgba(34,211,238,0.08);
    transform: translateY(-4px);
  }
`;

const EduIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 10px;
  background: ${({ color }) => `${color}15`};
  border: 1px solid ${({ color }) => `${color}30`};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  flex-shrink: 0;
`;

const EduInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const EduDegree = styled.h4`
  font-size: 0.92rem;
  font-weight: 700;
  color: white;
  letter-spacing: 0.03em;
`;

const EduSchool = styled.span`
  font-size: 0.8rem;
  color: #22d3ee;
  font-weight: 600;
`;

const EduYear = styled.span`
  font-size: 0.72rem;
  color: rgba(255,255,255,0.35);
  font-family: 'Space Mono', monospace;
  letter-spacing: 0.1em;
`;

const EduGrade = styled.span`
  font-size: 0.72rem;
  color: rgba(255,255,255,0.4);
  margin-top: 4px;
`;

// ── Certifications ────────────────────────────────────────────
const CertGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 600px) { grid-template-columns: 1fr; }
`;

const CertCard = styled.div`
  padding: 20px;
  background: rgba(10, 26, 46, 0.7);
  border: 1px solid ${({ color }) => `${color}22`};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ color }) => `${color}55`};
    box-shadow: 0 0 16px ${({ color }) => `${color}12`};
    transform: translateY(-3px);
  }
`;

const CertIcon = styled.div`
  font-size: 1.6rem;
`;

const CertName = styled.h4`
  font-size: 0.85rem;
  font-weight: 700;
  color: white;
  line-height: 1.4;
`;

const CertIssuer = styled.span`
  font-size: 0.72rem;
  color: ${({ color }) => color};
  font-family: 'Space Mono', monospace;
  letter-spacing: 0.05em;
`;

const CertYear = styled.span`
  font-size: 0.7rem;
  color: rgba(255,255,255,0.3);
  font-family: 'Space Mono', monospace;
`;



// ── Component ────────────────────────────────────────────────
const Experience = () => {
  const [activeTab, setActiveTab] = useState('Experience');
  const { data: firebaseExperiences, loading } = useFirebase('experiences');

  // Tabs
  const tabs = ['Experience', 'Education', 'Certifications'];

  // Education data (static)
  const education = [
    {
      icon: '🎓',
      degree: 'B.Tech in Computer Science',
      school: 'MIT College of Engineering',
      year: '2016 — 2020',
      grade: 'CGPA: 8.7 / 10',
      color: '#22d3ee',
    },
    {
      icon: '📚',
      degree: 'Higher Secondary Certificate',
      school: 'Pune Board of Education',
      year: '2014 — 2016',
      grade: 'Percentage: 91.4%',
      color: '#7b2fff',
    },
  ];

  // Certifications data (static)
  const certifications = [
    { icon: '☁', name: 'AWS Certified Solutions Architect', issuer: 'Amazon', year: '2023', color: '#ff9900' },
    { icon: '⚛', name: 'React Advanced Patterns', issuer: 'Frontend Masters', year: '2023', color: '#22d3ee' },
    { icon: '🐳', name: 'Certified Kubernetes Administrator', issuer: 'CNCF', year: '2022', color: '#2496ed' },
    { icon: '🔐', name: 'Certified Ethical Hacker', issuer: 'EC-Council', year: '2022', color: '#ff2d78' },
    { icon: '🐍', name: 'Python for Data Science', issuer: 'Coursera', year: '2021', color: '#7b2fff' },
    { icon: '🌐', name: 'Google Cloud Professional', issuer: 'Google', year: '2024', color: '#00ff88' },
  ];

  // Fallback data for experience if Firebase is not available
  const defaultExperiences = [
    {
      role: 'Senior Full-Stack Engineer',
      company: 'TechCorp Global',
      type: 'Full-time',
      date: 'Aug 2024 — Present',
      current: true,
      desc: 'Leading a team of 8 engineers to build an enterprise SaaS platform serving 100K+ users. Architected microservices migration reducing API latency by 60% and cutting infrastructure costs by 35%.',
      tags: ['React', 'Node.js', 'AWS', 'Kubernetes', 'PostgreSQL', 'Redis'],
    },
    {
      role: 'Full-Stack Developer',
      company: 'StartupXYZ',
      type: 'Full-time',
      date: 'Jun 2022 — Jul 2024',
      current: false,
      desc: 'Built React/Node.js applications from scratch serving 20K daily active users. Implemented real-time features using WebSockets and improved core web vitals scores by 40%.',
      tags: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Socket.io'],
    },
    {
      role: 'Frontend Developer',
      company: 'Digital Agency Co.',
      type: 'Full-time',
      date: 'Jul 2021 — May 2022',
      current: false,
      desc: 'Created responsive web experiences for Fortune 500 clients. Developed reusable component libraries adopted across 15+ projects, reducing development time by 30%.',
      tags: ['React', 'Vue.js', 'CSS/SASS', 'Figma', 'Webpack'],
    },
    {
      role: 'Junior Developer',
      company: 'FreelanceStudio',
      type: 'Contract',
      date: 'Jan 2020 — Jun 2021',
      current: false,
      desc: 'Started professional journey delivering 20+ web projects for small businesses. Learned React ecosystem deeply and built first production-grade applications.',
      tags: ['JavaScript', 'React', 'WordPress', 'PHP', 'MySQL'],
    },
  ];

  // Use Firebase experiences if available, otherwise use fallback
  const expList = firebaseExperiences && firebaseExperiences.length > 0 
    ? firebaseExperiences 
    : defaultExperiences;

  return (
    <ExperienceContainer id="experience">
      <Inner>

        {/* Header */}
        <div>
          <SectionTag>// My Journey</SectionTag>
          <SectionTitle>Experience & <span>Timeline</span></SectionTitle>
        </div>

        {/* Tabs */}
        <TabRow>
          {tabs.map(t => (
            <Tab
              key={t}
              active={activeTab === t ? 1 : 0}
              onClick={() => setActiveTab(t)}
            >
              {t}
            </Tab>
          ))}
        </TabRow>

        {/* ── Experience Tab ── */}
        {activeTab === 'Experience' && (
          <>
            {loading ? (
              <TimelineWrap>
                <TimelineLine />
                {[...Array(3)].map((_, i) => (
                  <TimelineItem key={i}>
                    <DotWrap>
                      <Dot />
                    </DotWrap>
                    <Card style={{ opacity: 0.5 }}>
                      <CardTop>
                        <Role style={{ height: '20px', width: '40%', background: 'rgba(255,255,255,0.1)' }} />
                      </CardTop>
                      <Desc style={{ height: '40px', background: 'rgba(255,255,255,0.1)' }} />
                    </Card>
                  </TimelineItem>
                ))}
              </TimelineWrap>
            ) : (
              <TimelineWrap>
                <TimelineLine />
                {expList.map((exp, i) => (
                  <TimelineItem key={i}>
                    <DotWrap>
                      <Dot current={exp.current ? 1 : 0} />
                    </DotWrap>
                    <Card current={exp.current ? 1 : 0}>
                      <CardTop>
                        <Role>{exp.role}</Role>
                        <DateBadge>{exp.date}</DateBadge>
                      </CardTop>
                      <Company>
                        <CompanyName current={exp.current}>{exp.company}</CompanyName>
                        <CompanyType>· {exp.type}</CompanyType>
                        {exp.current && <CurrentBadge>Current</CurrentBadge>}
                      </Company>
                      <Desc>{exp.desc}</Desc>
                      <TagRow>
                        {exp.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
                      </TagRow>
                    </Card>
                  </TimelineItem>
                ))}
              </TimelineWrap>
            )}
          </>
        )}

        {/* ── Education Tab ── */}
        {activeTab === 'Education' && (
          <EduGrid>
            {education.map((edu, i) => (
              <EduCard key={i}>
                <EduIcon color={edu.color}>{edu.icon}</EduIcon>
                <EduInfo>
                  <EduDegree>{edu.degree}</EduDegree>
                  <EduSchool>{edu.school}</EduSchool>
                  <EduYear>{edu.year}</EduYear>
                  <EduGrade>{edu.grade}</EduGrade>
                </EduInfo>
              </EduCard>
            ))}
          </EduGrid>
        )}

        {/* ── Certifications Tab ── */}
        {activeTab === 'Certifications' && (
          <CertGrid>
            {certifications.map((cert, i) => (
              <CertCard key={i} color={cert.color}>
                <CertIcon>{cert.icon}</CertIcon>
                <CertName>{cert.name}</CertName>
                <CertIssuer color={cert.color}>{cert.issuer}</CertIssuer>
                <CertYear>{cert.year}</CertYear>
              </CertCard>
            ))}
          </CertGrid>
        )}

      </Inner>
    </ExperienceContainer>
  );
};

export default Experience;