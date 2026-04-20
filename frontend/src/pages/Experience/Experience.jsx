import React, { useState, useMemo } from 'react';
import styled, { keyframes } from 'styled-components';
import { useFirebase } from '../../Services/FetchData';

// ── Animations ──────────────────────────────────────────────
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const pulseDot = keyframes`
  0%, 100% { transform: scale(1);   opacity: 1; }
  50%       { transform: scale(1.4); opacity: 0.6; }
`;

const glowLine = keyframes`
  0%, 100% { opacity: 0.3; }
  50%       { opacity: 0.8; }
`;

const shimmer = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
`;

const shimmerPulse = keyframes`
  0%, 100% { opacity: 0.4; }
  50%       { opacity: 0.8; }
`;

const fillBar = keyframes`
  from { width: 0; }
  to   { width: var(--bar-width); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
`;

// ── Layout ───────────────────────────────────────────────────
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

// ── Tabs ─────────────────────────────────────────────────────
const TabRow = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
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
    top: 0; left: -100%;
    width: 100%; height: 100%;
    background: rgba(34,211,238,0.1);
    transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: -1;
  }

  &:hover { border-color: #22d3ee; color: #22d3ee; background: rgba(34,211,238,0.12); transform: translateY(-2px); }
  &:hover::before { left: 100%; }
`;

// ── Timeline ─────────────────────────────────────────────────
const TimelineWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const TimelineLine = styled.div`
  position: absolute;
  left: 19px;
  top: 0; bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, #22d3ee 0%, #7b2fff 50%, transparent 100%);
  animation: ${glowLine} 3s ease-in-out infinite;
`;

const TimelineItem = styled.div`
  position: relative;
  display: flex;
  gap: 32px;
  padding-left: 60px;
  padding-bottom: 48px;
  &:last-child { padding-bottom: 0; }
`;

const DotWrap = styled.div`
  position: absolute;
  left: 0; top: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px; height: 40px;
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

const ExpCard = styled.div`
  flex: 1;
  padding: 28px 32px;
  background: rgba(10,26,46,0.6);
  border: 1px solid ${({ $current }) => $current ? 'rgba(123,47,255,0.3)' : 'rgba(34,211,238,0.15)'};
  border-radius: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: default;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg,
      ${({ $current }) => $current ? 'rgba(123,47,255,0.1)' : 'rgba(34,211,238,0.08)'},
      transparent);
    opacity: 0;
    transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: none;
  }

  &:hover {
    border-color: ${({ $current }) => $current ? 'rgba(123,47,255,0.5)' : 'rgba(34,211,238,0.35)'};
    box-shadow: 0 8px 28px ${({ $current }) => $current ? 'rgba(123,47,255,0.15)' : 'rgba(34,211,238,0.12)'};
    transform: translateY(-4px);
    background: rgba(10,26,46,0.8);
  }

  &:hover::before { opacity: 1; }
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
  flex-wrap: wrap;
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

  ${ExpCard}:hover & {
    border-color: rgba(34,211,238,0.2);
    color: rgba(255,255,255,0.65);
  }
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
  animation: ${shimmer} 1.6s infinite, ${shimmerPulse} 2s ease-in-out infinite;
  height: ${({ h }) => h || '12px'};
  width:  ${({ w }) => w || '100%'};
`;

// ── Education (Redesigned) ────────────────────────────────────
const EduGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const EduCard = styled.div`
  position: relative;
  padding: 22px 22px 22px 28px;
  background: rgba(10, 26, 46, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 3px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${fadeIn} 0.5s ease forwards;

  &::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 3px;
    background: ${({ $color }) => $color || '#22d3ee'};
    border-radius: 3px 0 0 3px;
  }

  &:hover {
    border-color: ${({ $color }) => $color ? `${$color}40` : 'rgba(34,211,238,0.25)'};
    box-shadow: 0 8px 32px ${({ $color }) => $color ? `${$color}18` : 'rgba(34,211,238,0.1)'};
    transform: translateY(-4px);
    background: rgba(10, 26, 46, 0.9);
  }
`;

const EduTopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const EduIconBox = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${({ $color }) => $color ? `${$color}18` : 'rgba(34,211,238,0.12)'};
  border: 1px solid ${({ $color }) => $color ? `${$color}30` : 'rgba(34,211,238,0.2)'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  flex-shrink: 0;
`;

const EduYearBadge = styled.span`
  font-family: 'Space Mono', monospace;
  font-size: 0.65rem;
  color: rgba(255, 255, 255, 0.35);
  letter-spacing: 0.1em;
  padding: 3px 10px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.03);
`;

const EduDegree = styled.h4`
  font-size: 0.95rem;
  font-weight: 700;
  color: white;
  letter-spacing: 0.02em;
  line-height: 1.35;
  margin-bottom: 4px;
`;

