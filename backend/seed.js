const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./models/Project');
const Skill = require('./models/Skill');
const Education = require('./models/Education');
const Profile = require('./models/Profile');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');

    // Clear existing data
    await Project.deleteMany({});
    await Skill.deleteMany({});
    await Education.deleteMany({});
    await Profile.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Seed Projects
    const projects = [
      {
        title: "IRCTC Railway Booking System",
        description: "A full-stack web application for railway ticket booking, built with React, Node.js, Express, and Microsoft SQL Server.",
        image: "https://private-user-images.githubusercontent.com/66858036/444770365-0b31fea1-57d8-4569-80f9-cf24bb455514.png",
        category: "fullstack",
        tags: ["React", "CSS", "MSSQL", "Node Js", "Express"],
        githubLink: "https://github.com/1510darshan/IRCTC-Railway-Booking",
        liveLink: "",
        technologies: ["React", "Node.js", "Express", "MSSQL"],
        featured: true,
        order: 1
      },
      {
        title: "Authentication Rest Full API",
        description: "A robust Node.js authentication system featuring email verification, password reset functionality, and secure session management using JWT tokens.",
        image: "/assets/auth-api.png",
        category: "backend",
        tags: ["Node Js", "MongoDB", "Nodemailer", "Express"],
        githubLink: "https://github.com/1510darshan/Authentication",
        liveLink: "",
        technologies: ["Node.js", "MongoDB", "Express", "JWT"],
        featured: true,
        order: 2
      }
    ];

    await Project.insertMany(projects);
    console.log('✅ Projects seeded');

    // Seed Skills
    const skills = [
      { name: "Frontend Development", level: 92, category: "frontend", order: 1 },
      { name: "Backend Development", level: 85, category: "backend", order: 2 },
      { name: "Java Programming", level: 90, category: "language", order: 3 },
      { name: "Python", level: 80, category: "language", order: 4 },
      { name: "Database Management", level: 75, category: "database", order: 5 },
      { name: "UI/UX Design", level: 70, category: "other", order: 6 }
    ];

    await Skill.insertMany(skills);
    console.log('✅ Skills seeded');

    // Seed Education
    const education = [
      {
        degree: "Bachelor of Computer Science",
        institution: "SVKM's NMIMS Shirpur",
        duration: "2023 - 2027",
        description: "Currently pursuing B.Tech in Computer Science, having completed the second year with a strong focus on software engineering, web development, and database systems. Actively working on real-world projects and building hands-on experience in full-stack development and cybersecurity.",
        order: 1
      }
    ];

    await Education.insertMany(education);
    console.log('✅ Education seeded');

    // Seed Profile
    const profile = {
      name: "Darshan Walhe",
      title: "Full Stack Developer & Programmer",
      bio: "I'm a passionate developer with 4+ years of experience creating elegant, efficient solutions for the web. My journey in software development began with a curiosity about how things work, which evolved into a career built on continuous learning and problem-solving.",
      email: "darshanwalhe1510@gmail.com",
      phone: "+91 8007582566",
      location: "Khalane, Dist-Tal Dhule, Maharashtra",
      profileImage: "/assets/image.png",
      resumeUrl: "/assets/Darshan_Walhe_Resume.pdf",
      github: "https://github.com/1510darshan",
      linkedin: "https://in.linkedin.com/in/darshan-walhe-475b60255",
      twitter: "https://twitter.com",
      website: "",
      social: {
        github: "https://github.com/1510darshan",
        linkedin: "https://in.linkedin.com/in/darshan-walhe-475b60255",
        twitter: "https://twitter.com",
        instagram: "https://www.instagram.com/dwalhe2402/"
      },
      about: {
        description: "I specialize in building robust full-stack applications, with expertise in modern JavaScript frameworks, Java, Python, and database technologies. My approach combines technical excellence with creative thinking to deliver solutions that not only meet requirements but exceed expectations.",
        yearsExperience: 0,
        projectsCompleted: 2,
        clientsSatisfied: 0
      },
      seo: {
        metaTitle: "Darshan Walhe - Full Stack Developer | React, Node.js, Java, Python",
        metaDescription: "Full Stack Developer specializing in React, Node.js, Java, Python, and Android development. Building efficient, secure, and scalable web applications with clean architecture.",
        keywords: ["Darshan Walhe", "Full Stack Developer", "React", "Node.js", "Java", "Python", "MongoDB", "Web Developer"]
      }
    };

    await Profile.create(profile);
    console.log('✅ Profile seeded');

    console.log('🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedData();
