# MinitaskManager Deployment Guide

This guide covers how to deploy the MinitaskManager application to various platforms.

## Project Structure
- `backend/` - Node.js/Express API with PostgreSQL
- `frontend/` - Next.js React application

## Prerequisites
- Node.js 18+ installed
- PostgreSQL database
- Git repository

## Quick Deployment Options

### Option 1: Railway (Recommended)

#### Backend Deployment
1. Go to [railway.app](https://railway.app) and sign up
2. Create a new project
3. Connect your GitHub repository
4. Add a PostgreSQL service
5. Set environment variables:
   ```
   DB_USER=postgres
   DB_HOST=your-railway-postgres-host
   DB_NAME=railway
   DB_PASSWORD=your-railway-postgres-password
   DB_PORT=5432
   NODE_ENV=production
   CORS_ORIGIN=https://your-frontend-domain.com
   ```
6. Deploy the backend service

#### Frontend Deployment
1. Create another service in Railway
2. Set the root directory to `frontend`
3. Set environment variables:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-railway-url
   ```
4. Deploy the frontend service

### Option 2: Vercel + Railway

#### Frontend on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Set root directory to `frontend`
4. Add environment variable:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url
   ```
5. Deploy

#### Backend on Railway
Follow the backend deployment steps from Option 1.

### Option 3: Traditional VPS

#### Server Setup
1. Set up Ubuntu/Debian server
2. Install Node.js, PostgreSQL, Nginx
3. Clone your repository

#### Database Setup
```bash
sudo -u postgres psql
CREATE DATABASE taskmanager;
CREATE USER taskuser WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE taskmanager TO taskuser;
\q
```

#### Backend Deployment
```bash
cd backend
npm install
cp env.example .env
# Edit .env with your database credentials
npm start
```

#### Frontend Deployment
```bash
cd frontend
npm install
npm run build
npm start
```

#### Nginx Configuration
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Environment Variables

### Backend (.env)
```
DB_USER=postgres
DB_HOST=localhost
DB_NAME=taskmanager
DB_PASSWORD=your_password
DB_PORT=5432
PORT=4000
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-domain.com
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=https://your-backend-domain.com
```

## Database Setup
Run the `database.sql` file in your PostgreSQL instance:
```bash
psql -U postgres -d taskmanager -f backend/database.sql
```

## SSL/HTTPS Setup
For production, always use HTTPS:
- Let's Encrypt for free SSL certificates
- Cloudflare for additional security
- Platform-specific SSL (Vercel, Railway provide this automatically)

## Monitoring and Maintenance
- Set up logging (Winston, Morgan)
- Monitor application performance
- Regular database backups
- Keep dependencies updated

## Troubleshooting

### Common Issues
1. **CORS errors**: Check CORS_ORIGIN environment variable
2. **Database connection**: Verify database credentials and network access
3. **Build failures**: Check Node.js version compatibility
4. **Environment variables**: Ensure all required variables are set

### Debug Commands
```bash
# Check backend logs
npm run dev

# Check frontend build
npm run build

# Test database connection
psql -h your-host -U your-user -d your-database
```

## Support
For deployment issues, check:
- Platform-specific documentation
- Node.js and Next.js deployment guides
- PostgreSQL connection troubleshooting 