const EduSchool = styled.span`
  font-size: 0.82rem;
  font-weight: 600;
  color: ${({ $color }) => $color || '#22d3ee'};
  display: block;
  margin-bottom: 2px;
`;

const EduField = styled.span`
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.3);
  font-family: 'Space Mono', monospace;
  display: block;
`;

const GradeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

const GradeLabel = styled.span`
  font-family: 'Space Mono', monospace;
  font-size: 0.65rem;
  color: rgba(255, 255, 255, 0.3);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  white-space: nowrap;
`;

const GradeBarWrap = styled.div`
  flex: 1;
  height: 4px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 99px;
  overflow: hidden;
`;

const GradeBar = styled.div`
  height: 100%;
  border-radius: 99px;
  background: ${({ $color }) => $color || '#22d3ee'};
  --bar-width: ${({ $pct }) => $pct || '0%'};
  width: var(--bar-width);
  animation: ${fillBar} 1s ease forwards 0.3s;
  width: 0;

  ${EduCard}:hover & {
    box-shadow: 0 0 8px ${({ $color }) => $color || '#22d3ee'};
  }
`;

const GradeValue = styled.span`
  font-family: 'Space Mono', monospace;
  font-size: 0.7rem;
  font-weight: 600;
  color: ${({ $color }) => $color || '#22d3ee'};
  min-width: 36px;
  text-align: right;
`;

// ── Certifications (Redesigned) ───────────────────────────────
const CertGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;

  @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 580px) { grid-template-columns: 1fr; }
`;

const CertCard = styled.div`
  padding: 18px;
  background: rgba(10, 26, 46, 0.7);
  border: 1px solid ${({ $color }) => $color ? `${$color}20` : 'rgba(255,255,255,0.07)'};
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${fadeIn} 0.5s ease forwards;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 2px;
    background: ${({ $color }) => $color || '#22d3ee'};
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    border-color: ${({ $color }) => $color ? `${$color}45` : 'rgba(34,211,238,0.3)'};
    box-shadow: 0 6px 24px ${({ $color }) => $color ? `${$color}14` : 'rgba(34,211,238,0.1)'};
    transform: translateY(-3px);
    background: rgba(10, 26, 46, 0.9);
  }

  &:hover::after { opacity: 1; }
`;

const CertTopRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const CertIconWrap = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 9px;
  background: ${({ $color }) => $color ? `${$color}18` : 'rgba(34,211,238,0.12)'};
  border: 1px solid ${({ $color }) => $color ? `${$color}30` : 'rgba(34,211,238,0.2)'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;
`;

const CertYear = styled.span`
  font-family: 'Space Mono', monospace;
  font-size: 0.65rem;
  color: rgba(255, 255, 255, 0.3);
  letter-spacing: 0.08em;
`;

const CertName = styled.h4`
  font-size: 0.85rem;
  font-weight: 700;
  color: white;
  line-height: 1.4;
`;

const CertIssuer = styled.span`
  font-size: 0.75rem;
  color: ${({ $color }) => $color || '#22d3ee'};
  font-family: 'Space Mono', monospace;
  letter-spacing: 0.04em;
  display: block;
`;

const VerifiedBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-family: 'Space Mono', monospace;
  font-size: 0.6rem;
  letter-spacing: 0.08em;
  padding: 3px 8px;
  border-radius: 20px;
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.25);
  color: #4ade80;
  margin-top: 4px;
  align-self: flex-start;

  &::before {
    content: '✓';
    font-size: 0.65rem;
    font-weight: 800;
  }
`;

const CertLink = styled.a`
  font-family: 'Space Mono', monospace;
  font-size: 0.65rem;
  color: #22d3ee;
  text-decoration: none;
  margin-top: 6px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  opacity: 0.6;
  transition: opacity 0.2s ease;
  letter-spacing: 0.04em;

  &:hover { opacity: 1; }
`;

// ── Empty State ───────────────────────────────────────────────
const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: rgba(255,255,255,0.35);
  p:first-child { font-size: 1rem; color: rgba(255,255,255,0.5); margin-bottom: 6px; }
  p:last-child  { font-size: 0.85rem; }
`;

// ── Skeleton Cards ────────────────────────────────────────────
const EduSkeleton = () => (
  <EduGrid>
    {[...Array(4)].map((_, i) => (
      <EduCard key={i} style={{ pointerEvents: 'none' }}>
        <EduTopRow>
          <SkeletonBlock h="40px" w="40px" style={{ borderRadius: '10px', flexShrink: 0 }} />
          <SkeletonBlock h="22px" w="80px" style={{ borderRadius: '20px' }} />
        </EduTopRow>
        <SkeletonBlock h="15px" w="80%" style={{ marginBottom: 4 }} />
        <SkeletonBlock h="12px" w="60%" style={{ marginBottom: 2 }} />
        <SkeletonBlock h="10px" w="70%" />
        <GradeRow>
          <SkeletonBlock h="10px" w="30px" />
          <SkeletonBlock h="4px" style={{ flex: 1, borderRadius: '99px' }} />
          <SkeletonBlock h="10px" w="36px" />
        </GradeRow>
      </EduCard>
    ))}
  </EduGrid>
);

