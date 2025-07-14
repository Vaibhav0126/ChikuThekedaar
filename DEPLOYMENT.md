# Deployment Guide - CHHIKARA CONSTRUCTIONS Website

## Local Development Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

### Initial Setup

1. **Clone the repository**

   ```bash
   git clone <your-repository-url>
   cd construction-firm-website
   ```

2. **Install dependencies**

   ```bash
   # Install root dependencies
   npm install

   # Install frontend dependencies
   cd frontend
   npm install

   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. **Environment Configuration**

   ```bash
   # Copy environment example file
   cp backend/.env.example backend/.env

   # Edit backend/.env with your actual credentials
   ```

4. **Database Setup**

   - Start MongoDB locally or use MongoDB Atlas
   - Create admin user (optional):
     ```bash
     cd backend
     node seeds/createAdmin.js
     ```

5. **Start Development Servers**

   ```bash
   # Terminal 1: Start backend
   cd backend
   npm run dev

   # Terminal 2: Start frontend
   cd frontend
   npm start
   ```

## Production Deployment

### Environment Variables for Production

Set these environment variables in your hosting platform:

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/construction_firm

# Server
PORT=5001
NODE_ENV=production

# Email Configuration
EMAIL_USER=chhikaraconstructions@gmail.com
EMAIL_PASS=your-gmail-app-password
COMPANY_EMAIL=chhikaraconstructions@gmail.com

# Security
JWT_SECRET=your-production-jwt-secret-very-long-and-secure
```

### Deployment Platforms

#### Heroku Deployment

1. Install Heroku CLI
2. Create Heroku app
3. Set environment variables
4. Deploy:
   ```bash
   git push heroku main
   ```

#### Vercel/Netlify (Frontend)

1. Build command: `npm run build`
2. Output directory: `build`
3. Set environment variables in dashboard

#### Railway/DigitalOcean (Backend)

1. Connect GitHub repository
2. Set environment variables
3. Deploy automatically on push

### Important Security Notes

- Never commit `.env` files
- Use strong JWT secrets in production
- Enable MongoDB authentication
- Use HTTPS in production
- Set up proper CORS origins
- Regular security updates

### File Structure

```
construction-firm-website/
├── backend/              # Express.js API
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── middleware/      # Authentication middleware
│   ├── uploads/         # File uploads (ignored in git)
│   └── .env            # Environment variables (ignored in git)
├── frontend/            # React.js application
│   ├── src/
│   ├── public/
│   └── build/          # Production build (ignored in git)
└── README.md
```

### Features

- ✅ Contact form with email notifications
- ✅ Admin dashboard for managing services/projects
- ✅ Image upload functionality
- ✅ Responsive design
- ✅ JWT authentication
- ✅ MongoDB integration
- ✅ Professional email templates

### Troubleshooting

- **Email not sending**: Check Gmail app password and 2FA settings
- **Database connection**: Verify MongoDB URI and network access
- **JWT errors**: Ensure JWT_SECRET is set and consistent
- **Upload issues**: Check file permissions in uploads directory
