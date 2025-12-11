# Auth Flow Update - Signup vs Login

## Changes Made:

### 1. ✅ Auth Page - URL Parameter Support
**File:** `src/pages/Auth.tsx`

**What Changed:**
- Added URL parameter detection for `?mode=signup`
- Default mode is now determined by URL parameter
- If URL has `?mode=signup`, signup form shows first
- If no parameter or `?mode=login`, login form shows first

**Code:**
```typescript
const searchParams = new URLSearchParams(window.location.search);
const initialMode = searchParams.get('mode') === 'signup' ? 'signup' : 'login';
const [mode, setMode] = useState<AuthMode>(initialMode as AuthMode);
```

### 2. ✅ Landing Page - Button Updates
**File:** `src/pages/Landing.tsx`

**Buttons Updated:**

1. **"Start as F-Rank" (Hero Section)**
   - **Before:** `navigate('/auth')` → Shows login
   - **After:** `navigate('/auth?mode=signup')` → Shows signup ✅

2. **"Begin Your Journey" (Bottom CTA)**
   - **Before:** `navigate('/auth')` → Shows login
   - **After:** `navigate('/auth?mode=signup')` → Shows signup ✅

3. **"Login" Button (Hero Section)**
   - **Unchanged:** `navigate('/auth')` → Shows login ✅

4. **"Login" Button (Navbar)**
   - **Unchanged:** `navigate('/auth')` → Shows login ✅

## User Flow:

### New User Journey:
1. User lands on homepage
2. Clicks "Start as F-Rank" or "Begin Your Journey"
3. **Signup form appears** (not login)
4. User creates account
5. Redirected to onboarding

### Returning User Journey:
1. User lands on homepage
2. Clicks "Login" button (navbar or hero)
3. **Login form appears**
4. User logs in
5. Redirected to dashboard

## Testing:

- [x] "Start as F-Rank" → Opens signup form
- [x] "Begin Your Journey" → Opens signup form
- [x] "Login" buttons → Open login form
- [x] Users can still switch between forms manually
- [x] URL parameter persists across page

## Deploy:

```bash
git add .
git commit -m "Fix auth flow - signup buttons now open signup form"
git push
```
