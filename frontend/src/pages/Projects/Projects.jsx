import React, { useState, useEffect, useMemo, useCallback } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { getAllProjects } from '../../Services/Api';

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
const overlayIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;
const modalIn = keyframes`
  from { opacity: 0; transform: scale(0.92) translateY(24px); }
  to   { opacity: 1; transform: scale(1)    translateY(0); }
`;

// ── Layout ───────────────────────────────────────────────────
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
  gap: 48px;
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

// ── Filter Tabs ──────────────────────────────────────────────
const FilterRow = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const FilterBtn = styled.button`
  padding: 7px 18px;
  border-radius: 10px;
  font-size: 0.72rem;
  font-family: 'Space Mono', monospace;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid ${({ $active }) => $active ? '#22d3ee' : 'rgba(255,255,255,0.12)'};
  background: ${({ $active }) => $active ? 'rgba(34,211,238,0.15)' : 'transparent'};
  color: ${({ $active }) => $active ? '#22d3ee' : 'rgba(255,255,255,0.45)'};
  font-weight: 600;

  &:hover {
    border-color: #22d3ee;
    color: #22d3ee;
    background: rgba(34,211,238,0.1);
    transform: translateY(-1px);
  }
`;

// ── Compact Grid ─────────────────────────────────────────────
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  animation: ${fadeInUp} 0.6s ease forwards;

  @media (max-width: 900px)  { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 520px)  { grid-template-columns: 1fr; }
`;

// ── Compact Card ─────────────────────────────────────────────
const Card = styled.div`
  background: rgba(10, 26, 46, 0.7);
  border: 1px solid ${({ $accent }) => `${$accent}28`};
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, ${({ $accent }) => `${$accent}12`}, transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
    z-index: 0;
  }

  &:hover {
    border-color: ${({ $accent }) => `${$accent}55`};
    box-shadow: 0 8px 28px ${({ $accent }) => `${$accent}18`};
    transform: translateY(-4px);
  }
  &:hover::before { opacity: 1; }
`;

const CardThumb = styled.div`
  position: relative;
  width: 100%;
  height: 165px;
  overflow: hidden;
  background: rgba(4, 13, 26, 0.8);
`;

const CardThumbImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
  ${Card}:hover & { transform: scale(1.06); }
`;

const CardThumbMockup = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
  justify-content: center;
`;

const MLine = styled.div`
  height: 5px;
  border-radius: 3px;
  background: ${({ $accent, $dim }) => $dim ? 'rgba(255,255,255,0.07)' : `${$accent}50`};
  width: ${({ $w }) => $w || '100%'};
`;

const CardBadge = styled.span`
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 0.6rem;
  font-family: 'Space Mono', monospace;
  padding: 3px 8px;
  border-radius: 4px;
  font-weight: 700;
  color: white;
  background: rgba(0,0,0,0.7);
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255,255,255,0.12);
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

const ExpandHint = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 28px;
  background: linear-gradient(to top, ${({ $accent }) => `${$accent}22`}, transparent);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 4px;
  opacity: 0;
  transition: opacity 0.3s ease;
  font-size: 0.6rem;
  font-family: 'Space Mono', monospace;
  color: ${({ $accent }) => $accent};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  ${Card}:hover & { opacity: 1; }
`;

const CardBody = styled.div`
  padding: 16px;
  position: relative;
  z-index: 1;
`;

const CardType = styled.span`
  font-size: 0.65rem;
  font-family: 'Space Mono', monospace;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ $accent }) => $accent};
  display: block;
  margin-bottom: 5px;
`;

const CardName = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: white;
  margin-bottom: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CardDescPreview = styled.p`
  font-size: 0.75rem;
  color: rgba(255,255,255,0.38);
  line-height: 1.5;
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ClickPrompt = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.65rem;
  font-family: 'Space Mono', monospace;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ $accent }) => $accent};
  opacity: 0.7;
  margin-top: 2px;
  transition: opacity 0.2s ease, gap 0.2s ease;
  ${Card}:hover & { opacity: 1; gap: 10px; }

  &::before {
    content: '';
    display: inline-block;
    width: 14px;
    height: 1px;
    background: ${({ $accent }) => $accent};
    transition: width 0.3s ease;
  }
  ${Card}:hover &::before { width: 22px; }
