const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: ''
  },
  categories: [{
    type: String,
    enum: ['fullstack', 'frontend', 'backend', 'mobile', 'devops', 'ai-ml', 'uiux', 'database', 'security', 'java', 'python', 'android', 'other']
  }],
  category: {
    type: String,
    enum: ['fullstack', 'frontend', 'backend', 'mobile', 'devops', 'ai-ml', 'uiux', 'database', 'security', 'java', 'python', 'android', 'other'],
    default: 'other'
  },
  tags: [{
    type: String
  }],
  githubLink: {
    type: String,
    default: ''
  },
  liveLink: {
    type: String,
    default: ''
  },
  technologies: [{
    type: String
  }],
  featured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

projectSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  
  // Set legacy category field to first category if categories exist
  if (this.categories && this.categories.length > 0) {
    this.category = this.categories[0];
  }
  
  next();
});

projectSchema.pre('findOneAndUpdate', function(next) {
  const update = this.getUpdate();
  
  // Set legacy category field to first category if categories exist
  if (update.categories && update.categories.length > 0) {
    update.category = update.categories[0];
  }
  
  this.set({ updatedAt: Date.now() });
  next();
});

module.exports = mongoose.model('Project', projectSchema);
