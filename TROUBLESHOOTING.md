# Troubleshooting: Companies Not Showing

If you see "0 Active Internships" and no companies are displayed, follow these steps:

## Step 1: Check if Backend Server is Running

Open a terminal and run:
```bash
cd backend
npm run dev
```

You should see:
```
Connected to MongoDB
Server running on port 5000
```

If you see connection errors, proceed to Step 2.

## Step 2: Check if MongoDB is Running

### Windows:
- Open Services (Win + R, type `services.msc`)
- Look for "MongoDB" service
- Make sure it's running
- OR start MongoDB manually:
```bash
mongod
```

### macOS/Linux:
```bash
# Check if MongoDB is running
sudo systemctl status mongod
# OR
brew services list  # for macOS with Homebrew

# Start MongoDB if not running
sudo systemctl start mongod
# OR
brew services start mongodb-community  # for macOS
```

## Step 3: Seed the Database

Once MongoDB is running and backend is connected, seed the database:

```bash
cd backend
npm run seed
```

You should see:
```
Connected to MongoDB
Cleared existing companies
Successfully seeded 30 companies
```

## Step 4: Verify Backend API is Working

Open your browser and go to:
```
http://localhost:5000/api/companies
```

You should see a JSON array with 30 companies. If you see an empty array `[]`, the database needs to be seeded.

## Step 5: Check Frontend Connection

Make sure your frontend is running:
```bash
cd frontend
npm run dev
```

The frontend should be running on `http://localhost:3000` and the backend on `http://localhost:5000`.

## Step 6: Check Browser Console

Open browser DevTools (F12) and check the Console tab for any errors:
- Network errors: Backend not running or wrong URL
- CORS errors: Backend CORS not configured properly
- 404 errors: API route not found

## Common Issues:

### Issue: "Cannot connect to MongoDB"
**Solution**: Make sure MongoDB is installed and running.

### Issue: "EADDRINUSE: address already in use :::5000"
**Solution**: Another process is using port 5000. Kill it or change the port in `.env`.

### Issue: Backend running but no companies showing
**Solution**: Run `npm run seed` in the backend folder.

### Issue: Frontend shows "0 Active Internships"
**Solutions**:
1. Check browser console for API errors
2. Verify backend is running on port 5000
3. Make sure companies are seeded and have `isActive: true`
4. Check network tab in DevTools to see if API call is successful

## Quick Fix Commands:

```bash
# Terminal 1: Start MongoDB (if needed)
mongod

# Terminal 2: Start Backend
cd backend
npm install  # if not done already
npm run seed  # seed the database
npm run dev

# Terminal 3: Start Frontend
cd frontend
npm install  # if not done already
npm run dev
```

## Verify Everything is Working:

1. Backend API: http://localhost:5000/api/companies (should return JSON)
2. Frontend: http://localhost:3000 (should show companies)
3. Check console logs for any errors
