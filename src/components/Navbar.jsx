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
  top: ${({ scrolled }) => scrolled ? '10px' : '20px'};
  left: 50%;
  transform: translateX(-50%);
  width: ${({ scrolled }) => scrolled ? '85%' : '90%'};
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ scrolled }) =>
    scrolled ? 'rgba(4, 13, 26, 0.92)' : 'rgba(56, 63, 81, 0.45)'};
  padding: ${({ scrolled }) => scrolled ? '10px 28px' : '14px 32px'};
  border-radius: 16px;
  color: white;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid ${({ scrolled }) =>
    scrolled ? 'rgba(34, 211, 238, 0.15)' : 'rgba(255, 255, 255, 0.1)'};
  z-index: 1000;
  box-shadow: ${({ scrolled }) =>
    scrolled ? '0 8px 32px rgba(0, 0, 0, 0.4)' : 'none'};
  transition: all 0.4s ease;

  @media (max-width: 768px) {
    padding: 12px 20px;
    width: 92%;
    top: 12px;
    flex-wrap: wrap;
  }
`;

const Logo = styled.div`
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: white;
  white-space: nowrap;

  @media (max-width: 480px) {
    font-size: 0.85rem;
    letter-spacing: 0.2em;
  }
`;

const Divider = styled.div`
  width: 1px;
  height: 18px;
  background: rgba(255, 255, 255, 0.2);
  margin: 0 16px;
  flex-shrink: 0;

  /* Hide on mobile — replaced by hamburger */
  @media (max-width: 768px) {
    display: none;
  }
`;

const Links = styled.ul`
  display: flex;
  align-items: center;
  gap: 4px;
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
  padding: 6px 14px;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-decoration: none;
  white-space: nowrap;
  transition: all 0.3s ease;
  color: ${({ active }) => active ? '#22d3ee' : '#9ca3af'};
  background: ${({ active }) => active ? 'rgba(34,211,238,0.1)' : 'transparent'};
  border: 1px solid ${({ active }) =>
    active ? 'rgba(34,211,238,0.25)' : 'transparent'};

  &:hover {
    color: white;
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.1);
  }
`;

// ── Hamburger ────────────────────────────────────────────────
const Hamburger = styled.button`
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 36px;
  height: 36px;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px;
  cursor: pointer;
  padding: 6px;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(34,211,238,0.4);
    background: rgba(34,211,238,0.06);
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

const Bar = styled.span`
  display: block;
  width: 18px;
  height: 2px;
  background: white;
  border-radius: 2px;
  transition: all 0.3s ease;

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
    gap: 4px;
    width: 100%;
    padding-top: 12px;
    margin-top: 12px;
    border-top: 1px solid rgba(255,255,255,0.08);
    animation: ${fadeDown} 0.25s ease forwards;
  }
`;

const MobileLink = styled.a`
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-decoration: none;
  transition: all 0.2s ease;
  color: ${({ active }) => active ? '#22d3ee' : 'rgba(255,255,255,0.6)'};
  background: ${({ active }) => active ? 'rgba(34,211,238,0.08)' : 'transparent'};
  border: 1px solid ${({ active }) =>
    active ? 'rgba(34,211,238,0.2)' : 'transparent'};

  &:hover {
    color: white;
    background: rgba(255,255,255,0.06);
    border-color: rgba(255,255,255,0.1);
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