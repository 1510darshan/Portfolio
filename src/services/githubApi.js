import axios from 'axios';

// GitHub API Configuration
const GITHUB_USERNAME = '1510darshan'; // Replace with your GitHub username
const GITHUB_API_BASE = 'https://api.github.com';

// Create axios instance for GitHub API
const githubApi = axios.create({
  baseURL: GITHUB_API_BASE,
  headers: {
    'Accept': 'application/vnd.github.v3+json'
  }
});

// Optional: Add GitHub Personal Access Token for higher rate limits
// Get token from: https://github.com/settings/tokens
// const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
// if (GITHUB_TOKEN) {
//   githubApi.defaults.headers.common['Authorization'] = `token ${GITHUB_TOKEN}`;
// }

/**
 * Fetch all repositories for a user
 * @param {string} username - GitHub username
 * @param {object} options - Query options (sort, direction, per_page, etc.)
 * @returns {Promise} - Array of repositories
 */
export const fetchUserRepos = async (username = GITHUB_USERNAME, options = {}) => {
  try {
    const params = {
      sort: options.sort || 'updated', // updated, created, pushed, full_name
      direction: options.direction || 'desc', // asc or desc
      per_page: options.per_page || 100,
      type: options.type || 'owner' // all, owner, member
    };

    const response = await githubApi.get(`/users/${username}/repos`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    throw error;
  }
};

/**
 * Fetch a specific repository
 * @param {string} username - GitHub username
 * @param {string} repoName - Repository name
 * @returns {Promise} - Repository details
 */
export const fetchRepo = async (username = GITHUB_USERNAME, repoName) => {
  try {
    const response = await githubApi.get(`/repos/${username}/${repoName}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching repo ${repoName}:`, error);
    throw error;
  }
};

/**
 * Fetch repository languages
 * @param {string} username - GitHub username
 * @param {string} repoName - Repository name
 * @returns {Promise} - Object with languages and bytes
 */
export const fetchRepoLanguages = async (username = GITHUB_USERNAME, repoName) => {
  try {
    const response = await githubApi.get(`/repos/${username}/${repoName}/languages`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching languages for ${repoName}:`, error);
    throw error;
  }
};

/**
 * Fetch repository topics
 * @param {string} username - GitHub username
 * @param {string} repoName - Repository name
 * @returns {Promise} - Array of topics
 */
export const fetchRepoTopics = async (username = GITHUB_USERNAME, repoName) => {
  try {
    const response = await githubApi.get(`/repos/${username}/${repoName}/topics`, {
      headers: {
        'Accept': 'application/vnd.github.mercy-preview+json'
      }
    });
    return response.data.names;
  } catch (error) {
    console.error(`Error fetching topics for ${repoName}:`, error);
    return [];
  }
};

/**
 * Fetch README content
 * @param {string} username - GitHub username
 * @param {string} repoName - Repository name
 * @returns {Promise} - README content
 */
export const fetchRepoReadme = async (username = GITHUB_USERNAME, repoName) => {
  try {
    const response = await githubApi.get(`/repos/${username}/${repoName}/readme`);
    // Content is base64 encoded
    const content = atob(response.data.content);
    return content;
  } catch (error) {
    console.error(`Error fetching README for ${repoName}:`, error);
    return null;
  }
};

/**
 * Transform GitHub repo data to project format
 * @param {object} repo - GitHub repository object
 * @returns {object} - Project object for portfolio
 */
export const transformRepoToProject = (repo) => {
  return {
    title: repo.name.replace(/-/g, ' ').replace(/_/g, ' '),
    description: repo.description || 'No description available',
    image: repo.owner.avatar_url, // You might want to use a screenshot instead
    githubLink: repo.html_url,
    liveLink: repo.homepage || '',
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    language: repo.language,
    topics: repo.topics || [],
    created: repo.created_at,
    updated: repo.updated_at,
    isPrivate: repo.private,
    isFork: repo.fork
  };
};

/**
 * Fetch and transform all public repos
 * @param {string} username - GitHub username
 * @returns {Promise} - Array of project objects
 */
export const fetchGitHubProjects = async (username = GITHUB_USERNAME) => {
  try {
    const repos = await fetchUserRepos(username, {
      sort: 'updated',
      direction: 'desc',
      type: 'owner'
    });

    // Filter out forks and private repos
    const publicRepos = repos.filter(repo => !repo.fork && !repo.private);

    // Transform to project format
    const projects = publicRepos.map(transformRepoToProject);

    // Optionally fetch additional data for each repo
    // const projectsWithDetails = await Promise.all(
    //   projects.slice(0, 10).map(async (project) => {
    //     const repoName = project.githubLink.split('/').pop();
    //     const languages = await fetchRepoLanguages(username, repoName);
    //     const topics = await fetchRepoTopics(username, repoName);
    //     return {
    //       ...project,
    //       languages: Object.keys(languages),
    //       tags: topics
    //     };
    //   })
    // );

    return projects;
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    return [];
  }
};

/**
 * Fetch pinned repositories (requires GraphQL)
 * Note: This requires authentication and GraphQL API
 */
export const fetchPinnedRepos = async (username = GITHUB_USERNAME) => {
  // This would require GraphQL API and authentication
  // For now, return empty array
  console.warn('Pinned repos require GitHub GraphQL API');
  return [];
};

export default {
  fetchUserRepos,
  fetchRepo,
  fetchRepoLanguages,
  fetchRepoTopics,
  fetchRepoReadme,
  transformRepoToProject,
  fetchGitHubProjects,
  fetchPinnedRepos
};