const CertSkeleton = () => (
  <CertGrid>
    {[...Array(6)].map((_, i) => (
      <CertCard key={i} style={{ pointerEvents: 'none' }}>
        <CertTopRow>
          <SkeletonBlock h="36px" w="36px" style={{ borderRadius: '9px' }} />
          <SkeletonBlock h="10px" w="32px" />
        </CertTopRow>
        <SkeletonBlock h="14px" w="85%" style={{ marginBottom: 2 }} />
        <SkeletonBlock h="11px" w="55%" style={{ marginBottom: 2 }} />
        <SkeletonBlock h="20px" w="70px" style={{ borderRadius: '20px', marginTop: 4 }} />
      </CertCard>
    ))}
  </CertGrid>
);

// ── Date Parsing & Sort ───────────────────────────────────────
const MONTHS = {
  jan:0, feb:1, mar:2, apr:3, may:4, jun:5,
  jul:6, aug:7, sep:8, oct:9, nov:10, dec:11,
};

const parseMonthYear = (str) => {
  if (!str) return null;
  const s = str.trim().toLowerCase();
  if (s === 'present' || s === 'now') return new Date();
  const my = s.match(/^([a-z]{3})\s+(\d{4})$/);
  if (my) { const m = MONTHS[my[1]]; const y = parseInt(my[2], 10); if (m !== undefined && !isNaN(y)) return new Date(y, m, 1); }
  const yo = s.match(/^(\d{4})$/);
  if (yo) return new Date(parseInt(yo[1], 10), 0, 1);
  return null;
};

const parseStartDate = (dateStr) => {
  if (!dateStr) return null;
  const parts = dateStr.split(/\s*[—–\-]|(?:\s+to\s+)/i);
  return parseMonthYear(parts[0]?.trim());
};

const sortExperiences = (list) => {
  if (!list || list.length === 0) return [];
  return [...list].sort((a, b) => {
    if (a.current && !b.current) return -1;
    if (!a.current && b.current) return 1;
    const dA = parseStartDate(a.date), dB = parseStartDate(b.date);
    if (dA && dB) return dB - dA;
    if (dA && !dB) return -1;
    if (!dA && dB) return 1;
    return 0;
  });
};

// ── Grade → percentage helper ─────────────────────────────────
const gradeToPercent = (grade) => {
  if (!grade) return '0%';
  const s = String(grade).toLowerCase().trim();

  // Percentage: "95%" or "95"
  const pctMatch = s.match(/^([\d.]+)\s*%$/);
  if (pctMatch) return `${Math.min(100, parseFloat(pctMatch[1]))}%`;

  // GPA out of 10: "8.8 / 10" or "8.8/10" or just "8.8"
  const gpa10 = s.match(/^([\d.]+)\s*\/\s*10$/);
  if (gpa10) return `${Math.min(100, (parseFloat(gpa10[1]) / 10) * 100)}%`;

  // GPA out of 4: "3.8 / 4" or "3.8/4"
  const gpa4 = s.match(/^([\d.]+)\s*\/\s*4$/);
  if (gpa4) return `${Math.min(100, (parseFloat(gpa4[1]) / 4) * 100)}%`;

  // Raw number: heuristic — ≤ 10 treat as /10, ≤ 4 treat as /4, > 10 as %
  const raw = parseFloat(s);
  if (!isNaN(raw)) {
    if (raw <= 4)  return `${Math.min(100, (raw / 4)  * 100)}%`;
    if (raw <= 10) return `${Math.min(100, (raw / 10) * 100)}%`;
    return `${Math.min(100, raw)}%`;
  }

  // Lettered grades
  const letterMap = { 'a+':100,'a':95,'a-':90,'b+':85,'b':80,'b-':75,'c+':70,'c':65 };
  return `${letterMap[s] ?? 75}%`;
};

