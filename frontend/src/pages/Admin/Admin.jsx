import React, { useState } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { globalCSS } from './managers/Admintheme';

import Dashboard              from './managers/Dashboard';
import ProjectsManager        from './managers/ProjectsManager';
import SkillsManager          from './managers/SkillsManager';
import ExperiencesManager     from './managers/ExperiencesManager';
import EducationManager       from './managers/EducationManager';
import CertificationsManager  from './managers/CertificationsManager';
import AboutManager           from './managers/AboutManager';
import ContactManager         from './managers/ContactManager';
import MessagesManager        from './managers/MessagesManager';

const GlobalStyle = createGlobalStyle`${globalCSS}`;

// ── Animations ─────────────────────────────────────────────────
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const glowPulse = keyframes`
  0%, 100% { opacity: 0.5; }
  50%       { opacity: 1; }
`;

// ── Shell ──────────────────────────────────────────────────────
const Shell = styled.div`
  display: flex;
  min-height: 100vh;
  background: #03080f;
  position: relative;

  &::before {
    content: '';
    position: fixed;
    top: -200px; left: -100px;
    width: 700px; height: 700px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }
  &::after {
    content: '';
    position: fixed;
    bottom: -200px; right: -100px;
    width: 600px; height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }
`;

// ── Sidebar ────────────────────────────────────────────────────
const Sidebar = styled.aside`
  width: 230px;
  flex-shrink: 0;
  height: 100vh;
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  background: rgba(6,13,24,0.95);
  border-right: 1px solid rgba(255,255,255,0.05);
  padding: 28px 16px 24px;
  z-index: 10;
  backdrop-filter: blur(12px);

  @media (max-width: 900px) { display: none; }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 8px 28px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  margin-bottom: 20px;
`;

const LogoMark = styled.div`
  width: 34px; height: 34px;
  border-radius: 9px;
  background: linear-gradient(135deg, #00d4ff, #8b5cf6);
  display: flex; align-items: center; justify-content: center;
  font-size: 0.9rem; font-weight: 800; color: white; flex-shrink: 0;
`;

const LogoText = styled.div`
  .name { font-size: 0.9rem; font-weight: 800; color: white; line-height: 1.1; letter-spacing: -0.02em; }
  .sub  { font-size: 0.65rem; color: rgba(255,255,255,0.3); font-family: 'JetBrains Mono', monospace; letter-spacing: 0.08em; }
`;

const NavGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  flex: 1;
  overflow-y: auto;
  padding-right: 2px;

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 2px; }
`;

const NavLabel = styled.div`
  font-size: 0.6rem; font-weight: 600;
  color: rgba(255,255,255,0.22);
  letter-spacing: 0.14em; text-transform: uppercase;
  font-family: 'JetBrains Mono', monospace;
  padding: 0 10px; margin: 12px 0 6px;
