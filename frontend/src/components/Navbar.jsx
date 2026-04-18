import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

// ── Animations ──────────────────────────────────────────────
const fadeDown = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to   { opacity: 1; transform: translateY(0); }
`;

// ── Styled Components ────────────────────────────────────────
const Container = styled.nav`
  position: fixed;
  top: ${({ scrolled }) => scrolled ? '12px' : '24px'};
  left: 50%;
  transform: translateX(-50%);
  width: ${({ scrolled }) => scrolled ? '87%' : '91%'};
  max-width: 1220px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ scrolled }) =>
    scrolled 
      ? 'rgba(4, 13, 26, 0.85)' 
      : 'rgba(4, 13, 26, 0.3)'};
  padding: ${({ scrolled }) => scrolled ? '12px 32px' : '16px 36px'};
  border-radius: 16px;
  color: white;
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid ${({ scrolled }) =>
    scrolled 
      ? 'rgba(34, 211, 238, 0.2)' 
      : 'rgba(34, 211, 238, 0.12)'};
  z-index: 1000;
  box-shadow: ${({ scrolled }) =>
    scrolled 
      ? '0 10px 40px rgba(34, 211, 238, 0.08), 0 4px 12px rgba(0, 0, 0, 0.32)' 
      : '0 4px 20px rgba(0, 0, 0, 0.16)'};
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);

  @media (max-width: 768px) {
    padding: 14px 20px;
    width: 93%;
    top: 12px;
    flex-wrap: wrap;
  }
`;

const Logo = styled.div`
  font-size: 0.95rem;
  font-weight: 800;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: white;
  white-space: nowrap;
  background: linear-gradient(135deg, #ffffff, #c7d2e8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: 'Sora', sans-serif;
  flex-shrink: 0;

  @media (max-width: 480px) {
    font-size: 0.85rem;
    letter-spacing: 0.15em;
  }
`;

const Divider = styled.div`
  width: 1px;
  height: 20px;
  background: linear-gradient(180deg, rgba(34, 211, 238, 0.1), rgba(34, 211, 238, 0.3), rgba(34, 211, 238, 0.1));
  margin: 0 20px;
  flex-shrink: 0;

  /* Hide on mobile — replaced by hamburger */
  @media (max-width: 768px) {
    display: none;
  }
`;

const Links = styled.ul`
  display: flex;
  align-items: center;
  gap: 6px;
  list-style: none;
  flex: 1;
  justify-content: flex-end;
  margin: 0;
  padding: 0;

  /* Hide on mobile */
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  padding: 8px 16px;
  border-radius: 10px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-decoration: none;
  white-space: nowrap;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: ${({ active }) => active ? '#22d3ee' : 'rgba(255, 255, 255, 0.6)'};
  background: ${({ active }) => active ? 'rgba(34, 211, 238, 0.12)' : 'transparent'};
  border: 1px solid ${({ active }) =>
    active ? 'rgba(34, 211, 238, 0.3)' : 'rgba(255, 255, 255, 0.08)'};
  position: relative;
  cursor: pointer;

  &:hover {
    color: #22d3ee;
    background: rgba(34, 211, 238, 0.15);
    border-color: rgba(34, 211, 238, 0.4);
    transform: translateY(-2px);
  }

  ${({ active }) => active && `
    box-shadow: 0 4px 16px rgba(34, 211, 238, 0.15), inset 0 0 1px rgba(34, 211, 238, 0.2);
  `}
`;

// ── Hamburger ────────────────────────────────────────────────
const Hamburger = styled.button`
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 38px;
  height: 38px;
  background: rgba(34, 211, 238, 0.08);
  border: 1px solid rgba(34, 211, 238, 0.2);
  border-radius: 10px;
  cursor: pointer;
  padding: 6px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    border-color: rgba(34, 211, 238, 0.4);
    background: rgba(34, 211, 238, 0.15);
    box-shadow: 0 4px 12px rgba(34, 211, 238, 0.1);
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

const Bar = styled.span`
  display: block;
  width: 18px;
  height: 2px;
  background: #22d3ee;
  border-radius: 2px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  /* Animate to X when open */
  &:nth-child(1) {
    transform: ${({ open }) => open ? 'translateY(7px) rotate(45deg)' : 'none'};
  }
  &:nth-child(2) {
    opacity: ${({ open }) => open ? 0 : 1};
    transform: ${({ open }) => open ? 'scaleX(0)' : 'none'};
  }
  &:nth-child(3) {
    transform: ${({ open }) => open ? 'translateY(-7px) rotate(-45deg)' : 'none'};
  }
`;

// ── Mobile Dropdown Menu ─────────────────────────────────────
const MobileMenu = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: ${({ open }) => open ? 'flex' : 'none'};
    flex-direction: column;
    gap: 6px;
    width: 100%;
    padding-top: 14px;
    margin-top: 14px;
    border-top: 1px solid rgba(34, 211, 238, 0.15);
    animation: ${fadeDown} 0.25s ease forwards;
  }