`;

const CardTechRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

const CardTechBadge = styled.span`
  font-size: 0.65rem;
  padding: 3px 9px;
  background: rgba(34,211,238,0.08);
  border: 1px solid rgba(34,211,238,0.18);
  border-radius: 4px;
  color: rgba(255,255,255,0.55);
  font-family: 'Space Mono', monospace;
`;

// ── Modal Overlay ────────────────────────────────────────────
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(2, 8, 18, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: ${overlayIn} 0.25s ease forwards;
`;

const Modal = styled.div`
  background: linear-gradient(145deg, rgba(10, 26, 46, 0.97), rgba(4, 13, 26, 0.97));
  border: 1px solid ${({ $accent }) => `${$accent}35`};
  border-radius: 20px;
  width: 100%;
  max-width: 680px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow:
    0 24px 64px rgba(0,0,0,0.6),
    0 0 0 1px rgba(255,255,255,0.04),
    inset 0 1px 0 rgba(255,255,255,0.06);
  animation: ${modalIn} 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-thumb {
    background: ${({ $accent }) => `${$accent}40`};
    border-radius: 2px;
  }
`;

const ModalImage = styled.div`
  width: 100%;
  height: 260px;
  overflow: hidden;
  border-radius: 20px 20px 0 0;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ModalImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 40%,
    rgba(4, 13, 26, 0.9) 100%
  );
`;

const ModalMockup = styled.div`
  width: 100%;
  height: 200px;
  background: rgba(4, 13, 26, 0.6);
  border-radius: 20px 20px 0 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 24px;
  justify-content: center;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.15);
  color: white;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 10;

  &:hover {
    background: rgba(255,255,255,0.15);
    transform: scale(1.1);
  }
`;

const ModalBody = styled.div`
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const ModalHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const ModalType = styled.span`
  font-size: 0.7rem;
  font-family: 'Space Mono', monospace;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ $accent }) => $accent};
`;

const ModalTitle = styled.h2`
  font-size: 1.6rem;
  font-weight: 800;
  color: white;
  letter-spacing: -0.02em;
`;

const ModalStatusRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ModalStatus = styled.span`
  font-size: 0.68rem;
  font-family: 'Space Mono', monospace;
  padding: 4px 10px;
  border-radius: 5px;
  font-weight: 700;
  color: white;
  background: rgba(0,0,0,0.4);
  border: 1px solid rgba(255,255,255,0.12);
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const Divider = styled.div`
  height: 1px;
  background: linear-gradient(to right, ${({ $accent }) => `${$accent}30`}, transparent);
`;

const ModalDesc = styled.p`
  font-size: 0.9rem;
  color: rgba(255,255,255,0.55);
  line-height: 1.8;
`;

const ModalSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ModalSectionLabel = styled.span`
  font-size: 0.68rem;
  font-family: 'Space Mono', monospace;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.3);
`;

const TechRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
`;

const TechBadge = styled.span`
  font-size: 0.72rem;
  padding: 5px 12px;
  background: rgba(34,211,238,0.1);
  border: 1px solid rgba(34,211,238,0.25);
  border-radius: 6px;
  color: rgba(255,255,255,0.7);
  font-family: 'Space Mono', monospace;
  font-weight: 500;
`;

const BtnRow = styled.div`
  display: flex;
  gap: 10px;
  padding-top: 4px;
`;

const LiveBtn = styled.a`
  flex: 1;
  padding: 11px 20px;
  background: linear-gradient(135deg, ${({ $accent }) => $accent}33, rgba(123,47,255,0.3));
  border: 1px solid ${({ $accent }) => `${$accent}55`};
  border-radius: 10px;
  color: white;
  font-size: 0.78rem;
  font-family: 'Space Mono', monospace;
  font-weight: 600;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  transition: all 0.25s ease;
  letter-spacing: 0.08em;
  text-transform: uppercase;

  &:hover {
    border-color: ${({ $accent }) => `${$accent}88`};
    box-shadow: 0 4px 16px ${({ $accent }) => `${$accent}25`};
    transform: translateY(-2px);
  }
