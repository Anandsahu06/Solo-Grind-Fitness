# Deployment Guide for Solo Grind Fitness

This guide will help you deploy your full-stack application (Frontend + Backend) publicly for free.

## Prerequisites

1.  **GitHub Account** (to push your code).
2.  **Vercel Account** (for Frontend).
3.  **Render Account** (for Backend).
4.  **MongoDB Atlas** URI (Your database is already cloud-hosted, so just keep the connection string handy).

---

## Step 1: Push Code to GitHub

I have already initialized the local git repository for you. You just need to push it to a new remote repository.

1.  Go to [github.com/new](https://github.com/new).
2.  Create a repository named `solo-grind-fitness`.
3.  **Do not** check "Add a README", ".gitignore", or "license". Create an empty repo.
4.  Copy the URL (e.g., `https://github.com/YOUR_USERNAME/solo-grind-fitness.git`).
5.  Run these commands in your terminal (I can run them if you provide the URL):

```bash
git remote add origin https://github.com/YOUR_USERNAME/solo-grind-fitness.git
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy Backend to Render

We will deploy the backend first to get the `API_URL`.

1.  Log in to [Render Dashboard](https://dashboard.render.com).
2.  Click **New +** -> **Web Service**.
3.  Connect your GitHub account and select the `solo-grind-fitness` repo.
4.  **Configuration:**
    *   **Name:** `solo-grind-backend`
    *   **Root Directory:** `backend` (Important!)
    *   **Runtime:** Node
    *   **Build Command:** `npm install`
    *   **Start Command:** `node server.js`
    *   **Plan:** Free
5.  **Environment Variables** (Add these):
    *   `MONGO_URI`: `your_mongodb_connection_string` (Copy from your local .env)
    *   `JWT_SECRET`: `your_jwt_secret`
    *   `PORT`: `5000` (Render might overwrite this, but good to have)
    *   `FRONTEND_URL`: `https://solo-grind-fitness.vercel.app` (You will get this in Step 3, you can come back and update it later).
6.  Click **Create Web Service**.
7.  Wait for deploy. Render will give you a URL like `https://solo-grind-backend.onrender.com`. **Copy this URL.**

---

## Step 3: Deploy Frontend to Vercel

1.  Log in to [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click **Add New...** -> **Project**.
3.  Import the `solo-grind-fitness` repo.
4.  **Configuration:**
    *   **Framework Preset:** Vite (Should detect automatically).
    *   **Root Directory:** `./` (Default).
5.  **Environment Variables:**
    *   `VITE_API_URL`: Paste your Render Backend URL here (e.g., `https://solo-grind-backend.onrender.com/api`).
    *   **Important:** Append `/api` to the end if your backend routes are prefixed with /api.
6.  Click **Deploy**.

---

## Step 4: Final Connection

1.  Once Vercel deploys, copy your new Frontend URL (e.g., `https://solo-grind-fitness.vercel.app`).
2.  Go back to **Render Dashboard** -> **Environment**.
3.  Update/Add `FRONTEND_URL` to match your Vercel URL.
4.  Adding this ensures CORS (Cross-Origin Resource Sharing) allows your frontend to talk to your backend.

---

## Step 5: Verify

Open your Vercel URL.
1.  Try **Registering** a new account.
2.  Check if you can log in.
3.  Check if "Donation Page" QR code works.

**Enjoy your live S-Rank App!**
