# Admin Panel - Portfolio Management Guide

## Overview
Your portfolio now includes a full-featured admin panel to manage all portfolio data (projects, skills, experiences) directly through a web interface without needing to edit code or directly access Firebase.

## Accessing the Admin Panel

1. **Navigate to**: `http://localhost:5173/admin` (or your deployment URL + `/admin`)
2. **Password**: `admin123` (default)

> **Security Note**: Change the default password by setting the `VITE_ADMIN_PASSWORD` environment variable in your `.env.local` file.

### Setting a Custom Password

Create a `.env.local` file in your project root:
```
VITE_ADMIN_PASSWORD=your-secure-password-here
```

Then restart your development server for the changes to take effect.

## Admin Panel Features

### 1. **Projects Manager**
Fully manage your portfolio projects:
- **View All**: See a list of all your projects
- **Create**: Add new projects with:
  - Project name
  - Category (Fullstack, Frontend, Backend, etc.)
  - Description
  - Technologies used (comma-separated)
  - Project type (Web, Mobile, Desktop, etc.)
  - Accent color
  - Status (Completed, In Progress, etc.)
  - Live URL
  - GitHub repository URL
- **Edit**: Click any project to edit all its details
- **Delete**: Remove projects (with confirmation)

### 2. **Skills Manager**
Manage your technical skills:
- **View All**: See all skills organized by category
- **Create**: Add new skills with:
  - Skill name
  - Category (Frontend, Backend, DevOps, etc.)
  - Proficiency level (0-100%)
  - Icon/Emoji
  - Color code
  - Order (for display priority)
  - Featured flag (for showing in skill rings)
- **Edit**: Update any skill's details
- **Delete**: Remove skills

**Pro Tip**: Mark skills as "Featured" to display them in the skill rings visualization on your portfolio hero section.

### 3. **Experiences Manager**
Manage your work experience timeline:
- **View All**: See all your professional experiences
- **Create**: Add new experiences with:
  - Job title/role
  - Company name
  - Employment type (Full-time, Contract, Freelance, etc.)
  - Duration (e.g., "Aug 2024 — Present")
  - Description of responsibilities and achievements
  - Skills used (comma-separated)
  - "Currently Working Here" flag for active positions
- **Edit**: Update experience details
- **Delete**: Remove experiences

## Data Structure

### Projects Collection
```javascript
{
  name: string,              // Project title
  category: string,          // Fullstack, Frontend, Backend, etc.
  desc: string,             // Project description
  tech: string[],           // Array of technologies
  type: string,             // Web, Mobile, Desktop, etc.
  accent: string,           // Hex color code
  status: string,           // Completed, In Progress, etc.
  live: string,             // Live URL (optional)
  github: string            // GitHub URL (optional)
}
```

### Skills Collection
```javascript
{
  name: string,             // Skill name
  category: string,         // Frontend, Backend, DevOps, etc.
  level: number,            // 0-100 proficiency
  color: string,            // Hex color code
  icon: string,             // Emoji or icon
  featured: boolean,        // Show in skill rings? (default: false)
  order: number             // Display order
}
```

### Experiences Collection
```javascript
{
  role: string,             // Job title
  company: string,          // Company name
  type: string,             // Full-time, Contract, etc.
  date: string,             // Duration (e.g., "Aug 2024 - Present")
  current: boolean,         // Currently working? (default: false)
  desc: string,             // Job description
  tags: string[]            // Array of skills used
}
```

## Best Practices

1. **Consistent Naming**: Use consistent naming for categories to improve filtering
2. **Rich Descriptions**: Write detailed, achievement-focused descriptions for projects and experiences
3. **Technology Tags**: Include all relevant technologies in lowercase for consistency
4. **Colors & Icons**: 
   - Use accessible colors that contrast well with dark backgrounds
   - Use consistent emoji/icons for visual appeal
5. **Ordering**: Set the `order` field for skills to control display priority
6. **Featured Skills**: Only mark 3-5 skills as featured for your skill rings

## Troubleshooting

### Password not working?
- Clear browser cache/cookies
- Make sure you're using the correct password
- Check that `VITE_ADMIN_PASSWORD` environment variable is set correctly if using custom password

### Data not updating on portfolio?
- The portfolio pages automatically fetch from Firebase
- Changes are synced in real-time
- Refresh your portfolio page to see updates
- Check Firebase console to verify data was saved

### Feel like something's missing?
Edit the managers in `src/pages/Admin/managers/` to add more fields or customization.

## Development

### File Structure
```
src/pages/Admin/
├── Admin.jsx              # Main admin panel with tabs
├── AdminLogin.jsx         # Password login screen
└── managers/
    ├── ProjectsManager.jsx
    ├── SkillsManager.jsx
    └── ExperiencesManager.jsx
```

### Adding More Managers
1. Create a new manager component in `src/pages/Admin/managers/`
2. Follow the pattern from ProjectsManager.jsx
3. Import it in Admin.jsx
4. Add a new tab to the tabs array
5. Add the conditional render for your new manager

## Security Notes

⚠️ **Important**: The current password protection is basic. For production:
1. Consider implementing proper Firebase Authentication
2. Use environment variables for all sensitive data
3. Add role-based access control if needed
4. Enable Firestore security rules to prevent unauthorized access

### Current Setup
- Password is client-side only (stored in localStorage)
- Not suitable for highly sensitive data
- Recommended for personal portfolios only

## Support

For issues or questions:
1. Check the browser console for error messages
2. Verify Firebase collections exist in your Firestore database
3. Check ManageData.js for Firebase method implementations
4. Review the component code in `src/pages/Admin/managers/`
