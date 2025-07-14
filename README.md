# Construction Firm Website

A complete full-stack website for a construction firm built with React TypeScript, Node.js, Express, and MongoDB.

## Features

### Frontend

- **Modern React App** with TypeScript and Tailwind CSS
- **Responsive Design** that works on all devices
- **Professional UI/UX** with consistent styling
- **Pages Include:**
  - Home page with hero section and company overview
  - Services page displaying all construction services
  - Projects page showcasing completed projects
  - About page with company information and team
  - Admin login and dashboard

### Backend

- **REST API** built with Node.js and Express
- **MongoDB** database with Mongoose ODM
- **JWT Authentication** for admin access
- **Admin Features:**
  - Login system
  - Add/Edit/Delete services
  - Add/Edit/Delete projects
  - Secure API endpoints

## Tech Stack

### Frontend

- React 18 with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- Axios for API calls
- React Hot Toast for notifications

### Backend

- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- Express Validator for input validation

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd construction-firm-website
   ```

2. **Install dependencies**

   ```bash
   npm install
   npm run install-all
   ```

3. **Set up environment variables**
   Create a `.env` file in the backend directory:

   ```env
   PORT=5001
   MONGODB_URI=mongodb://localhost:27017/construction_firm
   JWT_SECRET=your_jwt_secret_key_here_change_this_in_production
   NODE_ENV=development
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system.

5. **Create admin user**

   ```bash
   cd backend
   node seeds/createAdmin.js
   ```

6. **Start the application**

   ```bash
   npm run dev
   ```

   This will start both frontend (http://localhost:3000) and backend (http://localhost:5001) concurrently.

## Project Structure

```
construction-firm-website/
├── frontend/                 # React TypeScript frontend
│   ├── public/
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── App.tsx          # Main App component
│   │   └── index.tsx        # Entry point
│   ├── package.json
│   └── tailwind.config.js
├── backend/                  # Node.js Express backend
│   ├── models/              # MongoDB models
│   ├── routes/              # API routes
│   ├── middleware/          # Auth middleware
│   ├── seeds/               # Database seeders
│   ├── server.js            # Main server file
│   └── package.json
├── package.json             # Root package.json
└── README.md
```

## API Endpoints

### Authentication

- `POST /api/auth/login` - Admin login
- `POST /api/auth/register` - Register admin (for setup)
- `GET /api/auth/me` - Get current user

### Services

- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get service by ID
- `POST /api/services` - Create service (Admin only)
- `PUT /api/services/:id` - Update service (Admin only)
- `DELETE /api/services/:id` - Delete service (Admin only)

### Projects

- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create project (Admin only)
- `PUT /api/projects/:id` - Update project (Admin only)
- `DELETE /api/projects/:id` - Delete project (Admin only)

## Admin Access

### Default Admin Credentials

- **Email:** admin@constructpro.com
- **Password:** admin123

⚠️ **Important:** Change these credentials after first login!

### Admin Features

1. **Login** at `/admin/login`
2. **Dashboard** at `/admin` (requires authentication)
3. **Manage Services** - Add, edit, delete construction services
4. **Manage Projects** - Add, edit, delete project portfolio

## Development

### Frontend Development

```bash
cd frontend
npm start
```

### Backend Development

```bash
cd backend
npm run dev
```

### Running Both

```bash
npm run dev
```

## Deployment

### Frontend

Build the frontend for production:

```bash
cd frontend
npm run build
```

### Backend

Set environment variables for production:

```env
NODE_ENV=production
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_strong_jwt_secret
```

### Environment Variables

Create a `.env` file in the backend directory with the following variables:

- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `NODE_ENV` - Environment (development/production)

## Features Overview

### Public Pages

- **Home:** Company overview, features, statistics, and call-to-action
- **Services:** Display all construction services with descriptions
- **Projects:** Showcase completed projects with categories
- **About:** Company story, values, and team information

### Admin Panel

- **Authentication:** Secure login system
- **Dashboard:** Manage services and projects
- **CRUD Operations:** Create, read, update, delete services and projects
- **Responsive Design:** Works on all devices

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, please contact the development team or open an issue in the repository.
