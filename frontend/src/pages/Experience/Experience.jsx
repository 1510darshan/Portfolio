import React, { useState, useMemo } from 'react';
import styled, { keyframes } from 'styled-components';
import { useFirebase } from '../../Services/FetchData';

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
  border: 1px solid ${({ $active }) => $active ? '#22d3ee' : 'rgba(255,255,255,0.12)'};
  background: ${({ $active }) => $active ? 'rgba(34,211,238,0.15)' : 'transparent'};
  color: ${({ $active }) => $active ? '#22d3ee' : 'rgba(255,255,255,0.45)'};
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
  width: ${({ $current }) => $current ? '16px' : '12px'};
  height: ${({ $current }) => $current ? '16px' : '12px'};
  border-radius: 50%;
  background: ${({ $current }) => $current ? '#7b2fff' : '#22d3ee'};
  border: 2px solid #040d1a;
  z-index: 1;
  animation: ${({ $current }) => $current ? pulseDot : 'none'} 2s ease-in-out infinite;
`;

const Card = styled.div`
  flex: 1;
  padding: 28px 32px;
  background: rgba(10, 26, 46, 0.6);
  border: 1px solid ${({ $current }) =>
    $current ? 'rgba(123,47,255,0.3)' : 'rgba(34,211,238,0.15)'};
  border-radius: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: default;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, ${({ $current }) =>
    $current ? 'rgba(123,47,255,0.1)' : 'rgba(34,211,238,0.08)'}, transparent);
    opacity: 0;
    transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: none;
  }

  &:hover {
    border-color: ${({ $current }) =>
    $current ? 'rgba(123,47,255,0.5)' : 'rgba(34,211,238,0.35)'};
    box-shadow: 0 8px 28px ${({ $current }) =>
    $current ? 'rgba(123,47,255,0.15)' : 'rgba(34,211,238,0.12)'}, 0 4px 12px rgba(0, 0, 0, 0.24);
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
  color: ${({ $current }) => $current ? '#7b2fff' : '#22d3ee'};
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

// ── Date parsing ──────────────────────────────────────────────
// Handles formats like:
//   "Aug 2024 — Present"
//   "Jan 2022 — Dec 2023"
//   "2021 — 2022"
//   "Mar 2020"

const MONTHS = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
};

const parseMonthYear = (str) => {
  if (!str) return null;
  const s = str.trim().toLowerCase();

  // "present" / "now" → today
  if (s === 'present' || s === 'now') return new Date();

  // "MMM YYYY"  e.g. "aug 2024"
  const monthYear = s.match(/^([a-z]{3})\s+(\d{4})$/);
  if (monthYear) {
    const m = MONTHS[monthYear[1]];
    const y = parseInt(monthYear[2], 10);
    if (m !== undefined && !isNaN(y)) return new Date(y, m, 1);
  }

  // "YYYY" only
  const yearOnly = s.match(/^(\d{4})$/);
  if (yearOnly) return new Date(parseInt(yearOnly[1], 10), 0, 1);

  return null;
};

/**
 * Extract the START date from a range string like:
 *   "Aug 2024 — Present"   →  Aug 2024
 *   "Jan 2022 — Dec 2023"  →  Jan 2022
 *   "Mar 2020"             →  Mar 2020
 *
 * Returns a Date or null.
 */
const parseStartDate = (dateStr) => {
  if (!dateStr) return null;

  // Split on common range separators: —, –, -, "to"
  const parts = dateStr.split(/\s*[—–\-]|(?:\s+to\s+)/i);
  const startStr = parts[0]?.trim();
  return parseMonthYear(startStr);
};

// ── Sort experiences: current first, then by start date desc ──
const sortExperiences = (list) => {
  if (!list || list.length === 0) return [];
  return [...list].sort((a, b) => {
    // Current jobs always float to top
    if (a.current && !b.current) return -1;
    if (!a.current && b.current) return 1;

    const dateA = parseStartDate(a.date);
    const dateB = parseStartDate(b.date);

    // Both have parseable dates → newest first
    if (dateA && dateB) return dateB - dateA;

    // Unparseable dates sink to bottom
    if (dateA && !dateB) return -1;
    if (!dateA && dateB) return 1;
    return 0;
  });
};

// ── Component ────────────────────────────────────────────────
const Experience = () => {
  const [activeTab, setActiveTab] = useState('Experience');
  const { data: expList, loading } = useFirebase('experiences');
  const tabs = ['Experience', 'Education', 'Certifications'];

  const sortedExperiences = useMemo(() => sortExperiences(expList), [expList]);

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
              $active={activeTab === t ? 1 : 0}
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
                    <DotWrap><Dot /></DotWrap>
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
                {sortedExperiences.length > 0 ? (
                  sortedExperiences.map((exp, i) => (
                    <TimelineItem key={exp.id || i}>
                      <DotWrap>
                        <Dot $current={exp.current ? 1 : 0} />
                      </DotWrap>
                      <Card $current={exp.current ? 1 : 0}>
                        <CardTop>
                          <Role>{exp.role}</Role>
                          <DateBadge>{exp.date}</DateBadge>
                        </CardTop>
                        <Company>
                          <CompanyName $current={exp.current}>{exp.company}</CompanyName>
                          {exp.type && <CompanyType>· {exp.type}</CompanyType>}
                          {exp.current && <CurrentBadge>Current</CurrentBadge>}
                        </Company>
                        <Desc>{exp.desc}</Desc>
                        <TagRow>
                          {Array.isArray(exp.tags) && exp.tags.map(tag => (
                            <Tag key={tag}>{tag}</Tag>
                          ))}
                        </TagRow>
                      </Card>
                    </TimelineItem>
                  ))
                ) : (
                  <TimelineItem>
                    <DotWrap><Dot /></DotWrap>
                    <Card>
                      <CardTop>
                        <Role>No experience data found.</Role>
                      </CardTop>
                    </Card>
                  </TimelineItem>
                )}
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