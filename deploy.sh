#!/bin/bash

# SilicoShieldAI - Frontend Deployment Helper Script

echo "========================================="
echo "SilicoShieldAI - Frontend Deployment"
echo "========================================="
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "Initializing git repository..."
    git init
    echo "✓ Git initialized"
else
    echo "✓ Git repository exists"
fi

echo ""
echo "Please enter your backend GPU server IP or domain:"
read -p "Backend URL (e.g., http://123.45.67.89:5000): " BACKEND_URL

# Create or update .env.production
echo "VITE_API_URL=$BACKEND_URL" > .env.production
echo "✓ Created .env.production with backend URL: $BACKEND_URL"

echo ""
echo "Choose deployment platform:"
echo "1) Vercel (Recommended - Best for React)"
echo "2) Netlify (Great alternative)"
echo "3) Cloudflare Pages (Fastest CDN)"
echo "4) GitHub Pages (Simple, free)"
echo "5) Just prepare files (I'll deploy manually)"

read -p "Enter choice (1-5): " CHOICE

case $CHOICE in
    1|2|3|4)
        echo ""
        echo "Preparing git repository..."

        # Add all files
        git add .

        # Create commit
        read -p "Enter commit message (default: 'Initial frontend deployment'): " COMMIT_MSG
        COMMIT_MSG=${COMMIT_MSG:-"Initial frontend deployment"}

        git commit -m "$COMMIT_MSG" || echo "No changes to commit"

        echo ""
        echo "✓ Repository prepared!"
        echo ""
        echo "Next steps:"
        echo "==========================================="

        case $CHOICE in
            1)
                echo "VERCEL DEPLOYMENT:"
                echo "1. Create GitHub repo and push:"
                echo "   gh repo create silicoshield-frontend --public --source=. --push"
                echo ""
                echo "2. Go to https://vercel.com"
                echo "3. Sign in with GitHub"
                echo "4. Click 'New Project' and import your repo"
                echo "5. Add environment variable: VITE_API_URL=$BACKEND_URL"
                echo "6. Deploy!"
                ;;
            2)
                echo "NETLIFY DEPLOYMENT:"
                echo "1. Create GitHub repo and push:"
                echo "   gh repo create silicoshield-frontend --public --source=. --push"
                echo ""
                echo "2. Go to https://netlify.com"
                echo "3. Sign in with GitHub"
                echo "4. Click 'Add new site' → 'Import project'"
                echo "5. Add environment variable: VITE_API_URL=$BACKEND_URL"
                echo "6. Deploy!"
                ;;
            3)
                echo "CLOUDFLARE PAGES DEPLOYMENT:"
                echo "1. Create GitHub repo and push:"
                echo "   gh repo create silicoshield-frontend --public --source=. --push"
                echo ""
                echo "2. Go to https://pages.cloudflare.com"
                echo "3. Click 'Create a project' → 'Connect to Git'"
                echo "4. Select your repo"
                echo "5. Add environment variable: VITE_API_URL=$BACKEND_URL"
                echo "6. Deploy!"
                ;;
            4)
                echo "GITHUB PAGES DEPLOYMENT:"
                echo "1. Install gh-pages:"
                echo "   npm install --save-dev gh-pages"
                echo ""
                echo "2. Create GitHub repo and push:"
                echo "   gh repo create silicoshield-frontend --public --source=. --push"
                echo ""
                echo "3. Deploy:"
                echo "   npm run deploy"
                echo ""
                echo "4. Enable Pages in repo Settings → Pages"
                ;;
        esac
        ;;
    5)
        echo ""
        echo "✓ Files prepared for manual deployment"
        echo "See DEPLOYMENT_GUIDE.md for detailed instructions"
        ;;
    *)
        echo "Invalid choice"
        exit 1
        ;;
esac

echo ""
echo "==========================================="
echo "📚 Full guide: DEPLOYMENT_GUIDE.md"
echo "==========================================="
