import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Quests from './pages/Quests';
import Dungeon from './pages/Dungeon';
import Profile from './pages/Profile';
import Guilds from './pages/Guilds';
import Settings from './pages/Settings';
import DonationPage from './pages/DonationPage';

import Onboarding from './pages/Onboarding';
import ActiveDungeon from './pages/ActiveDungeon';
import InfoPage from './pages/InfoPage';

function App() {
  return (
    <AuthProvider>
      <GameProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/donate" element={<DonationPage />} />
            <Route path="/onboarding" element={<Onboarding />} />

            {/* Info Pages */}
            <Route path="/about" element={<InfoPage title="About Us" />} />
            <Route path="/privacy-policy" element={<InfoPage title="Privacy Policy" />} />
            <Route path="/terms-of-service" element={<InfoPage title="Terms of Service" />} />
            <Route path="/cookie-policy" element={<InfoPage title="Cookie Policy" />} />

            {/* Protected Routes */}
            <Route path="/dungeon/active" element={
              <ProtectedRoute>
                <ActiveDungeon />
              </ProtectedRoute>
            } />
            <Route path="/*" element={
              <ProtectedRoute>
                <Layout>
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/quests" element={<Quests />} />
                    <Route path="/dungeon" element={<Dungeon />} />
                    <Route path="/guilds" element={<Guilds />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/settings" element={<Settings />} />
                  </Routes>
                </Layout>
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </GameProvider>
    </AuthProvider>
  );
}

export default App;
