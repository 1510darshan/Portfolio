const API_URL = import.meta.env.VITE_API_URL;

const getAuthHeader = () => {
  const token = localStorage.getItem('adminToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/**
 * Centralized error handling for all API calls
 */
const handleResponse = async (response, errorMessage) => {
  if (!response.ok) {
    try {
      const error = await response.json();
      throw new Error(error.error || errorMessage);
    } catch (e) {
      throw new Error(errorMessage);
    }
  }
  return response.json();
};

// ==================================================================
//                        Projects
// ==================================================================
export const getAllProjects = async () => {
  try {
    const res = await fetch(`${API_URL}/api/projects`);
    
    return await handleResponse(res, 'Failed to fetch projects');
  } catch (error) {
    console.error('getAllProjects error:', error);
    throw error;
  }
};

export const getProjectByCategory = async (category) => {
  try {
    const res = await fetch(`${API_URL}/api/projects/${category}`);
    return await handleResponse(res, 'Failed to fetch projects');
  } catch (error) {
    console.error('getProjectByCategory error:', error);
    throw error;
  }
};

export const insertProject = async (projectData) => {
  try {
    const res = await fetch(`${API_URL}/api/admin/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(projectData),
    });
    const data = await handleResponse(res, 'Failed to create project');
    return data.id;
  } catch (error) {
    console.error('insertProject error:', error);
    throw error;
  }
};

export const updateProject = async (id, projectData) => {
  try {
    const url = `${API_URL}/api/admin/projects/${id}`;

    const res = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(projectData),
    });

    await handleResponse(res, 'Failed to update project');
  } catch (error) {
    console.error('updateProject error:', error);
    throw error;
  }
};

export const deleteProject = async (id) => {
  try {
    const res = await fetch(`${API_URL}/api/admin/projects/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
    });
    await handleResponse(res, 'Failed to delete project');
  } catch (error) {
    console.error('deleteProject error:', error);
    throw error;
  }
};

// ==================================================================
//                        Skills
// ==================================================================

export const getAllSkills = async () => {
  try {
    const res = await fetch(`${API_URL}/api/skills`);
    return await handleResponse(res, 'Failed to fetch skills');
  } catch (error) {
    console.error('getAllSkills error:', error);
    throw error;
  }
};

export const getSkillsByCategory = async (category) => {
  try {
    const res = await fetch(`${API_URL}/api/skills/${category}`);
    return await handleResponse(res, 'Failed to fetch skills');
  } catch (error) {
    console.error('getSkillsByCategory error:', error);
    throw error;
  }
};

export const insertSkill = async (skillData) => {
  try {
    const res = await fetch(`${API_URL}/api/admin/skills`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(skillData),
    });
    const data = await handleResponse(res, 'Failed to create skill');
    return data.id;
  } catch (error) {
    console.error('insertSkill error:', error);
    throw error;
  }
};

export const updateSkill = async (id, skillData) => {
  try {
    const res = await fetch(`${API_URL}/api/admin/skills/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(skillData),
    });
    await handleResponse(res, 'Failed to update skill');
  } catch (error) {
    console.error('updateSkill error:', error);
    throw error;
  }
};

export const deleteSkill = async (id) => {
  try {
    const res = await fetch(`${API_URL}/api/admin/skills/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
    });
    await handleResponse(res, 'Failed to delete skill');
  } catch (error) {
    console.error('deleteSkill error:', error);
    throw error;
  }
};

// ==================================================================
//                        Experiences
// ==================================================================

export const getAllExperiences = async () => {
  try {
    const res = await fetch(`${API_URL}/api/experiences`);
    return await handleResponse(res, 'Failed to fetch experiences');
  } catch (error) {
    console.error('getAllExperiences error:', error);
    throw error;
  }
};

export const insertExperience = async (expData) => {
  try {
    const res = await fetch(`${API_URL}/api/admin/experiences`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(expData),
    });
    const data = await handleResponse(res, 'Failed to create experience');
    return data.id;
  } catch (error) {
    console.error('insertExperience error:', error);
    throw error;
  }
};

