 

 
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Landing from './pages/Landing';
import LoginPage from './pages/LoginPage';
import Preferences from './pages/Preferences';
import ItineraryResult from './pages/ItineraryResult';

import Navbar from './components/Navbar';
import ResultNavbar from './components/ResultNavbar';
import PrefNavigation from './components/PrefNav';  

 
const Layout = ({ children }) => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <>
      {path === '/results' ? (
        <ResultNavbar />
      ) : path === '/preferences' ? (
        <PrefNavigation />
      ) : (
        <Navbar />
      )}
      {children}
    </>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#1F1B2E] text-white font-sans">
        <Layout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/preferences" element={<Preferences />} />
            <Route path="/results" element={<ItineraryResult />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
