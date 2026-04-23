import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { getProfileImage } from "../../Services/Api";
import { HeroEventTracker } from '../../Services/ManageData';

// ── Animations ──────────────────────────────────────────────
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
`;

const rotateSlow = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

// ── Styled Components ────────────────────────────────────────
const HeroSection = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  background-image: url('/background.png');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  scroll-margin-top: 80px;
  padding: 100px 24px 60px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 35%;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(4, 13, 26, 0.6) 50%,
      rgba(4, 13, 26, 0.9) 75%,
      #040d1a 100%
    );
    pointer-events: none;
  }
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 60px;
  z-index: 2;
  max-width: 1100px;
  width: 100%;
  animation: ${fadeInUp} 0.8s ease forwards;

  /* Tablet */
  @media (max-width: 900px) {
    flex-direction: column;
    text-align: center;
    gap: 40px;
  }

  /* Mobile */
  @media (max-width: 480px) {
    gap: 32px;
  }
`;

// ── Avatar ───────────────────────────────────────────────────
const AvatarWrapper = styled.div`
  position: relative;
  width: 280px;
  height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  @media (max-width: 900px) {
    width: 220px;
    height: 220px;
  }

  @media (max-width: 480px) {
    width: 180px;
    height: 180px;
  }
`;

const Ring = styled.div`
  position: absolute;
  border-radius: 50%;
  border: 1.5px solid;
  animation: ${rotateSlow} ${({ duration }) => duration || '12s'} linear infinite;
  animation-direction: ${({ reverse }) => reverse ? 'reverse' : 'normal'};
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-color: ${({ color }) => color || 'rgba(0, 212, 255, 0.3)'};

  @media (max-width: 900px) {
    width: ${({ sizeMd }) => sizeMd || '100%'};
    height: ${({ sizeMd }) => sizeMd || '100%'};
  }

  @media (max-width: 480px) {
    width: ${({ sizeSm }) => sizeSm || '100%'};
    height: ${({ sizeSm }) => sizeSm || '100%'};
  }
`;

const CircleImage = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, rgba(0,212,255,0.15), rgba(123,47,255,0.2), rgba(4,13,26,0.95));
  border: 2px solid rgba(34, 211, 238, 0.4);
  box-shadow: 0 0 60px rgba(34, 211, 238, 0.25), 
              0 8px 32px rgba(0, 0, 0, 0.4),
              inset 0 0 40px rgba(34, 211, 238, 0.1);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover {
    box-shadow: 0 0 80px rgba(34, 211, 238, 0.35),
                0 12px 48px rgba(0, 0, 0, 0.5),
                inset 0 0 60px rgba(34, 211, 238, 0.15);
    border-color: rgba(34, 211, 238, 0.6);
  }

  @media (max-width: 900px) {
    width: 170px;
    height: 170px;
  }

  @media (max-width: 480px) {
    width: 140px;
    height: 140px;
  }
`;

// ── Text ─────────────────────────────────────────────────────
const TextAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;

  @media (max-width: 900px) {
    align-items: center;
  }
`;

const Greeting = styled.p`
  font-size: 0.9rem;
  color: #22d3ee;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  font-family: 'Space Mono', monospace;

  @media (max-width: 480px) {
    font-size: 0.75rem;
    letter-spacing: 0.2em;
  }
`;

const NameHeading = styled.h1`
  font-size: clamp(2.8rem, 7vw, 5.5rem);
  font-weight: 900;
  line-height: 1;
  letter-spacing: 0.05em;
  color: white;

  span {
    background: linear-gradient(135deg, #22d3ee, #7b2fff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (max-width: 480px) {
    font-size: clamp(2.2rem, 10vw, 3rem);
  }
`;

const Tagline = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 400;
  letter-spacing: 0.05em;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const StatsRow = styled.div`
  display: flex;
  gap: 32px;
  margin-top: 4px;

  @media (max-width: 900px) {
    justify-content: center;
  }

  @media (max-width: 480px) {
    gap: 20px;
  }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const StatNum = styled.span`
  font-size: 1.8rem;
  font-weight: 900;
  color: #22d3ee;
  text-shadow: 0 0 20px rgba(34, 211, 238, 0.4);
  line-height: 1;
  font-family: 'Space Mono', monospace;

  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
