import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import { 
  FaHome, FaProjectDiagram, FaCog, FaGraduationCap, 
  FaEnvelope, FaUser, FaSignOutAlt, FaBars, FaTimes 
} from 'react-icons/fa';
import ProjectManager from './ProjectManager';
import SkillManager from './SkillManager';
import EducationManager from './EducationManager';
import ContactMessages from './ContactMessages';
import ProfileManager from './ProfileManager';
import { projectAPI, skillAPI, educationAPI, contactAPI } from '../services/api';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    education: 0,
    messages: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [projectsRes, skillsRes, educationRes, contactRes] = await Promise.all([
        projectAPI.getAll(),
        skillAPI.getAll(),
        educationAPI.getAll(),
        contactAPI.getAll()
      ]);
      
      setStats({
        projects: projectsRes.data.data.length,
        skills: skillsRes.data.data.length,
        education: educationRes.data.data.length,
        messages: contactRes.data.data.length
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const DashboardHome = () => (
    <DashboardContent>
      <WelcomeSection>
        <h1>Welcome to Admin Dashboard</h1>
        <p>Manage your portfolio content from here</p>
      </WelcomeSection>
      
      <StatsGrid>
        <StatCard>
          <StatIcon><FaProjectDiagram /></StatIcon>
          <StatInfo>
            <StatNumber>{stats.projects}</StatNumber>
            <StatLabel>Projects</StatLabel>
          </StatInfo>
        </StatCard>
        
        <StatCard>
          <StatIcon><FaCog /></StatIcon>
          <StatInfo>
            <StatNumber>{stats.skills}</StatNumber>
            <StatLabel>Skills</StatLabel>
          </StatInfo>
        </StatCard>
        
        <StatCard>
          <StatIcon><FaGraduationCap /></StatIcon>
          <StatInfo>
            <StatNumber>{stats.education}</StatNumber>
            <StatLabel>Education</StatLabel>
          </StatInfo>
        </StatCard>
        
        <StatCard>
          <StatIcon><FaEnvelope /></StatIcon>
          <StatInfo>
            <StatNumber>{stats.messages}</StatNumber>
            <StatLabel>Messages</StatLabel>
          </StatInfo>
        </StatCard>
      </StatsGrid>
      
      <QuickActions>
        <h2>Quick Actions</h2>
        <ActionGrid>
          <ActionButton to="/admin/dashboard/projects">
            <FaProjectDiagram />
            <span>Manage Projects</span>
          </ActionButton>
          <ActionButton to="/admin/dashboard/skills">
            <FaCog />
            <span>Manage Skills</span>
          </ActionButton>
          <ActionButton to="/admin/dashboard/education">
            <FaGraduationCap />
            <span>Manage Education</span>
          </ActionButton>
          <ActionButton to="/admin/dashboard/messages">
            <FaEnvelope />
            <span>View Messages</span>
          </ActionButton>
        </ActionGrid>
      </QuickActions>
    </DashboardContent>
  );

  return (
    <DashboardContainer>
      <Sidebar isOpen={sidebarOpen}>
        <SidebarHeader>
          <Logo>Portfolio Admin</Logo>
        </SidebarHeader>
        
        <SidebarMenu>
          <MenuItem to="/admin/dashboard">
            <FaHome /> <span>Dashboard</span>
          </MenuItem>
          <MenuItem to="/admin/dashboard/projects">
            <FaProjectDiagram /> <span>Projects</span>
          </MenuItem>
          <MenuItem to="/admin/dashboard/skills">
            <FaCog /> <span>Skills</span>
          </MenuItem>
          <MenuItem to="/admin/dashboard/education">
            <FaGraduationCap /> <span>Education</span>
          </MenuItem>
          <MenuItem to="/admin/dashboard/messages">
            <FaEnvelope /> <span>Messages</span>
          </MenuItem>
          <MenuItem to="/admin/dashboard/profile">
            <FaUser /> <span>Profile</span>
          </MenuItem>
        </SidebarMenu>
        
        <LogoutButton onClick={handleLogout}>
          <FaSignOutAlt /> <span>Logout</span>
        </LogoutButton>
      </Sidebar>
      
      <MainContent isOpen={sidebarOpen}>
        <TopBar>
          <MenuToggle onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </MenuToggle>
          <TopBarTitle>Admin Panel</TopBarTitle>
        </TopBar>
        
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/projects" element={<ProjectManager onUpdate={fetchStats} />} />
          <Route path="/skills" element={<SkillManager onUpdate={fetchStats} />} />
          <Route path="/education" element={<EducationManager onUpdate={fetchStats} />} />
          <Route path="/messages" element={<ContactMessages onUpdate={fetchStats} />} />
          <Route path="/profile" element={<ProfileManager />} />
        </Routes>
      </MainContent>
    </DashboardContainer>
  );
};

// Styled Components
const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: #0a0a0a;
`;

const Sidebar = styled.aside`
  width: ${props => props.isOpen ? '260px' : '0'};
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  transition: width 0.3s ease;
  overflow: hidden;
  position: fixed;
  height: 100vh;
  z-index: 1000;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.3);
`;

const SidebarHeader = styled.div`
  padding: 30px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Logo = styled.h2`
  color: #00d4ff;
  font-size: 1.5rem;
  font-weight: 700;
  white-space: nowrap;
`;

const SidebarMenu = styled.nav`
  padding: 20px 0;
  flex: 1;
`;

const MenuItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 25px;
  color: #fff;
  text-decoration: none;
  transition: all 0.3s ease;
  white-space: nowrap;
  
  svg {
    font-size: 1.2rem;
    min-width: 20px;
  }
  
  &:hover {
    background: rgba(0, 212, 255, 0.1);
    border-left: 3px solid #00d4ff;
    padding-left: 22px;
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 15px;
  width: 100%;
  padding: 15px 25px;
  background: transparent;
  color: #ff4757;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  white-space: nowrap;
  margin-top: auto;
  
  svg {
    font-size: 1.2rem;
  }
  
  &:hover {
    background: rgba(255, 71, 87, 0.1);
    border-left: 3px solid #ff4757;
    padding-left: 22px;
  }
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: ${props => props.isOpen ? '260px' : '0'};
  transition: margin-left 0.3s ease;
  min-height: 100vh;
`;

const TopBar = styled.div`
  background: #1a1a2e;
  padding: 20px 30px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const MenuToggle = styled.button`
  background: transparent;
  border: none;
  color: #00d4ff;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const TopBarTitle = styled.h1`
  color: #fff;
  font-size: 1.5rem;
  font-weight: 600;
`;

const DashboardContent = styled.div`
  padding: 30px;
`;

const WelcomeSection = styled.div`
  margin-bottom: 40px;
  
  h1 {
    color: #fff;
    font-size: 2.5rem;
    margin-bottom: 10px;
  }
  
  p {
    color: #aaa;
    font-size: 1.1rem;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
  margin-bottom: 50px;
`;

const StatCard = styled.div`
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  padding: 30px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const StatIcon = styled.div`
  font-size: 3rem;
  color: #00d4ff;
`;

const StatInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #fff;
`;

const StatLabel = styled.div`
  font-size: 1rem;
  color: #aaa;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const QuickActions = styled.div`
  h2 {
    color: #fff;
    font-size: 1.8rem;
    margin-bottom: 25px;
  }
`;

const ActionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`;

const ActionButton = styled(Link)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  color: #fff;
  text-decoration: none;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  
  svg {
    font-size: 2.5rem;
  }
  
  span {
    font-size: 1.1rem;
    font-weight: 600;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
  }
`;

export default AdminDashboard;
