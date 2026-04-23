import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { handleLinkClickAnalytics } from "../Services/ManageData";

// ── Animations ──────────────────────────────────────────────
const fadeDown = keyframes`
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
`;

// ── Container ────────────────────────────────────────────────
const Container = styled.nav`
  position: fixed;
  top: ${({ $scrolled }) => $scrolled ? '10px' : '20px'};
  left: 50%;
  transform: translateX(-50%);
  width: ${({ $scrolled }) => $scrolled ? '88%' : '92%'};
  max-width: 1220px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
  background: ${({ $scrolled }) =>
    $scrolled ? 'rgba(4,13,26,0.88)' : 'rgba(4,13,26,0.32)'};
  padding: ${({ $scrolled }) => $scrolled ? '10px 28px' : '14px 32px'};
  border-radius: 14px;
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid ${({ $scrolled }) =>
    $scrolled ? 'rgba(34,211,238,0.2)' : 'rgba(34,211,238,0.1)'};
  z-index: 1000;
  box-shadow: ${({ $scrolled }) =>
    $scrolled
      ? '0 8px 32px rgba(34,211,238,0.07), 0 4px 12px rgba(0,0,0,0.3)'
      : '0 4px 20px rgba(0,0,0,0.14)'};
  transition: all 0.45s cubic-bezier(0.4,0,0.2,1);

  /* Tablet */
  @media (max-width: 768px) {
    padding: 12px 20px;
    width: 94%;
    top: 10px;
    border-radius: 12px;
  }

  /* Mobile */
  @media (max-width: 480px) {
    padding: 10px 16px;
    width: 96%;
    top: 8px;
    border-radius: 10px;
  }
`;

// ── Logo ─────────────────────────────────────────────────────
const Logo = styled.div`
  font-size: 0.92rem;
  font-weight: 800;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  background: linear-gradient(135deg, #ffffff, #c7d2e8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: 'Sora', sans-serif;
  flex-shrink: 0;
  white-space: nowrap;
  cursor: default;

  @media (max-width: 480px) {
    font-size: 0.78rem;
    letter-spacing: 0.15em;
  }
`;

// ── Divider ───────────────────────────────────────────────────
const Divider = styled.div`
  width: 1px;
  height: 18px;
  background: linear-gradient(180deg,
    rgba(34,211,238,0.05),
    rgba(34,211,238,0.28),
    rgba(34,211,238,0.05));
  margin: 0 18px;
  flex-shrink: 0;

  @media (max-width: 768px) { display: none; }
`;

// ── Desktop Links ─────────────────────────────────────────────
const Links = styled.ul`
  display: flex;
  align-items: center;
  gap: 4px;
  list-style: none;
  margin: 0;
  padding: 0;
  flex: 1;
  justify-content: flex-end;

  @media (max-width: 768px) { display: none; }
`;

const NavLink = styled.a`
  padding: 7px 14px;
  border-radius: 9px;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.28s cubic-bezier(0.4,0,0.2,1);
  color: ${({ $active }) => $active ? '#22d3ee' : 'rgba(255,255,255,0.55)'};
  background: ${({ $active }) => $active ? 'rgba(34,211,238,0.12)' : 'transparent'};
  border: 1px solid ${({ $active }) =>
    $active ? 'rgba(34,211,238,0.3)' : 'rgba(255,255,255,0.07)'};

  ${({ $active }) => $active && `
    box-shadow: 0 4px 14px rgba(34,211,238,0.12);
  `}

  &:hover {
    color: #22d3ee;
    background: rgba(34,211,238,0.14);
    border-color: rgba(34,211,238,0.38);
    transform: translateY(-2px);
  }

  /* Medium screens — shrink padding */
  @media (max-width: 1024px) {
    padding: 6px 10px;
    font-size: 0.68rem;
    letter-spacing: 0.08em;
  }
`;

// ── Hamburger ─────────────────────────────────────────────────
const Hamburger = styled.button`
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 36px;
  height: 36px;
  background: rgba(34,211,238,0.07);
  border: 1px solid rgba(34,211,238,0.18);
  border-radius: 9px;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.25s ease;

  &:hover {
    background: rgba(34,211,238,0.14);
    border-color: rgba(34,211,238,0.38);
  }

  @media (max-width: 768px) { display: flex; }
`;