// ── Component ────────────────────────────────────────────────
const Experience = () => {
  const [activeTab, setActiveTab] = useState('Experience');

  const { data: expList,  loading: expLoading  } = useFirebase('experiences');
  const { data: eduList,  loading: eduLoading  } = useFirebase('education');
  const { data: certList, loading: certLoading } = useFirebase('certifications');

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
            <Tab key={t} $active={activeTab === t ? 1 : 0} onClick={() => setActiveTab(t)}>
              {t}
            </Tab>
          ))}
        </TabRow>

        {/* ── Experience ── */}
        {activeTab === 'Experience' && (
          expLoading ? (
            <TimelineWrap>
              <TimelineLine />
              {[...Array(3)].map((_, i) => (
                <TimelineItem key={i}>
                  <DotWrap><Dot /></DotWrap>
                  <ExpCard style={{ pointerEvents: 'none' }}>
                    <CardTop>
                      <SkeletonBlock h="18px" w="45%" />
                      <SkeletonBlock h="24px" w="110px" style={{ borderRadius: '20px' }} />
                    </CardTop>
                    <SkeletonBlock h="14px" w="30%" style={{ marginBottom: 12 }} />
                    <SkeletonBlock h="12px" style={{ marginBottom: 6 }} />
                    <SkeletonBlock h="12px" w="80%" style={{ marginBottom: 6 }} />
                    <SkeletonBlock h="12px" w="60%" />
                  </ExpCard>
                </TimelineItem>
              ))}
            </TimelineWrap>
          ) : sortedExperiences.length > 0 ? (
            <TimelineWrap>
              <TimelineLine />
              {sortedExperiences.map((exp, i) => (
                <TimelineItem key={exp.id || i}>
                  <DotWrap><Dot $current={exp.current ? 1 : 0} /></DotWrap>
                  <ExpCard $current={exp.current ? 1 : 0}>
                    <CardTop>
                      <Role>{exp.role}</Role>
                      {exp.date && <DateBadge>{exp.date}</DateBadge>}
                    </CardTop>
                    <Company>
                      <CompanyName $current={exp.current}>{exp.company}</CompanyName>
                      {exp.type    && <CompanyType>· {exp.type}</CompanyType>}
                      {exp.current && <CurrentBadge>Current</CurrentBadge>}
                    </Company>
                    {exp.desc && <Desc>{exp.desc}</Desc>}
                    {Array.isArray(exp.tags) && exp.tags.length > 0 && (
                      <TagRow>{exp.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}</TagRow>
                    )}
                  </ExpCard>
                </TimelineItem>
              ))}
            </TimelineWrap>
          ) : (
            <EmptyState>
              <p>No experience data yet.</p>
              <p>Add entries from the admin panel.</p>
            </EmptyState>
          )
        )}

        {/* ── Education ── */}
        {activeTab === 'Education' && (
          eduLoading ? <EduSkeleton /> :
          eduList && eduList.length > 0 ? (
            <EduGrid>
              {eduList.map((edu, i) => (
                <EduCard key={edu.id || i} $color={edu.color}>
                  <EduTopRow>
                    <EduIconBox $color={edu.color}>
                      {edu.icon || '🎓'}
                    </EduIconBox>
                    {edu.year && <EduYearBadge>{edu.year}</EduYearBadge>}
                  </EduTopRow>

                  <EduDegree>{edu.degree}</EduDegree>
                  <EduSchool $color={edu.color}>{edu.school}</EduSchool>
                  {edu.field && <EduField>{edu.field}</EduField>}

                  {edu.grade && (
                    <GradeRow>
                      <GradeLabel>Score</GradeLabel>
                      <GradeBarWrap>
                        <GradeBar $pct={gradeToPercent(edu.grade)} $color={edu.color} />
                      </GradeBarWrap>
                      <GradeValue $color={edu.color}>{edu.grade}</GradeValue>
                    </GradeRow>
                  )}
                </EduCard>
              ))}
            </EduGrid>
          ) : (
            <EmptyState>
              <p>No education data yet.</p>
              <p>Add entries from the admin panel.</p>
            </EmptyState>
          )
        )}

        {/* ── Certifications ── */}
        {activeTab === 'Certifications' && (
          certLoading ? <CertSkeleton /> :
          certList && certList.length > 0 ? (
            <CertGrid>
              {certList.map((cert, i) => (
                <CertCard key={cert.id || i} $color={cert.color}>
                  <CertTopRow>
                    <CertIconWrap $color={cert.color}>
                      {cert.icon || '🏆'}
                    </CertIconWrap>
                    {cert.year && <CertYear>{cert.year}</CertYear>}
                  </CertTopRow>

                  <CertName>{cert.name}</CertName>
                  <CertIssuer $color={cert.color}>{cert.issuer}</CertIssuer>
                  <VerifiedBadge>Verified</VerifiedBadge>

                  {cert.link && (
                    <CertLink href={cert.link} target="_blank" rel="noopener noreferrer">
                      View credential →
                    </CertLink>
                  )}
                </CertCard>
              ))}
            </CertGrid>
          ) : (
            <EmptyState>
              <p>No certifications yet.</p>
              <p>Add entries from the admin panel.</p>
            </EmptyState>
          )
        )}

      </Inner>
    </ExperienceContainer>
  );
};

export default Experience;