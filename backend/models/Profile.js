const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    default: 'Full Stack Developer'
  },
  bio: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    default: ''
  },
  location: {
    type: String,
    default: ''
  },
  profileImage: {
    type: String,
    default: '/assets/image.png'
  },
  resumeUrl: {
    type: String,
    default: '/assets/Darshan_Walhe_Resume.pdf'
  },
  github: {
    type: String,
    default: ''
  },
  linkedin: {
    type: String,
    default: ''
  },
  twitter: {
    type: String,
    default: ''
  },
  website: {
    type: String,
    default: ''
  },
  social: {
    github: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    twitter: { type: String, default: '' },
    instagram: { type: String, default: '' }
  },
  about: {
    description: { type: String, default: '' },
    yearsExperience: { type: Number, default: 0 },
    projectsCompleted: { type: Number, default: 0 },
    clientsSatisfied: { type: Number, default: 0 }
  },
  seo: {
    metaTitle: { type: String, default: '' },
    metaDescription: { type: String, default: '' },
    keywords: [{ type: String }]
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Only allow one profile document
profileSchema.statics.getProfile = async function() {
  let profile = await this.findOne();
  if (!profile) {
    profile = await this.create({
      name: 'Darshan Walhe',
      email: 'darshanwalhe1510@gmail.com',
      title: 'Full Stack Developer'
    });
  }
  return profile;
};

module.exports = mongoose.model('Profile', profileSchema);