`;

const MobileLink = styled.a`
  padding: 12px 14px;
  border-radius: 10px;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: ${({ active }) => active ? '#22d3ee' : 'rgba(255, 255, 255, 0.55)'};
  background: ${({ active }) => active ? 'rgba(34, 211, 238, 0.12)' : 'transparent'};
  border: 1px solid ${({ active }) =>
    active ? 'rgba(34, 211, 238, 0.3)' : 'rgba(255, 255, 255, 0.08)'};
  cursor: pointer;

  &:hover {
    color: #22d3ee;
    background: rgba(34, 211, 238, 0.12);
    border-color: rgba(34, 211, 238, 0.3);
    transform: translateX(4px);
  }
`;

// ── Data ─────────────────────────────────────────────────────
const links = ['Home', 'About', 'Projects', 'Skills', 'Experience', 'Contact'];

// ── Component ────────────────────────────────────────────────
const Navbar = () => {
  const [active, setActive]   = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // ── Scroll detection ──────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      if (menuOpen) setMenuOpen(false); // close menu on scroll
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuOpen]);

  // ── Intersection Observer ─────────────────────────────────
  useEffect(() => {
    const observers = [];

    links.forEach(link => {
      const section = document.getElementById(link.toLowerCase());
      if (!section) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(link.toLowerCase());
        },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      );

      observer.observe(section);
      observers.push(observer);
    });

    return () => observers.forEach(obs => obs.disconnect());
  }, []);

  const handleLinkClick = (link) => {
    setActive(link.toLowerCase());
    setMenuOpen(false); // close mobile menu on link click
  };

  return (
    <Container scrolled={scrolled ? 1 : 0}>

      {/* Logo */}
      <Logo>Darshan Walhe</Logo>

      {/* Desktop divider + links */}
      <Divider />
      <Links>
        {links.map(link => (
          <li key={link}>
            <NavLink
              href={`#${link.toLowerCase()}`}
              active={active === link.toLowerCase() ? 1 : 0}
              onClick={() => handleLinkClick(link)}
            >
              {link}
            </NavLink>
          </li>
        ))}
      </Links>

      {/* Hamburger button — mobile only */}
      <Hamburger onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
        <Bar open={menuOpen ? 1 : 0} />
        <Bar open={menuOpen ? 1 : 0} />
        <Bar open={menuOpen ? 1 : 0} />
      </Hamburger>

      {/* Mobile dropdown */}
      <MobileMenu open={menuOpen ? 1 : 0}>
        {links.map(link => (
          <MobileLink
            key={link}
            href={`#${link.toLowerCase()}`}
            active={active === link.toLowerCase() ? 1 : 0}
            onClick={() => handleLinkClick(link)}
          >
            {link}
          </MobileLink>
        ))}
      </MobileMenu>

    </Container>
  );
};

export default Navbar;