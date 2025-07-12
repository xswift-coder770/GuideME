import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import LoginPage from './pages/LoginPage';
import Preferences from './pages/Preferences';
import ItineraryResult from './pages/ItineraryResult';

import Navbar from './components/Navbar'; // ✅ single consistent navbar

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#1F1B2E] text-white font-sans">
        {/* ✅ Always show Navbar */}
        <Navbar />

        {/* ✅ App Routes */}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/preferences" element={<Preferences />} />
          <Route path="/results" element={<ItineraryResult />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
