import React, { useState } from 'react';
import styled from 'styled-components';
import ManageData from '../../Services/Firebase/ManageData';
import ProjectsManager from './managers/ProjectsManager';
import SkillsManager from './managers/SkillsManager';
import ExperiencesManager from './managers/ExperiencesManager';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(180deg, #040d1a 0%, #071428 50%, #040d1a 100%);
  padding: 40px 20px;
`;

const Inner = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(34, 211, 238, 0.1);
`;

const Title = styled.h1`
  font-size: 2rem;
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

const LogoutBtn = styled.button`
  padding: 10px 20px;
  background: rgba(255, 107, 107, 0.1);
  border: 1px solid rgba(255, 107, 107, 0.3);
  border-radius: 6px;
  color: #ff6b6b;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.85rem;

  &:hover {
    background: rgba(255, 107, 107, 0.2);
    border-color: #ff6b6b;
  }
`;

const TabContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 32px;
  border-bottom: 1px solid rgba(34, 211, 238, 0.1);
  overflow-x: auto;
  padding-bottom: 0;

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(34, 211, 238, 0.2);
    border-radius: 2px;
  }
`;

const Tab = styled.button`
  padding: 14px 24px;
  background: transparent;
  border: none;
  border-bottom: 3px solid transparent;
  color: ${({ active }) => active ? '#22d3ee' : 'rgba(255, 255, 255, 0.4)'};
  font-weight: ${({ active }) => active ? '700' : '600'};
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  letter-spacing: 0.05em;
  white-space: nowrap;

  ${({ active }) => active && `
    border-bottom-color: #22d3ee;
    color: #22d3ee;
  `}

  &:hover {
    color: #22d3ee;
  }
`;

const ContentArea = styled.div`
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const Admin = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('projects');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const tabs = [
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'experiences', label: 'Experiences' },
  ];

  const triggerRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <Container>
      <Inner>
        <Header>
          <Title>Portfolio <span>Admin</span></Title>
          <LogoutBtn onClick={onLogout}>Logout</LogoutBtn>
        </Header>

        <TabContainer>
          {tabs.map(tab => (
            <Tab
              key={tab.id}
              active={activeTab === tab.id ? 1 : 0}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </Tab>
          ))}
        </TabContainer>

        <ContentArea>
          {activeTab === 'projects' && (
            <ProjectsManager onDataUpdate={triggerRefresh} refreshTrigger={refreshTrigger} />
          )}
          {activeTab === 'skills' && (
            <SkillsManager onDataUpdate={triggerRefresh} refreshTrigger={refreshTrigger} />
          )}
          {activeTab === 'experiences' && (
            <ExperiencesManager onDataUpdate={triggerRefresh} refreshTrigger={refreshTrigger} />
          )}
        </ContentArea>
      </Inner>
    </Container>
  );
};

export default Admin;
