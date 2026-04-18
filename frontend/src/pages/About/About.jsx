import React from 'react';
import styled, { keyframes } from "styled-components";

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
const AboutContainer = styled.section`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(180deg, #040d1a 0%, #071428 50%, #040d1a 100%); /* ← changed */
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

// Section Header
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

// Content Grid
const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// Left — Bio
const BioBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const BioText = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.55);
  line-height: 1.9;
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 8px;
`;

const Tag = styled.span`
  padding: 8px 18px;
  border: 1px solid rgba(34, 211, 238, 0.25);
  border-radius: 24px;
  font-size: 0.78rem;
  color: #22d3ee;
  letter-spacing: 0.1em;
  font-family: 'Space Mono', monospace;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: transparent;
  cursor: pointer;

  &:hover {
    background: rgba(34, 211, 238, 0.12);
    border-color: rgba(34, 211, 238, 0.5);
    box-shadow: 0 4px 12px rgba(34, 211, 238, 0.15);
    transform: translateY(-2px);
  }
`;

// Right — Cards
const CardsBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Card = styled.div`
  padding: 28px;
  background: rgba(10, 26, 46, 0.6);
  border: 1px solid rgba(34, 211, 238, 0.15);
  border-radius: 14px;
  display: flex;
  gap: 20px;
  align-items: flex-start;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: default;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(34, 211, 238, 0.1), transparent);
    opacity: 0;
    transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: none;
  }

  &:hover {
    border-color: rgba(34, 211, 238, 0.35);
    box-shadow: 0 8px 28px rgba(34, 211, 238, 0.12), 0 4px 12px rgba(0, 0, 0, 0.24);
    transform: translateY(-4px);
    background: rgba(10, 26, 46, 0.8);
  }

  &:hover::before {
    opacity: 1;
  }
`;

const CardIcon = styled.div`
  font-size: 1.4rem;
  color: #22d3ee;
  font-family: 'Space Mono', monospace;
  min-width: 36px;
  margin-top: 2px;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const CardTitle = styled.h3`
  font-size: 0.95rem;
  font-weight: 700;
  color: white;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const CardDesc = styled.p`
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.45);
  line-height: 1.7;
`;

// Stats Row
const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  padding: 32px 24px;
  background: rgba(10, 26, 46, 0.6);
  border: 1px solid rgba(34, 211, 238, 0.15);
  border-radius: 14px;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #22d3ee, transparent);
    opacity: 0;
    transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover {
    border-color: rgba(34, 211, 238, 0.3);
    box-shadow: 0 8px 28px rgba(34, 211, 238, 0.12), 0 4px 12px rgba(0, 0, 0, 0.24);
    transform: translateY(-4px);
    background: rgba(10, 26, 46, 0.8);
  }

  &:hover::before {
    opacity: 1;
  }
`;

const StatNum = styled.div`
  font-size: 2.8rem;
  font-weight: 900;
  color: #22d3ee;
  text-shadow: 0 0 20px rgba(34, 211, 238, 0.3);
  line-height: 1;
  margin-bottom: 10px;
  font-family: 'Space Mono', monospace;
`;

const StatLabel = styled.div`
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.45);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  font-weight: 500;
`;

// ── Data ─────────────────────────────────────────────────────
const cards = [
  {
    icon: '⚡',
    title: 'Problem Solving',
    desc: 'Turning complex challenges into clean, efficient solutions with systematic thinking and attention to detail.',
  },
  {
    icon: '✦',
    title: 'Creativity',
    desc: 'Crafting unique digital experiences that blend aesthetics with functionality seamlessly.',
  },
  {
    icon: '{}',
    title: 'Development',
    desc: 'Building scalable applications with modern tech stacks and industry best practices.',
  },
];

const stats = [
  { num: '3+', label: 'Years Experience' },
  { num: '7+', label: 'Projects Delivered' },
  // { num: '20+', label: 'Happy Clients' },
];

const tags = ['React Expert', 'Full-Stack Dev', 'Java Developer', 'Cyber Enthusiast', 'Open Source'];

// ── Component ────────────────────────────────────────────────
const About = () => {
  return (
    <AboutContainer id="about">
      <Inner>

        {/* Header */}
        <div>
          <SectionTag>// Who Am I</SectionTag>
          <SectionTitle>About <span>Me</span></SectionTitle>
        </div>

        {/* Grid */}
        <ContentGrid>

          {/* Bio */}
          <BioBlock>
            <BioText>
              I'm a passionate full-stack developer with expertise in building scalable
              web applications and immersive digital experiences. I thrive at the
              intersection of design and engineering, turning complex problems into
              elegant solutions.
            </BioText>
            <BioText>
              My journey in tech spans over 5 years, working with startups and enterprise
              clients to deliver products that make a real impact. I specialize in React
              ecosystems, cloud architecture, and performance-driven development.
            </BioText>
            <TagRow>
              {tags.map(t => <Tag key={t}>{t}</Tag>)}
            </TagRow>
          </BioBlock>

          {/* Cards */}
          <CardsBlock>
            {cards.map(card => (
              <Card key={card.title}>
                <CardIcon>{card.icon}</CardIcon>
                <CardContent>
                  <CardTitle>{card.title}</CardTitle>
                  <CardDesc>{card.desc}</CardDesc>
                </CardContent>
              </Card>
            ))}
          </CardsBlock>

        </ContentGrid>

        {/* Stats */}
        <StatsRow>
          {stats.map(s => (
            <StatCard key={s.label}>
              <StatNum>{s.num}</StatNum>
              <StatLabel>{s.label}</StatLabel>
            </StatCard>
          ))}
        </StatsRow>

      </Inner>
    </AboutContainer>
  );
};

export default About;