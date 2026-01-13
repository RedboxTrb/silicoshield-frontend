# Frontend Deployment Guide - SilicoShieldAI

Deploy the React frontend to free hosting platforms while keeping the backend on your GPU server.

---

## Prerequisites

1. **Backend running on GPU server** with public IP or domain
2. **GitHub account** (required for all platforms)
3. **Node.js 18+** installed locally

---

## Option 1: Vercel (Recommended) ⭐

**Best for:** React apps, automatic deployments, global CDN

### Deploy to Vercel

1. **Push code to GitHub:**
```bash
cd /home/phdremotek/vdata/silicosis/Website
git init
git add .
git commit -m "SilicoShieldAI frontend"

# Create GitHub repo (requires gh CLI)
gh repo create silicoshield-frontend --public --source=. --push

# Or manually:
# Create repo on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/silicoshield-frontend.git
git branch -M main
git push -u origin main
```

2. **Deploy on Vercel:**
   - Go to https://vercel.com
   - Sign in with GitHub
   - Click **"New Project"**
   - Import your `silicoshield-frontend` repository
   - Configure build settings:
     - **Framework Preset:** Vite
     - **Root Directory:** `./`
     - **Build Command:** `npm run build`
     - **Output Directory:** `build`
     - **Install Command:** `npm install`

3. **Add Environment Variable:**
   - In Vercel project settings → Environment Variables
   - Add: `VITE_API_URL` = `http://YOUR_GPU_IP:5000`
   - Example: `VITE_API_URL=http://123.45.67.89:5000`

4. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes for build
   - Your app will be live at `https://your-project.vercel.app`

### Auto-deploy on Git push
Every time you push to GitHub, Vercel will automatically rebuild and deploy!

---

## Option 2: Netlify

**Best for:** Static sites, easy setup, generous free tier

### Deploy to Netlify

1. **Push code to GitHub** (same as Vercel step 1)

2. **Deploy on Netlify:**
   - Go to https://netlify.com
   - Sign in with GitHub
   - Click **"Add new site"** → **"Import an existing project"**
   - Connect to GitHub and select your repository
   - Configure build settings:
     - **Base directory:** (leave empty)
     - **Build command:** `npm run build`
     - **Publish directory:** `build`

3. **Add Environment Variable:**
   - Site settings → Environment variables
   - Add: `VITE_API_URL` = `http://YOUR_GPU_IP:5000`

4. **Deploy:**
   - Click "Deploy site"
   - Your app will be live at `https://random-name.netlify.app`
   - You can customize the subdomain in Site settings

---

## Option 3: Cloudflare Pages

**Best for:** Fastest CDN, great performance worldwide

### Deploy to Cloudflare Pages

1. **Push code to GitHub** (same as Vercel step 1)

2. **Deploy on Cloudflare:**
   - Go to https://pages.cloudflare.com
   - Sign in / Create account
   - Click **"Create a project"** → **"Connect to Git"**
   - Connect GitHub and select repository
   - Configure build settings:
     - **Framework preset:** Vite
     - **Build command:** `npm run build`
     - **Build output directory:** `build`

3. **Add Environment Variable:**
   - Settings → Environment variables
   - Add: `VITE_API_URL` = `http://YOUR_GPU_IP:5000`

4. **Deploy:**
   - Click "Save and Deploy"
   - Your app will be live at `https://your-project.pages.dev`

---

## Option 4: GitHub Pages (Free, but requires public repo)

**Best for:** Simple deployment, no external account needed

### Deploy to GitHub Pages

1. **Update `vite.config.ts`:**
```typescript
export default defineConfig({
  plugins: [react()],
  base: '/silicoshield-frontend/',  // Replace with your repo name
  build: {
    outDir: 'build',
  },
});
```

2. **Install gh-pages:**
```bash
npm install --save-dev gh-pages
```

3. **Add deployment scripts to `package.json`:**
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

4. **Deploy:**
```bash
npm run deploy
```

