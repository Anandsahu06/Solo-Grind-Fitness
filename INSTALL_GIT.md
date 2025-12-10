# How to Install Git (Required for Deployment)

It looks like **Git is not installed** on your computer. You need it to push your code to GitHub.

## Step 1: Download Git
1. Go to this URL: [https://git-scm.com/download/win](https://git-scm.com/download/win)
2. Click on **"Click here to download"** (or select "64-bit Git for Windows Setup").

## Step 2: Install
1. Run the downloaded installer (`Git-....exe`).
2. **Click "Next"** through all the options (The default settings are fine).
3. Wait for the installation to finish.

## Step 3: Restart VS Code (Important!)
1. **Close VS Code completely.**
2. Open VS Code again.
3. Open your terminal (`Ctrl + ~`).

## Step 4: Verify
Type this in the terminal:
```bash
git --version
```
If it shows something like `git version 2.43.0`, you are ready!

## Step 5: Push Your Code
Now you can run the commands I gave you earlier:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/Anandsahu06/Solo-Grind-Fitness.git
git push -u origin main
```
