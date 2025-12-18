# Railway Deployment Guide

## 🚀 Quick Deploy to Railway

### Prerequisites
- GitHub account
- Railway account (sign up at [railway.app](https://railway.app))
- Your code pushed to GitHub

---

## Step 1: Push to GitHub

If you haven't already, push your code to GitHub:

```bash
git init
git add .
git commit -m "Production ready for Railway deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

---

## Step 2: Create Railway Project

1. Go to [railway.app](https://railway.app)
2. Click **"Start a New Project"**
3. Select **"Deploy from GitHub repo"**
4. Authorize Railway to access your GitHub
5. Select your repository: `mid-saadshahz`
6. Click **"Deploy Now"**

---

## Step 3: Configure Environment Variables

After deployment starts, configure these environment variables:

1. Click on your project
2. Go to **"Variables"** tab
3. Add the following variables:

```
NODE_ENV=production
PORT=5000
GEMINI_API_KEY=your-gemini-api-key-here
AI_MODEL=gemini-1.5-flash
```

**Important**: 
- Get your Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
- The `PORT` variable is automatically set by Railway, but we include it for clarity

---

## Step 4: Deploy

1. Railway will automatically detect your `railway.json` config
2. It will run the build command: `cd backend && npm install && npm run build`
3. This installs backend dependencies, then builds the frontend
4. Then it starts with: `cd backend && npm start`

**Build time**: First deployment takes 3-5 minutes

---

## Step 5: Verify Deployment

Once deployed, Railway will provide a URL like: `https://your-app.up.railway.app`

### Test these endpoints:

1. **Health Check**: `https://your-app.up.railway.app/health`
   - Should return: `{"status":"healthy",...}`

2. **Frontend**: `https://your-app.up.railway.app/`
   - Should load your app with the beautiful purple/cyan UI

3. **API**: `https://your-app.up.railway.app/api/sample`
   - Should return sample data

---

## 🔧 Troubleshooting

### Build Fails

**Error**: `npm install` fails
- **Solution**: Check that `package.json` is correct in both backend and frontend

**Error**: Frontend build fails
- **Solution**: Ensure all frontend dependencies are in `package.json`
- Run `cd frontend && npm install && npm run build` locally to test

### App Crashes on Start

**Error**: "Cannot find module"
- **Solution**: Make sure `postinstall` script ran successfully
- Check Railway logs for specific missing module

**Error**: "ENOENT: no such file or directory, stat '../frontend/dist'"
- **Solution**: Frontend build didn't complete. Check build logs

### AI Suggestions Not Working

**Error**: Getting fallback suggestions only
- **Solution**: Check that `GEMINI_API_KEY` is set in Railway variables
- Verify API key is valid at [Google AI Studio](https://makersuite.google.com/app/apikey)

### CORS Errors

**Error**: "CORS policy: No 'Access-Control-Allow-Origin'"
- **Solution**: This shouldn't happen since frontend and backend are on same domain
- If it does, add `FRONTEND_URL` environment variable with your Railway URL

---

## 📊 Monitoring

### View Logs

1. Go to your Railway project
2. Click on your service
3. Go to **"Deployments"** tab
4. Click on latest deployment
5. View **"Build Logs"** and **"Deploy Logs"**

### Check Metrics

Railway provides:
- CPU usage
- Memory usage
- Network traffic
- Request count

---

## 🔄 Redeployment

### Automatic Redeployment

Railway automatically redeploys when you push to GitHub:

```bash
git add .
git commit -m "Update feature"
git push
```

### Manual Redeployment

1. Go to Railway dashboard
2. Click your service
3. Click **"Redeploy"**

---

## 💰 Cost Considerations

**Railway Free Tier**:
- $5 free credit per month
- Enough for development and small projects
- App sleeps after inactivity (wakes on request)

**To prevent sleeping**:
- Upgrade to Hobby plan ($5/month)
- Or use a service like UptimeRobot to ping your app

---

## 🎓 For University Presentation

Your deployed app demonstrates:

✅ **Full-Stack Development**: React frontend + Express backend  
✅ **AI Integration**: Google Gemini for personalized suggestions  
✅ **Modern UI/UX**: Animated gradients, glassmorphism  
✅ **Data Analysis**: Time distribution and habit tracking  
✅ **Production Deployment**: Live on Railway  
✅ **RESTful API**: Clean API architecture  

**Share your Railway URL** with professors and classmates! 🚀

---

## 📝 Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `NODE_ENV` | Yes | Environment mode | `production` |
| `PORT` | Auto | Server port (Railway sets this) | `5000` |
| `GEMINI_API_KEY` | Optional | Google Gemini API key | `AIza...` |
| `AI_MODEL` | Optional | AI model to use | `gemini-1.5-flash` |

---

## 🆘 Need Help?

- **Railway Docs**: [docs.railway.app](https://docs.railway.app)
- **Railway Discord**: Join for community support
- **Check Logs**: Always check build and deploy logs first

---

## ✅ Post-Deployment Checklist

- [ ] App loads at Railway URL
- [ ] Health check endpoint returns healthy
- [ ] Can input activities and goals
- [ ] Analysis generates suggestions
- [ ] History view works
- [ ] UI looks correct (purple/cyan theme)
- [ ] Mobile responsive
- [ ] No console errors

**Congratulations! Your app is live! 🎉**
