# Setup Guide - Local Development

## Step-by-Step Installation

### 1. System Requirements
✅ Node.js v16+ ([Download](https://nodejs.org/))  
✅ Git ([Download](https://git-scm.com/))  
✅ Code editor (VS Code recommended)

### 2. Clone the Project
```bash
git clone <your-repo-url>
cd <project-name>
```

### 3. Install Dependencies

**If you have React 19 peer dependency issues**, use the legacy flag:
```bash
npm install --legacy-peer-deps
```

Otherwise:
```bash
npm install
```

### 4. Environment Setup

The `.env` file is already configured for local development:
```env
VITE_API_URL=http://localhost:3001/api
VITE_WS_URL=ws://localhost:3001
VITE_MOCK_API=true
```

**No changes needed for development!**

### 5. Start Development Server
```bash
npm run dev
```

Visit: `http://localhost:8080`

---

## Common Issues & Solutions

### ❌ Issue: `npm install` fails with peer dependency errors
**Solution:**
```bash
npm install --legacy-peer-deps
```

### ❌ Issue: Port 8080 already in use
**Solution:** Kill the process or change port in `vite.config.ts`:
```js
server: {
  port: 3000, // Change to any available port
}
```

### ❌ Issue: API connection errors
**Solutions:**
1. Check if `VITE_API_URL` is correct in `.env`
2. For development without backend, ensure `VITE_MOCK_API=true`
3. Check browser console for detailed error messages

### ❌ Issue: "Cannot find module" errors
**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### ❌ Issue: Blank white screen
**Solutions:**
1. Check browser console for errors
2. Clear browser cache: Ctrl+Shift+Delete
3. Restart dev server: Ctrl+C then `npm run dev`

---

## Understanding the Codebase

### Entry Point
`src/main.jsx` → Initializes React, Router, Query Client

### Main App Component  
`src/App.jsx` → Routes, Error Boundaries, Theme Provider

### Project Structure
```
src/
├── main.jsx              # Entry point ⭐
├── App.jsx               # Main app component ⭐
├── components/           # Reusable UI components
├── pages/               # Page components
│   ├── public/          # Landing, Contact, About
│   └── dashboard/       # User dashboards
├── services/            # API calls ⭐
│   └── api.js           # Unified API service
├── contexts/            # Global state
│   ├── AuthContext.jsx  # Authentication
│   └── ThemeProvider.jsx # Theme management
└── routes/              # Route configuration
```

### Key Files to Understand

**API Configuration:**
- `src/services/api.js` - All API calls go through here
- Automatically adds auth tokens
- Handles errors globally

**Authentication:**
- `src/contexts/AuthContext.jsx` - Login/logout logic
- Uses React Query for data fetching
- Stores token in localStorage

**Routing:**
- `src/routes/AppRoutes.jsx` - All application routes
- Protected routes check authentication

---

## Development Workflow

### Making Changes

1. **Edit component** in `src/pages/` or `src/components/`
2. **Save file** → Changes appear instantly (Hot Module Reload)
3. Check browser console for errors

### Adding New Pages

1. Create component in `src/pages/`
2. Add route in `src/routes/AppRoutes.jsx`
3. Add navigation link if needed

### API Integration

**Using existing API service:**
```jsx
import api, { endpoints } from '@/services/api';

// In your component
const fetchData = async () => {
  const response = await api.get(endpoints.schools);
  return response.data;
};
```

**Available endpoints:**
See `src/services/api.js` → `endpoints` object

---

## Building for Production

```bash
npm run build
```

Output goes to `dist/` folder.

**Preview production build:**
```bash
npm run preview
```

---

## Need Help?

1. Check browser console (F12)
2. Check terminal for errors
3. Review `README.md` for API documentation
4. Search issues on GitHub

---

## Quick Commands Reference

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start development
npm run dev

# Build for production  
npm run build

# Preview production build
npm run preview

# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

---

**Happy Coding! 🚀**