`;

const StatLabel = styled.span`
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 8px;
  flex-wrap: wrap;

  @media (max-width: 900px) {
    justify-content: center;
  }

  @media (max-width: 480px) {
    gap: 12px;
  }
`;

const PrimaryBtn = styled.a`
  padding: 14px 32px;
  background: transparent;
  border: 1.5px solid rgba(255, 255, 255, 0.4);
  border-radius: 12px;
  color: white;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  letter-spacing: 0.08em;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.08);
    transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: -1;
  }

  &:hover {
    border-color: rgba(255, 255, 255, 0.8);
    background: rgba(255, 255, 255, 0.06);
    box-shadow: 0 8px 24px rgba(255, 255, 255, 0.12);
    transform: translateY(-2px);
  }

  &:hover::before {
    left: 100%;
  }

  @media (max-width: 480px) {
    padding: 12px 26px;
    font-size: 0.85rem;
  }
`;

const SecondaryBtn = styled.a`
  padding: 14px 32px;
  background: linear-gradient(135deg, rgba(34,211,238,0.2), rgba(123,47,255,0.3));
  border: 1.5px solid rgba(34, 211, 238, 0.4);
  border-radius: 12px;
  color: white;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  letter-spacing: 0.08em;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  position: relative;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: 0 4px 16px rgba(34, 211, 238, 0.1);

  &:hover {
    background: linear-gradient(135deg, rgba(34,211,238,0.35), rgba(123,47,255,0.45));
    border-color: rgba(34, 211, 238, 0.6);
    box-shadow: 0 8px 32px rgba(34, 211, 238, 0.25);
    transform: translateY(-2px);
  }

  @media (max-width: 480px) {
    padding: 12px 26px;
    font-size: 0.85rem;
  }



`;

// ── Scroll Hint ───────────────────────────────────────────────
const ScrollHint = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  z-index: 2;
  color: rgba(255,255,255,0.3);
  font-size: 0.7rem;
  font-family: 'Space Mono', monospace;
  letter-spacing: 0.15em;
  text-transform: uppercase;

  @media (max-width: 480px) {
    display: none;
  }
`;

const ScrollDot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #22d3ee;
  box-shadow: 0 0 8px #22d3ee;
  animation: ${float} 2s ease-in-out infinite;
`;

// ── Component ────────────────────────────────────────────────
const Hero = () => {
  const [profileImage, setProfileImage] = useState('/4.jpeg');

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const imageUrl = await getProfileImage();
        if (imageUrl) {
          setProfileImage(imageUrl);
        }
      } catch (error) {
        console.error('Error fetching profile image:', error);
        // Keep using the default image
      }
    };

    fetchProfileImage();

  }, []);

  const trackEvent = (section) => {
    HeroEventTracker(section);
  };

  return (
    <HeroSection id="home">
      <SubContainer>

        {/* Avatar */}
        <AvatarWrapper>
          <Ring
            size="360px" sizeMd="290px" sizeSm="175px"
            duration="20s" color="rgba(0,212,255,0.15)"
          />
          <Ring
            size="315px" sizeMd="185px" sizeSm="155px"
            duration="15s" color="rgba(123,47,255,0.25)" reverse
          />
          <CircleImage>
            <img src={profileImage} alt="Darshan" />
          </CircleImage>
        </AvatarWrapper>

        {/* Text */}
        <TextAreaContainer>
          <Greeting>Hello, I'm</Greeting>
          <NameHeading>
            DARSHAN<br />
            <span>WALHE</span>
          </NameHeading>
          <Tagline>Crafting Modern Digital Experiences</Tagline>

          {/* Stats
          <StatsRow>
            {[['5+', 'Years Exp'], ['50+', 'Projects'], ['20+', 'Clients']].map(([num, label]) => (
              <StatItem key={label}>
                <StatNum>{num}</StatNum>
                <StatLabel>{label}</StatLabel>
              </StatItem>
            ))}
          </StatsRow> */}

          <ButtonRow>
            <PrimaryBtn href="#projects" onClick={() => trackEvent('projects')}>View Projects</PrimaryBtn>
            <SecondaryBtn href="#contact" onClick={() => trackEvent('contact')}>Contact Me</SecondaryBtn>
          </ButtonRow>
        </TextAreaContainer>

      </SubContainer>

      {/* Scroll hint */}
      <ScrollHint>
        <ScrollDot />
        <span>Scroll</span>
      </ScrollHint>

    </HeroSection>
  );
};

export default Hero;