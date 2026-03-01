# Deployment Guide

## Local Testing

### 1. Test Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
Visit: http://localhost:8000/docs (FastAPI auto-generated docs)

### 2. Test Frontend
Open `frontend/index.html` in your browser

---

## Deploy to Render (Backend)

1. Push code to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com/)
3. Click "New +" → "Web Service"
4. Connect your GitHub repo
5. Configure:
   - **Name**: food-predictor-api
   - **Root Directory**: `backend`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Instance Type**: Free
6. Add Environment Variable (if needed)
7. Click "Create Web Service"
8. Copy your Render URL (e.g., `https://food-predictor-api.onrender.com`)

---

## Deploy to Vercel (Frontend)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Import your GitHub repo
4. Configure:
   - **Framework Preset**: Other
   - **Root Directory**: `frontend`
   - **Build Command**: (leave empty)
   - **Output Directory**: (leave empty)
5. Click "Deploy"

### Update API URL
After deploying backend, update `frontend/script.js`:
```javascript
const API_URL = 'https://your-render-url.onrender.com';
```
Then redeploy frontend.

---

## Important Notes

- Model file must be in `models/` folder
- First request on Render free tier may be slow (cold start)
- Update CORS in `backend/main.py` with your Vercel URL for production