const Bar = styled.span`
  display: block;
  width: 17px;
  height: 2px;
  background: #22d3ee;
  border-radius: 2px;
  transition: all 0.28s cubic-bezier(0.4,0,0.2,1);
  transform-origin: center;

  &:nth-child(1) {
    transform: ${({ $open }) => $open ? 'translateY(7px) rotate(45deg)' : 'none'};
  }
  &:nth-child(2) {
    opacity: ${({ $open }) => $open ? 0 : 1};
    transform: ${({ $open }) => $open ? 'scaleX(0)' : 'none'};
  }
  &:nth-child(3) {
    transform: ${({ $open }) => $open ? 'translateY(-7px) rotate(-45deg)' : 'none'};
  }
`;

// ── Mobile Menu ───────────────────────────────────────────────
const MobileMenu = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: ${({ $open }) => $open ? 'flex' : 'none'};
    flex-direction: column;
    gap: 5px;
    width: 100%;
    flex-basis: 100%;
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid rgba(34,211,238,0.12);
    animation: ${fadeDown} 0.22s ease forwards;
  }
`;

const MobileLink = styled.a`
  padding: 11px 14px;
  border-radius: 9px;
  font-size: 0.76rem;
  font-weight: 600;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4,0,0.2,1);
  color: ${({ $active }) => $active ? '#22d3ee' : 'rgba(255,255,255,0.5)'};
  background: ${({ $active }) => $active ? 'rgba(34,211,238,0.1)' : 'transparent'};
  border: 1px solid ${({ $active }) =>
    $active ? 'rgba(34,211,238,0.28)' : 'rgba(255,255,255,0.06)'};

  &:hover {
    color: #22d3ee;
    background: rgba(34,211,238,0.1);
    border-color: rgba(34,211,238,0.28);
    transform: translateX(4px);
  }

  @media (max-width: 480px) {
    padding: 10px 12px;
    font-size: 0.72rem;
  }
`;

// ── Data ─────────────────────────────────────────────────────
const LINKS = ['Home', 'About', 'Projects', 'Skills', 'Experience', 'Contact'];

// ── Component ─────────────────────────────────────────────────
const Navbar = () => {
  const [active,   setActive]   = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      if (menuOpen) setMenuOpen(false);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [menuOpen]);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const onOutside = (e) => {
      if (!e.target.closest('nav')) setMenuOpen(false);
    };
    document.addEventListener('mousedown', onOutside);
    return () => document.removeEventListener('mousedown', onOutside);
  }, [menuOpen]);

  // Intersection Observer for active section
  useEffect(() => {
    const observers = [];
    LINKS.forEach(link => {
      const section = document.getElementById(link.toLowerCase());
      if (!section) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(link.toLowerCase()); },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      );
      obs.observe(section);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  const handleClick = (link) => {
    setActive(link.toLowerCase());
    setMenuOpen(false);
    handleLinkClickAnalytics(link);
  };

  return (
    <Container $scrolled={scrolled ? 1 : 0}>

      {/* Logo */}
      <Logo>Darshan Walhe</Logo>

      {/* Desktop: divider + links */}
      <Divider />
      <Links>
        {LINKS.map(link => (
          <li key={link}>
            <NavLink
              href={`#${link.toLowerCase()}`}
              $active={active === link.toLowerCase() ? 1 : 0}
              onClick={() => handleClick(link)}
            >
              {link}
            </NavLink>
          </li>
        ))}
      </Links>

      {/* Mobile: hamburger */}
      <Hamburger
        onClick={() => setMenuOpen(o => !o)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
      >
        <Bar $open={menuOpen ? 1 : 0} />
        <Bar $open={menuOpen ? 1 : 0} />
        <Bar $open={menuOpen ? 1 : 0} />
      </Hamburger>

      {/* Mobile dropdown */}
      <MobileMenu $open={menuOpen ? 1 : 0}>
        {LINKS.map(link => (
          <MobileLink
            key={link}
            href={`#${link.toLowerCase()}`}
            $active={active === link.toLowerCase() ? 1 : 0}
            onClick={() => handleClick(link)}
          >
            {link}
          </MobileLink>
        ))}
      </MobileMenu>

    </Container>
  );
};

export default Navbar;