`;

const NavItem = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 9px;
  border: 1px solid ${({ $active }) => $active ? 'rgba(0,212,255,0.2)' : 'transparent'};
  background: ${({ $active }) => $active ? 'rgba(0,212,255,0.1)' : 'transparent'};
  color: ${({ $active }) => $active ? '#00d4ff' : 'rgba(255,255,255,0.45)'};
  font-size: 0.84rem;
  font-weight: ${({ $active }) => $active ? '700' : '500'};
  cursor: pointer;
  transition: all 0.18s ease;
  text-align: left;
  width: 100%;
  position: relative;

  &:hover {
    background: ${({ $active }) => $active ? 'rgba(0,212,255,0.12)' : 'rgba(255,255,255,0.04)'};
    color: ${({ $active }) => $active ? '#00d4ff' : 'rgba(255,255,255,0.7)'};
  }

  .icon  { font-size: 0.95rem; width: 20px; text-align: center; flex-shrink: 0; }

  .badge {
    margin-left: auto;
    padding: 1px 7px;
    border-radius: 10px;
    background: rgba(244,63,94,0.15);
    border: 1px solid rgba(244,63,94,0.25);
    color: #f43f5e;
    font-size: 0.62rem; font-weight: 700;
    font-family: 'JetBrains Mono', monospace;
  }

  ${({ $active }) => $active && `
    &::before {
      content: '';
      position: absolute;
      left: -16px; top: 50%;
      transform: translateY(-50%);
      width: 3px; height: 18px;
      border-radius: 0 2px 2px 0;
      background: linear-gradient(180deg, #00d4ff, #8b5cf6);
    }
  `}
`;

const SidebarBottom = styled.div`
  border-top: 1px solid rgba(255,255,255,0.05);
  padding-top: 16px;
  flex-shrink: 0;
`;

const UserChip = styled.div`
  display: flex; align-items: center; gap: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
`;

const Avatar = styled.div`
  width: 30px; height: 30px; border-radius: 8px;
  background: linear-gradient(135deg, #00d4ff, #8b5cf6);
  display: flex; align-items: center; justify-content: center;
  font-size: 0.75rem; font-weight: 800; color: white; flex-shrink: 0;
`;

const UserInfo = styled.div`
  flex: 1; min-width: 0;
  .name { font-size: 0.8rem; font-weight: 700; color: white; }
  .role { font-size: 0.65rem; color: rgba(255,255,255,0.3); font-family: 'JetBrains Mono', monospace; }
`;

const LogoutBtn = styled.button`
  width: 28px; height: 28px; border-radius: 7px;
  border: 1px solid rgba(244,63,94,0.2);
  background: rgba(244,63,94,0.08);
  color: #f43f5e;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; font-size: 0.9rem; transition: all 0.2s; flex-shrink: 0;
  &:hover { background: rgba(244,63,94,0.18); border-color: rgba(244,63,94,0.4); }
`;

// ── Main ───────────────────────────────────────────────────────
const Main = styled.main`
  flex: 1; min-width: 0;
  display: flex; flex-direction: column;
  position: relative; z-index: 1;
`;

const TopBar = styled.header`
  height: 64px;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 32px;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  background: rgba(3,8,15,0.7);
  backdrop-filter: blur(12px);
  position: sticky; top: 0; z-index: 9; flex-shrink: 0;
`;

const Breadcrumb = styled.div`
  display: flex; align-items: center; gap: 8px;
  font-size: 0.82rem; color: rgba(255,255,255,0.35);
  .sep     { opacity: 0.3; }
  .current { color: white; font-weight: 600; }
`;

const TopBarRight = styled.div`display: flex; align-items: center; gap: 10px;`;

const StatusDot = styled.div`
  display: flex; align-items: center; gap: 6px;
  font-size: 0.72rem; color: rgba(255,255,255,0.3);
  font-family: 'JetBrains Mono', monospace;

  &::before {
    content: '';
    width: 6px; height: 6px; border-radius: 50%;
    background: #10d9a8; box-shadow: 0 0 6px #10d9a8;
    animation: ${glowPulse} 2s infinite;
  }
`;

const MobileLogout = styled.button`
  padding: 7px 14px;
  background: rgba(244,63,94,0.1); border: 1px solid rgba(244,63,94,0.25);
  border-radius: 7px; color: #f43f5e; font-size: 0.78rem; font-weight: 600;
  cursor: pointer; transition: all 0.2s;
  &:hover { background: rgba(244,63,94,0.2); }
`;

const ContentPad = styled.div`
  padding: 32px;
  animation: ${fadeIn} 0.35s ease both;
  @media (max-width: 900px) { padding: 20px; }
`;

// ── Mobile tabs ────────────────────────────────────────────────
const MobileTabs = styled.div`
  display: none;
  overflow-x: auto;
  padding: 0 20px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  background: rgba(6,13,24,0.95);
  &::-webkit-scrollbar { display: none; }
  @media (max-width: 900px) { display: flex; gap: 4px; }
`;

const MobileTab = styled.button`
  padding: 12px 14px;
  border: none;
  border-bottom: 2px solid ${({ $active }) => $active ? '#00d4ff' : 'transparent'};
  background: transparent;
  color: ${({ $active }) => $active ? '#00d4ff' : 'rgba(255,255,255,0.35)'};
  font-size: 0.78rem; font-weight: 600;
  cursor: pointer; white-space: nowrap; transition: color 0.2s;
`;

// ── Tab config ─────────────────────────────────────────────────
const TABS = [
  { id: 'dashboard',       label: 'Dashboard',       icon: '◈', group: 'Overview' },
  { id: 'projects',        label: 'Projects',        icon: '◇', group: 'Content'  },
  { id: 'skills',          label: 'Skills',          icon: '◉', group: 'Content'  },
  { id: 'experiences',     label: 'Experiences',     icon: '◎', group: 'Content'  },
  { id: 'education',       label: 'Education',       icon: '◍', group: 'Content'  },
  { id: 'certifications',  label: 'Certifications',  icon: '◆', group: 'Content'  },
  { id: 'about',           label: 'About',           icon: '◐', group: 'Profile'  },
  { id: 'contact',         label: 'Contact',         icon: '◑', group: 'Profile'  },
  { id: 'messages',        label: 'Messages',        icon: '◻', group: 'Inbox',   badge: true },
];

// ── Component ──────────────────────────────────────────────────
const Admin = ({ onLogout }) => {
  const [activeTab,      setActiveTab]      = useState('dashboard');
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [unread,         setUnread]         = useState(0);

  const triggerRefresh = () => setRefreshTrigger(p => p + 1);
  const active = TABS.find(t => t.id === activeTab);
  const groups = [...new Set(TABS.map(t => t.group))];

  return (
    <>
      <GlobalStyle />
      <Shell>

        {/* ── Sidebar ── */}
        <Sidebar>
          <Logo>
            <LogoMark>A</LogoMark>
            <LogoText>
              <div className="name">Portfolio</div>
              <div className="sub">Admin Panel</div>
            </LogoText>
          </Logo>

          <NavGroup>
            {groups.map(g => (
              <React.Fragment key={g}>
                <NavLabel>{g}</NavLabel>
                {TABS.filter(t => t.group === g).map(t => (
                  <NavItem
                    key={t.id}
                    $active={activeTab === t.id ? 1 : 0}
                    onClick={() => setActiveTab(t.id)}
                  >
                    <span className="icon">{t.icon}</span>
                    {t.label}
                    {t.badge && unread > 0 && (
                      <span className="badge">{unread}</span>
                    )}
                  </NavItem>
                ))}
              </React.Fragment>
            ))}
          </NavGroup>

          <SidebarBottom>
            <UserChip>
              <Avatar>A</Avatar>
              <UserInfo>
                <div className="name">Admin</div>
                <div className="role">super user</div>
              </UserInfo>
              <LogoutBtn onClick={onLogout} title="Logout">↪</LogoutBtn>
            </UserChip>
          </SidebarBottom>
        </Sidebar>

        {/* ── Main ── */}
        <Main>
          <TopBar>
            <Breadcrumb>
              <span>Portfolio</span>
              <span className="sep">/</span>
              <span className="current">{active?.label}</span>
            </Breadcrumb>
            <TopBarRight>
              <StatusDot>live</StatusDot>
              <MobileLogout onClick={onLogout}>Logout</MobileLogout>
            </TopBarRight>
          </TopBar>

          {/* Mobile tabs */}
          <MobileTabs>
            {TABS.map(t => (
              <MobileTab
                key={t.id}
                $active={activeTab === t.id ? 1 : 0}
                onClick={() => setActiveTab(t.id)}
              >
                {t.icon} {t.label}
              </MobileTab>
            ))}
          </MobileTabs>

          {/* Content */}
          <ContentPad key={activeTab}>
            {activeTab === 'dashboard'      && <Dashboard />}
            {activeTab === 'projects'       && <ProjectsManager        onDataUpdate={triggerRefresh} refreshTrigger={refreshTrigger} />}
            {activeTab === 'skills'         && <SkillsManager          onDataUpdate={triggerRefresh} refreshTrigger={refreshTrigger} />}
            {activeTab === 'experiences'    && <ExperiencesManager     onDataUpdate={triggerRefresh} refreshTrigger={refreshTrigger} />}
            {activeTab === 'education'      && <EducationManager       onDataUpdate={triggerRefresh} refreshTrigger={refreshTrigger} />}
            {activeTab === 'certifications' && <CertificationsManager  onDataUpdate={triggerRefresh} refreshTrigger={refreshTrigger} />}
            {activeTab === 'about'          && <AboutManager           onDataUpdate={triggerRefresh} refreshTrigger={refreshTrigger} />}
            {activeTab === 'contact'        && <ContactManager         onDataUpdate={triggerRefresh} />}
            {activeTab === 'messages'       && <MessagesManager        onDataUpdate={triggerRefresh} onUnreadChange={setUnread} />}
          </ContentPad>
        </Main>

      </Shell>
    </>
  );
};

export default Admin;