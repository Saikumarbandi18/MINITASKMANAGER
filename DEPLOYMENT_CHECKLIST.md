# Deployment Checklist

## Pre-Deployment
- [ ] Code is committed to Git repository
- [ ] Environment variables are configured
- [ ] Database schema is ready
- [ ] Dependencies are installed

## Backend Deployment
- [ ] Choose deployment platform (Railway, Render, Heroku, etc.)
- [ ] Set up PostgreSQL database
- [ ] Configure environment variables:
  - [ ] DB_USER
  - [ ] DB_HOST
  - [ ] DB_NAME
  - [ ] DB_PASSWORD
  - [ ] DB_PORT
  - [ ] NODE_ENV=production
  - [ ] CORS_ORIGIN (frontend URL)
- [ ] Deploy backend service
- [ ] Test API endpoints
- [ ] Note the backend URL

## Frontend Deployment
- [ ] Choose deployment platform (Vercel, Railway, etc.)
- [ ] Configure environment variables:
  - [ ] NEXT_PUBLIC_API_URL (backend URL)
- [ ] Deploy frontend service
- [ ] Test frontend functionality
- [ ] Verify API communication

## Post-Deployment
- [ ] Test all features
- [ ] Set up monitoring/logging
- [ ] Configure custom domain (optional)
- [ ] Set up SSL/HTTPS
- [ ] Create database backup strategy

## Quick Commands
```bash
# Backend
cd backend
npm install
npm start

# Frontend
cd frontend
npm install
npm run build
npm start
``` 