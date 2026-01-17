# InternHub

A production-ready full-stack application for tracking internship applications from top companies worldwide.

## Tech Stack

- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (Admin + User roles)
- **HTTP Client**: Axios

## Features

- Browse internships from 30+ top tech companies
- User authentication (Login/Register)
- Track application status (Pending/Applied/Rejected)
- Apply flow with external redirect tracking
- Admin dashboard for managing companies
- Responsive design with modern UI

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/internhub
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

4. Start MongoDB (if running locally):
```bash
# macOS/Linux
mongod

# Windows
# Start MongoDB service from Services panel or run mongod.exe
```

5. Seed the database with companies:
```bash
npm run seed
```

6. Start the backend server:
```bash
# Development
npm run dev

# Production
npm run build
npm start
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (optional, defaults to localhost:5000):
```bash
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## Usage

1. **Register a new account** or **login** with existing credentials
2. **Browse internships** on the home page
3. **Click "Apply Now"** on any internship card
   - You'll be redirected to the company's career page
   - When you return to InternHub, a popup will ask if you applied
   - Confirm to mark your application status
4. **View your applications** in the Dashboard
5. **Admin users** can manage companies from the Admin Dashboard

## Creating an Admin User

To create an admin user, you can:

1. Register normally, then update the user role in MongoDB:
```javascript
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "ADMIN" } }
)
```

Or use the registration API with role parameter (requires backend modification).

## API Endpoints

### Public
- `GET /api/companies` - Get all active companies
- `GET /api/companies/:id` - Get company by ID
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### User (Protected)
- `POST /api/applications/apply` - Apply for internship
- `GET /api/applications/my` - Get user's applications
- `PATCH /api/applications/:id/status` - Update application status

### Admin (Protected)
- `POST /api/admin/company` - Create new company (via `/api/companies`)
- `DELETE /api/admin/company/:id` - Delete company (via `/api/companies/:id`)
- `PATCH /api/admin/company/:id/toggle` - Toggle company status (via `/api/companies/:id/toggle`)
- `GET /api/admin/applications` - Get all applications (via `/api/applications/admin/all`)

## Apply Flow Feature

The application includes a special feature for tracking external applications:

1. When a user clicks "Apply Now", the company data is saved to localStorage
2. The user is redirected to the external career URL
3. When the user returns to InternHub, the app checks localStorage
4. A popup appears asking: "Did you apply for this internship?"
5. User can confirm or dismiss
6. The popup only appears once per company

## Project Structure

```
backend/
├── src/
│   ├── models/          # MongoDB models
│   ├── controllers/     # Route controllers
│   ├── routes/          # API routes
│   ├── middlewares/     # Auth middleware
│   ├── seed/            # Database seed script
│   ├── utils/           # Utility functions
│   └── server.ts        # Express server

frontend/
├── src/
│   ├── components/      # React components
│   ├── pages/           # Page components
│   ├── services/        # API service layer
│   ├── context/         # React context
│   ├── hooks/           # Custom React hooks
│   └── types/           # TypeScript types
```

## License

MIT

## Author

Built as a production-ready full-stack application for tracking internship applications.