5. **Enable GitHub Pages:**
   - Go to repo Settings → Pages
   - Source: `gh-pages` branch
   - Your app will be at `https://YOUR_USERNAME.github.io/silicoshield-frontend/`

---

## Backend Configuration (Your GPU Server)

### 1. Ensure Backend is Accessible

Your backend must be accessible from the internet. Check:

```bash
# On your GPU server
curl http://localhost:5000/api/health
```

If this works locally but not from outside:
- Open port 5000 in your firewall
- Configure port forwarding on your router
- Or use a reverse proxy (nginx, Cloudflare Tunnel)

### 2. Update Backend CORS

The backend already has CORS enabled for API routes. Verify in `backend/app.py`:

```python
CORS(app, resources={r"/api/*": {"origins": "*"}})
```

This allows requests from any frontend domain.

### 3. Start Backend Server

```bash
cd /home/phdremotek/vdata/silicosis/backend
source /home/phdremotek/miniconda3/etc/profile.d/conda.sh
conda activate silicosis
gunicorn --bind 0.0.0.0:5000 --workers 2 --timeout 120 app:app
```

---

## Testing After Deployment

1. **Visit your deployed frontend URL**
2. **Upload an X-ray image**
3. **Check browser console** (F12) for any API errors
4. **Verify analysis works**

Common issues:
- **CORS errors:** Ensure backend CORS is enabled
- **API not found:** Check `VITE_API_URL` environment variable
- **Connection refused:** Ensure backend is running and accessible

---

## Updating Your Deployment

### For Vercel/Netlify/Cloudflare:
```bash
cd /home/phdremotek/vdata/silicosis/Website
git add .
git commit -m "Update frontend"
git push origin main
```
The platform will automatically rebuild and deploy!

### For GitHub Pages:
```bash
npm run deploy
```

---

## Cost Comparison

| Platform | Free Tier | Bandwidth | Build Minutes | Custom Domain |
|----------|-----------|-----------|---------------|---------------|
| **Vercel** | 100GB/mo | Fast | 6000 min/mo | ✅ Free |
| **Netlify** | 100GB/mo | Fast | 300 min/mo | ✅ Free |
| **Cloudflare** | Unlimited | Fastest | 500 builds/mo | ✅ Free |
| **GitHub Pages** | 100GB/mo | Medium | N/A | ✅ Free |

**Recommendation:** Use Vercel for the best developer experience and performance.

---

## Advanced: Using a Custom Domain

All platforms support free custom domains:

1. **Buy a domain** (e.g., from Namecheap, Cloudflare)
2. **Add DNS records** pointing to your platform
3. **Configure in platform settings**

Example for Vercel:
- Vercel Dashboard → Project → Settings → Domains
- Add your domain (e.g., `silicoshield.com`)
- Update DNS with provided records
- SSL certificate is automatic!

---

## Security Notes

- **HTTPS:** All platforms provide free HTTPS automatically
- **Backend Security:** Consider using HTTPS for your backend too (use Cloudflare Tunnel or Let's Encrypt)
- **API Keys:** Never commit API keys to GitHub
- **Environment Variables:** Always use environment variables for sensitive data

---

## Troubleshooting

### Build fails on deployment:
- Check Node.js version (should be 18+)
- Verify `package.json` has all dependencies
- Check build logs for specific errors

### API calls fail:
- Verify `VITE_API_URL` is set correctly
- Check backend is running: `curl http://YOUR_IP:5000/api/health`
- Ensure firewall allows port 5000
- Check browser console for CORS errors

### Images don't load:
- Check CSP headers in backend `app.py`
- Verify blob URLs are allowed
- Check browser console for errors

---

## Support

- **Vercel Docs:** https://vercel.com/docs
- **Netlify Docs:** https://docs.netlify.com
- **Cloudflare Pages:** https://developers.cloudflare.com/pages
- **GitHub Pages:** https://pages.github.com
