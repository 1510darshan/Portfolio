import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Menu, X, Code, ChevronDown } from 'lucide-react';
import scrollToSection from '../Scroll';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Handle scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
      
      // Get all sections and determine which one is in view
      const sections = ['home', 'specialities', 'projects', 'about', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };



  return (
    <Header isScrolled={isScrolled}>
      <Container>
        {/* Logo */}
        <LogoContainer>
          <LogoCircle>
            <LogoImage src="/assets/icon.jpg" alt="Logo" />
            <LogoGlow />
          </LogoCircle>
          <LogoContent>
            <LogoText>DevDarsh</LogoText>
            {/* <LogoTagline>Full Stack Developer</LogoTagline> */}
          </LogoContent>
        </LogoContainer>

        {/* Desktop Navigation */}
        <Navigation>
          <NavItem isActive={activeSection === 'home'}>
            <NavLink onClick={() => scrollToSection('home')}>Home</NavLink>
          </NavItem>
          <NavItem isActive={activeSection === 'specialities'}>
            <NavLink onClick={() => scrollToSection('specialities')}>Specialities</NavLink>
          </NavItem>
          <NavItem isActive={activeSection === 'projects'}>
            <NavLink onClick={() => scrollToSection('projects')}>Projects</NavLink>
          </NavItem>
          <NavItem isActive={activeSection === 'about'}>
            <NavLink onClick={() => scrollToSection('about')}>About</NavLink>
          </NavItem>
          <NavItem isActive={activeSection === 'contact'}>
            <NavLink onClick={() => scrollToSection('contact')}>Contact</NavLink>
          </NavItem>
        </Navigation>

        {/* Call to Action Button */}
        <ActionButtonWrapper>
          <IconWrapper>
            <Code size={16} />
          </IconWrapper>
          <GradientButton>
            Discuss Projects
            <ButtonGlow />
          </GradientButton>
        </ActionButtonWrapper>

        {/* Mobile Menu Button */}
        <MobileMenuButton onClick={toggleMenu} isOpen={isMenuOpen}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </MobileMenuButton>
      </Container>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMenuOpen}>
        <MobileMenuContainer>
          <MobileNavItem isActive={activeSection === 'home'}>
            <MobileNavLink onClick={() => scrollToSection('home')}>
              Home
            </MobileNavLink>
          </MobileNavItem>
          <MobileNavItem isActive={activeSection === 'specialities'}>
            <MobileNavLink onClick={() => scrollToSection('specialities')}>
              Specialities
            </MobileNavLink>
          </MobileNavItem>
          <MobileNavItem isActive={activeSection === 'projects'}>
            <MobileNavLink onClick={() => scrollToSection('projects')}>
              Projects
            </MobileNavLink>
          </MobileNavItem>
          <MobileNavItem isActive={activeSection === 'about'}>
            <MobileNavLink onClick={() => scrollToSection('about')}>
              About
            </MobileNavLink>
          </MobileNavItem>
          <MobileNavItem isActive={activeSection === 'contact'}>
            <MobileNavLink onClick={() => scrollToSection('contact')}>
              Contact
            </MobileNavLink>
          </MobileNavItem>
          <MobileGradientButton>
            <Code size={16} style={{ marginRight: '8px' }} />
            Discuss Projects
          </MobileGradientButton>
        </MobileMenuContainer>
      </MobileMenu>
    </Header>
  );
};

export default Navbar;

// Animations
const pulse = keyframes`
  0% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 0.9; transform: scale(1.05); }
  100% { opacity: 0.6; transform: scale(1); }
`;

const float = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
  100% { transform: translateY(0); }
`;

const shine = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

// Styled Components
const Header = styled.header`
  background-color: ${props => props.isScrolled ? 'rgba(15, 23, 42, 0.95)' : 'rgba(15, 23, 42, 0.7)'};
  backdrop-filter: blur(10px);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  border-bottom: 1px solid rgba(59, 130, 246, 0.1);
  transition: all 0.3s ease;
  box-shadow: ${props => props.isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.2)' : 'none'};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  position: relative;
  z-index: 5;