export const updateExperience = async (id, expData) => {
  try {
    const res = await fetch(`${API_URL}/api/admin/experiences/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(expData),
    });
    await handleResponse(res, 'Failed to update experience');
  } catch (error) {
    console.error('updateExperience error:', error);
    throw error;
  }
};

export const deleteExperience = async (id) => {
  try {
    const res = await fetch(`${API_URL}/api/admin/experiences/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
    });
    await handleResponse(res, 'Failed to delete experience');
  } catch (error) {
    console.error('deleteExperience error:', error);
    throw error;
  }
};

// ==================================================================
//                        About
// ==================================================================

export const getAboutMe = async () => {
  try {
    const res = await fetch(`${API_URL}/api/about`);
    
    return await handleResponse(res, 'Failed to fetch about');
  } catch (error) {
    console.error('getAboutMe error:', error);
    throw error;
  }
};

export const updateAboutMe = async (data) => {
  try {
    const res = await fetch(`${API_URL}/api/admin/about`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(data),
    });
    await handleResponse(res, 'Failed to update about');
  } catch (error) {
    console.error('updateAboutMe error:', error);
    throw error;
  }
};

// ==================================================================
//                        Messages
// ==================================================================

export const sendMessage = async (messageData) => {
  try {
    const res = await fetch(`${API_URL}/api/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(messageData),
    });
    const data = await handleResponse(res, 'Failed to send message');
    return data.id;
  } catch (error) {
    console.error('sendMessage error:', error);
    throw error;
  }
};

export const getAllMessages = async () => {
  try {
    const res = await fetch(`${API_URL}/api/admin/messages`, {
      headers: { ...getAuthHeader() },
    });
    return await handleResponse(res, 'Failed to fetch messages');
  } catch (error) {
    console.error('getAllMessages error:', error);
    throw error;
  }
};

export const markMessageAsRead = async (id) => {
  try {
    const res = await fetch(`${API_URL}/api/admin/messages/${id}/read`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
    });
    await handleResponse(res, 'Failed to mark message as read');
  } catch (error) {
    console.error('markMessageAsRead error:', error);
    throw error;
  }
};

export const deleteMessage = async (id) => {
  try {
    const res = await fetch(`${API_URL}/api/admin/messages/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
    });
    await handleResponse(res, 'Failed to delete message');
  } catch (error) {
    console.error('deleteMessage error:', error);
    throw error;
  }
};

// ==================================================================
//                        Image URL Validation
// ==================================================================

export const uploadProjectImage = (imageUrl) => {
  try {
    if (!imageUrl) throw new Error('Image URL is required');
    new URL(imageUrl); // Validates URL format
    return imageUrl;
  } catch (error) {
    console.error('uploadProjectImage error:', error);
    throw error;
  }
};

export const uploadProfileImage = (imageUrl) => {
  try {
    if (!imageUrl) throw new Error('Image URL is required');
    new URL(imageUrl); // Validates URL format
    return imageUrl;
  } catch (error) {
    console.error('uploadProfileImage error:', error);
    throw error;
  }
};

// ==================================================================
//                        Admin Authentication
// ==================================================================

export const adminLogin = async (email, password) => {
  try {
    const res = await fetch(`${API_URL}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await handleResponse(res, 'Invalid password');
    localStorage.setItem('adminToken', data.token);
    return data.token;
  } catch (error) {
    console.error('adminLogin error:', error);
    throw error;
  }
};

export const adminLogout = () => {
  localStorage.removeItem('adminToken');
};

export const isAdminAuthenticated = () => {
  return !!localStorage.getItem('adminToken');
};

// ── Utility (not an API call - placeholder for profile image) ──────
export const getProfileImage = async () => {
  try {
    const about = await getAboutMe();
    const imageUrl = about?.profileImage;
    
    return imageUrl || null;
  } catch (error) {
    console.error('getProfileImage error:', error);
    return null;
  }
};