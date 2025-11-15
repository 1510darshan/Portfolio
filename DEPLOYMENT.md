# Production Deployment Checklist

## ✅ Pre-Deployment Steps

### 1. Environment Variables Setup
- [ ] Create MongoDB Atlas account and cluster
- [ ] Get MongoDB connection string
- [ ] Generate strong JWT_SECRET
- [ ] Set FRONTEND_URL to your frontend domain
- [ ] Set REACT_APP_API_URL to your backend domain

### 2. Security Review
- [ ] Change default admin credentials
- [ ] Review and update CORS allowed origins
- [ ] Ensure .env files are in .gitignore
- [ ] Review rate limiting settings
- [ ] Check file upload size limits

### 3. Code Review
- [ ] Remove console.logs from production code
- [ ] Check for hardcoded credentials
- [ ] Verify all API endpoints work
- [ ] Test authentication flow
- [ ] Test file upload functionality

### 4. Database
- [ ] Backup local database if needed
- [ ] Set up MongoDB Atlas cluster
- [ ] Configure IP whitelist (0.0.0.0/0 for serverless)
- [ ] Create database user with appropriate permissions

## 🚀 Vercel Deployment

### Backend Deployment
1. Push code to GitHub
2. Go to https://vercel.com
3. Import repository
4. Configure:
   - Root Directory: `backend`
   - Framework Preset: Other
   - Build Command: `npm install`
   - Output Directory: (leave empty)
   - Install Command: `npm install`

5. Add Environment Variables:
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=<your-mongodb-atlas-uri>
   JWT_SECRET=<generate-strong-secret>
   JWT_EXPIRE=7d
   FRONTEND_URL=<your-frontend-vercel-url>
   ```

6. Deploy

### Frontend Deployment
1. Create new Vercel project
2. Import same repository
3. Configure:
   - Root Directory: (leave empty - root)
   - Framework Preset: Create React App
   - Build Command: `npm run build`
   - Output Directory: `build`

4. Add Environment Variable:
   ```
   REACT_APP_API_URL=<your-backend-vercel-url>/api
   ```

5. Deploy

## 🎨 Render Deployment

### Backend Deployment
1. Go to https://render.com
2. New → Web Service
3. Connect repository
4. Configure:
   - Name: `portfolio-backend`
   - Environment: `Node`
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
   - Plan: Free

5. Add Environment Variables (same as Vercel)

6. Create Service

### Frontend Deployment
1. New → Static Site
2. Connect repository
3. Configure:
   - Name: `portfolio-frontend`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `build`

4. Add Environment Variable:
   ```
   REACT_APP_API_URL=<your-backend-render-url>/api
   ```

5. Create Static Site

## 🔧 Post-Deployment

### Backend
- [ ] Test health endpoint: `https://your-backend/api/health`
- [ ] Verify MongoDB connection
- [ ] Test authentication login
- [ ] Check logs for errors

### Frontend
- [ ] Test site loads correctly
- [ ] Check API calls in Network tab
- [ ] Test admin panel login
- [ ] Test all CRUD operations
- [ ] Test file uploads
- [ ] Test on mobile devices

## 🐛 Common Issues

### CORS Errors
- Update FRONTEND_URL in backend .env
- Check CORS configuration in server.js
- Verify allowed origins

### MongoDB Connection Failed
- Check MongoDB Atlas IP whitelist
- Verify connection string format
- Check database user permissions

### File Uploads Not Working
- Ensure uploads directory exists
- Check file size limits
- Verify Multer configuration
- Consider using cloud storage (Cloudinary, AWS S3) for production

### API Not Responding
- Check backend logs
- Verify environment variables
- Check rate limiting settings
- Ensure MongoDB is connected

## 📊 Monitoring

- Set up error tracking (Sentry, LogRocket)
- Monitor API response times
- Check MongoDB metrics
- Set up uptime monitoring

## 🔄 Updates and Maintenance

- Regular dependency updates
- Security patches
- Database backups
- Performance optimization
- Log monitoring

## 📝 Notes

### File Storage in Production
For production, consider migrating from local file storage to cloud storage:
- **Cloudinary**: Image hosting and transformation
- **AWS S3**: General file storage
- **Firebase Storage**: File storage with CDN

### Database Considerations
- Enable MongoDB Atlas backups
- Set up monitoring and alerts
- Review and optimize indexes
- Plan for scaling

### Performance Optimization
- Enable compression (already configured)
- Use CDN for static assets
- Implement caching strategies
- Optimize images before upload
- Use lazy loading for images

## 🔐 Security Best Practices

- Never commit .env files
- Use strong JWT secrets
- Regularly update dependencies
- Monitor for security vulnerabilities
- Use HTTPS only in production
- Implement rate limiting (already configured)
- Validate all user inputs
- Use prepared statements for database queries