`;

const LogoCircle = styled.div`
  height: 58px;
  width: 58px;
  border-radius: 12px;
  background: rgba(30, 41, 59, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  border: 2px solid rgba(59, 130, 246, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    border-color: rgba(59, 130, 246, 0.5);
  }
`;

const LogoGlow = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle,
    rgba(59, 130, 246, 0.2) 0%,
    rgba(168, 85, 247, 0.1) 50%,
    transparent 70%
  );
  filter: blur(8px);
  animation: ${pulse} 4s ease-in-out infinite;
`;

const LogoImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const LogoContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const LogoText = styled.span`
  color: #f1f5f9;
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.2;
  background: linear-gradient(90deg, #f1f5f9, #a855f7);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  
  @media (min-width: 640px) {
    font-size: 1.5rem;
  }
`;

const LogoTagline = styled.span`
  color: #94a3b8;
  font-size: 0.75rem;
  font-weight: 500;
  display: none;
  
  @media (min-width: 640px) {
    display: block;
  }
`;

const Navigation = styled.nav`
  display: none;
  align-items: center;
  
  @media (min-width: 860px) {
    display: flex;
    gap: 2rem;
  }
`;

const NavItem = styled.div`
  position: relative;
  padding: 0.5rem 0;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${props => props.isActive ? '100%' : '0'};
    height: 2px;
    background: linear-gradient(90deg, #3b82f6, #a855f7);
    transition: width 0.3s ease;
    border-radius: 2px;
  }
`;

const NavLink = styled.div`
  color: #e2e8f0;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  transition: color 0.3s ease;
  padding: 0.25rem 0;
  cursor: pointer;
  
  &:hover {
    color: #a855f7;
  }
`;

const ActionButtonWrapper = styled.div`
  display: none;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  
  @media (min-width: 860px) {
    display: flex;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: rgba(30, 41, 59, 0.8);
  border-radius: 50%;
  color: #60a5fa;
  transition: all 0.3s ease;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 1px solid rgba(59, 130, 246, 0.3);
    animation: ${pulse} 3s ease-in-out infinite;
  }
  
  &:hover {
    transform: translateY(-2px);
    background: rgba(30, 41, 59, 1);
  }
`;

const GradientButton = styled.button`
  position: relative;
  background: linear-gradient(90deg, #3b82f6, #a855f7);
  color: white;
  padding: 0.5rem 1.2rem;
  border: none;
  font-size: 0.9rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
`;

const ButtonGlow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at center,
    rgba(59, 130, 246, 0.4) 0%,
    transparent 70%
  );
  filter: blur(8px);
  opacity: 0;
  transition: opacity 0.3s ease;
  
  ${GradientButton}:hover & {
    opacity: 1;
  }
`;

const MobileMenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.isOpen ? 'rgba(30, 41, 59, 1)' : 'rgba(30, 41, 59, 0.7)'};
  color: ${props => props.isOpen ? '#a855f7' : '#e2e8f0'};
  border: 1px solid ${props => props.isOpen ? 'rgba(168, 85, 247, 0.3)' : 'rgba(59, 130, 246, 0.2)'};
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(30, 41, 59, 1);
    color: #a855f7;
  }
  
  @media (min-width: 860px) {
    display: none;
  }
`;

const MobileMenu = styled.div`
  display: ${props => props.isOpen ? 'block' : 'none'};
  background-color: rgba(15, 23, 42, 0.98);
  backdrop-filter: blur(10px);
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 40;
  border-bottom: 1px solid rgba(59, 130, 246, 0.1);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  
  @media (min-width: 860px) {
    display: none;
  }
`;

const MobileMenuContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const MobileNavItem = styled.div`
  position: relative;
  border-left: 3px solid ${props => props.isActive ? '#a855f7' : 'transparent'};
  background: ${props => props.isActive ? 'rgba(30, 41, 59, 0.8)' : 'transparent'};
  border-radius: 0 4px 4px 0;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(30, 41, 59, 0.8);
  }
`;

const MobileNavLink = styled.div`
  color: #e2e8f0;
  text-decoration: none;
  font-weight: 500;
  padding: 0.75rem 1rem;
  transition: color 0.3s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  &:hover {
    color: #a855f7;
  }
`;

const MobileGradientButton = styled.button`
  background: linear-gradient(90deg, #3b82f6, #a855f7);
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  width: 100%;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
  }
`;