`;

const GhostBtn = styled.a`
  flex: 1;
  padding: 11px 20px;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 10px;
  color: rgba(255,255,255,0.55);
  font-size: 0.78rem;
  font-family: 'Space Mono', monospace;
  font-weight: 600;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  transition: all 0.25s ease;
  letter-spacing: 0.08em;
  text-transform: uppercase;

  &:hover {
    border-color: rgba(255,255,255,0.35);
    color: white;
    background: rgba(255,255,255,0.06);
    transform: translateY(-2px);
  }
`;

// ── Skeleton ─────────────────────────────────────────────────
const SkeletonCard = styled.div`
  background: rgba(10, 26, 46, 0.6);
  border: 1px solid rgba(34,211,238,0.08);
  border-radius: 12px;
  overflow: hidden;
  pointer-events: none;
`;

const SkeletonBlock = styled.div`
  border-radius: 5px;
  background: linear-gradient(
    90deg,
    rgba(255,255,255,0.05) 25%,
    rgba(255,255,255,0.1) 50%,
    rgba(255,255,255,0.05) 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.6s infinite, ${pulse} 2s ease-in-out infinite;
  height: ${({ $h }) => $h || '12px'};
  width: ${({ $w }) => $w || '100%'};
  margin-bottom: ${({ $mb }) => $mb || '0'};
`;

// ── Empty / Error ─────────────────────────────────────────────
const StateBox = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: rgba(255,255,255,0.45);
  p:first-child { font-size: 1.1rem; margin-bottom: 8px; color: rgba(255,255,255,0.65); }
  p:last-child  { font-size: 0.9rem; }
`;

// ── Helpers ───────────────────────────────────────────────────
const categoryMatch = (projectCategory, filter) => {
  if (!projectCategory) return false;
  return projectCategory
    .split(',')
    .map(c => c.trim().toLowerCase())
    .includes(filter.toLowerCase());
};

// ── Component ────────────────────────────────────────────────
const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [projects, setProjects]         = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);
  const [expanded, setExpanded]         = useState(null); // project id

  useEffect(() => {
    getAllProjects()
      .then(data => setProjects(data))
      .catch(err  => setError(err))
      .finally(() => setLoading(false));
  }, []);

  // Close modal on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setExpanded(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Prevent body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = expanded ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [expanded]);

  const filters = useMemo(() => {
    const set = new Set();
    projects.forEach(p => {
      if (p.category) p.category.split(',').forEach(c => { const t = c.trim(); if (t) set.add(t); });
    });
    return ['All', ...Array.from(set).sort()];
  }, [projects]);

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => categoryMatch(p.category, activeFilter));

  const expandedProject = projects.find(p => p.id === expanded);

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
            <FilterBtn key={f} $active={activeFilter === f ? 1 : 0} onClick={() => setActiveFilter(f)}>
              {f}
            </FilterBtn>
          ))}
        </FilterRow>

        {/* Loading */}
        {loading && (
          <Grid>
            {[...Array(8)].map((_, i) => (
              <SkeletonCard key={i}>
                <SkeletonBlock $h="110px" style={{ borderRadius: '0' }} />
                <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <SkeletonBlock $h="8px"  $w="35%" />
                  <SkeletonBlock $h="12px" $w="65%" />
                  <SkeletonBlock $h="8px"  $w="80%" $mb="2px" />
                </div>
              </SkeletonCard>
            ))}
          </Grid>
        )}

        {/* Error */}
        {error && !loading && (
          <StateBox>
            <p>Unable to load projects.</p>
            <p>Please check your connection and try again.</p>
          </StateBox>
        )}

        {/* Grid */}
        {!loading && !error && (
          filtered.length > 0 ? (
            <Grid>
              {filtered.map(p => {
                const accent = p.accent || '#22d3ee';
                return (
                  <Card key={p.id} $accent={accent} onClick={() => setExpanded(p.id)}>
                    <CardThumb>
                      {p.image ? (
                        <CardThumbImg src={p.image} alt={p.name} />
                      ) : (
                        <CardThumbMockup>
                          <MLine $accent={accent} $w="60%" />
                          <MLine $accent={accent} $dim $w="40%" />
                          <MLine $accent={accent} $dim $w="75%" />
                          <MLine $accent={accent} $dim $w="50%" />
                        </CardThumbMockup>
                      )}
                      <CardBadge>{p.status || 'Active'}</CardBadge>
                      <ExpandHint $accent={accent}>click to expand</ExpandHint>
                    </CardThumb>

                    <CardBody>
                      <CardType $accent={accent}>{p.type}</CardType>
                      <CardName>{p.name}</CardName>
                      {p.desc && <CardDescPreview>{p.desc}</CardDescPreview>}
                      {p.tech && p.tech.length > 0 && (
                        <CardTechRow>
                          {p.tech.slice(0, 3).map(t => (
                            <CardTechBadge key={t}>{t}</CardTechBadge>
                          ))}
                          {p.tech.length > 3 && (
                            <CardTechBadge>+{p.tech.length - 3}</CardTechBadge>
                          )}
                        </CardTechRow>
                      )}
                      <ClickPrompt $accent={accent}>View details</ClickPrompt>
                    </CardBody>
                  </Card>
                );
              })}
            </Grid>
          ) : (
            <StateBox>
              <p>No projects found</p>
              <p>Try selecting a different category or check back later.</p>
            </StateBox>
          )
        )}

      </Inner>

      {/* Expanded Modal */}
      {expanded && expandedProject && (() => {
        const p = expandedProject;
        const accent = p.accent || '#22d3ee';
        return (
          <Overlay onClick={() => setExpanded(null)}>
            <Modal $accent={accent} onClick={e => e.stopPropagation()}>
              <CloseBtn onClick={() => setExpanded(null)}>✕</CloseBtn>

              {/* Image / Mockup */}
              {p.image ? (
                <ModalImage>
                  <img src={p.image} alt={p.name} />
                  <ModalImageOverlay />
                </ModalImage>
              ) : (
                <ModalMockup>
                  <MLine $accent={accent} $w="55%" style={{ height: '8px' }} />
                  <MLine $accent={accent} $dim $w="40%" style={{ height: '6px' }} />
                  <MLine $accent={accent} $dim $w="70%" style={{ height: '6px' }} />
                  <MLine $accent={accent} $dim $w="45%" style={{ height: '6px' }} />
                </ModalMockup>
              )}

              <ModalBody>
                <ModalHeader>
                  <ModalType $accent={accent}>{p.type}</ModalType>
                  <ModalTitle>{p.name}</ModalTitle>
                  <ModalStatusRow>
                    <ModalStatus>{p.status || 'Active'}</ModalStatus>
                    {p.category && (
                      <ModalStatus style={{ background: `${accent}18`, borderColor: `${accent}30`, color: accent }}>
                        {p.category}
                      </ModalStatus>
                    )}
                  </ModalStatusRow>
                </ModalHeader>

                <Divider $accent={accent} />

                <ModalDesc>{p.desc}</ModalDesc>

                {p.tech && p.tech.length > 0 && (
                  <ModalSection>
                    <ModalSectionLabel>Tech Stack</ModalSectionLabel>
                    <TechRow>
                      {p.tech.map(t => <TechBadge key={t}>{t}</TechBadge>)}
                    </TechRow>
                  </ModalSection>
                )}

                <BtnRow>
                  {p.live && (
                    <LiveBtn href={p.live} $accent={accent} target="_blank" rel="noopener noreferrer">
                      View Live →
                    </LiveBtn>
                  )}
                  {p.github && (
                    <GhostBtn href={p.github} target="_blank" rel="noopener noreferrer">
                      GitHub ↗
                    </GhostBtn>
                  )}
                </BtnRow>
              </ModalBody>
            </Modal>
          </Overlay>
        );
      })()}

    </ProjectsContainer>
  );
};

export default Projects;