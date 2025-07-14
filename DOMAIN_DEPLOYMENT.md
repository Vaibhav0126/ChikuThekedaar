# Deploy to chhikaraconstructions.in - Complete Guide

## 🚀 Recommended Deployment Stack

**Frontend**: Vercel (React App)
**Backend**: Railway (Node.js API)
**Database**: MongoDB Atlas (Cloud)
**Domain**: chhikaraconstructions.in

## Step 1: Database Setup (MongoDB Atlas)

### 1.1 Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create free account
3. Create new cluster (M0 Free tier)
4. Choose region closest to your users (Asia Pacific)

### 1.2 Database Configuration

1. **Database Access**: Create database user

   - Username: `chhikaraadmin`
   - Password: Generate secure password
   - Database User Privileges: `Atlas Admin`

2. **Network Access**: Add IP addresses

   - Add `0.0.0.0/0` (allow access from anywhere)
   - Or add specific deployment platform IPs

3. **Get Connection String**
   - Click "Connect" → "Connect your application"
   - Copy connection string
   - Replace `<password>` with your database password

## Step 2: Backend Deployment (Railway)

### 2.1 Deploy to Railway

1. Go to [Railway.app](https://railway.app/)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your `ChikuThekedaar` repository
5. Select the `backend` folder for deployment

### 2.2 Environment Variables in Railway

Set these environment variables in Railway dashboard:

```env
MONGODB_URI=mongodb+srv://chhikaraadmin:<password>@cluster0.xxxxx.mongodb.net/construction_firm
PORT=5001
NODE_ENV=production
EMAIL_USER=chhikaraconstructions@gmail.com
EMAIL_PASS=your-gmail-app-password
COMPANY_EMAIL=chhikaraconstructions@gmail.com
JWT_SECRET=your-production-jwt-secret-very-long-and-secure-string
```

### 2.3 Railway Configuration

1. Set **Build Command**: `npm install`
2. Set **Start Command**: `npm start`
3. Set **Root Directory**: `backend`
4. Deploy and get Railway URL (e.g., `https://your-app.railway.app`)

## Step 3: Frontend Deployment (Vercel)

### 3.1 Deploy to Vercel

1. Go to [Vercel.com](https://vercel.com/)
2. Sign up with GitHub
3. Click "New Project"
4. Import your `ChikuThekedaar` repository
5. Set **Root Directory**: `frontend`

### 3.2 Build Configuration

- **Build Command**: `npm run build`
- **Output Directory**: `build`
- **Install Command**: `npm install`

### 3.3 Environment Variables in Vercel

Set in Vercel dashboard:

```env
REACT_APP_API_URL=https://your-backend-url.railway.app
```

Update your `frontend/src/utils/api.ts` to use environment variable:

```typescript
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5001";
```

## Step 4: Domain Configuration

### 4.1 Configure Custom Domain in Vercel

1. In Vercel dashboard, go to your project
2. Go to "Settings" → "Domains"
3. Add custom domain: `chhikaraconstructions.in`
4. Add www subdomain: `www.chhikaraconstructions.in`

### 4.2 DNS Configuration

In your domain registrar (where you bought the domain):

**For Vercel (Frontend):**

- **A Record**: `@` → `76.76.19.61`
- **CNAME**: `www` → `cname.vercel-dns.com`

**Alternative (easier):**

- **CNAME**: `@` → `cname.vercel-dns.com`
- **CNAME**: `www` → `cname.vercel-dns.com`

### 4.3 SSL Certificate

- Vercel automatically provides SSL certificate
- Your site will be accessible at `https://chhikaraconstructions.in`

## Step 5: Update Frontend API URLs

### 5.1 Update API Configuration

Update all API calls to use your Railway backend URL:

```typescript
// frontend/src/utils/api.ts
const API_BASE_URL =
  process.env.REACT_APP_API_URL || "https://your-backend-url.railway.app";
```

### 5.2 Update CORS Settings

In your `backend/server.js`, update CORS:

```javascript
app.use(
  cors({
    origin: [
      "https://chhikaraconstructions.in",
      "https://www.chhikaraconstructions.in",
      "http://localhost:3000", // for development
    ],
    credentials: true,
  })
);
```

## Step 6: Admin User Setup

### 6.1 Create Admin User

1. SSH into Railway or use Railway CLI
2. Run: `node seeds/createAdmin.js`
3. Or create admin via API call to `/api/auth/register`

## Step 7: Testing Deployment

### 7.1 Test Checklist

- [ ] Website loads at `https://chhikaraconstructions.in`
- [ ] Contact form sends emails
- [ ] Admin login works
- [ ] Admin dashboard functions
- [ ] Image uploads work
- [ ] Services/Projects display correctly
- [ ] Mobile responsive design
- [ ] SSL certificate active (green padlock)

## Alternative Deployment Options

### Option 2: Netlify + Heroku

- **Frontend**: Netlify
- **Backend**: Heroku
- **Database**: MongoDB Atlas

### Option 3: All-in-One (Railway Full-Stack)

- Deploy both frontend and backend to Railway
- Use Railway's static site hosting

## Cost Breakdown

### Free Tier (Recommended for Start)

- **MongoDB Atlas**: Free (M0 - 512MB)
- **Railway**: Free tier (500 hours/month)
- **Vercel**: Free (100GB bandwidth)
- **Domain**: ₹1000-2000/year (already purchased)

### Paid Tier (As you grow)

- **MongoDB Atlas**: $9/month (M2 - 2GB)
- **Railway**: $5/month (more resources)
- **Vercel**: $20/month (more features)

## Maintenance & Updates

### 7.1 Future Updates

1. Push code to GitHub
2. Railway & Vercel auto-deploy from GitHub
3. Database backups via MongoDB Atlas
4. Monitor uptime and performance

### 7.2 Important Notes

- Keep environment variables secure
- Regular database backups
- Monitor email delivery
- Update dependencies regularly
- SSL certificate auto-renews

Would you like me to help you start with any specific step? I recommend starting with MongoDB Atlas setup first.
