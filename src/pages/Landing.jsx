import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col justify-between overflow-hidden"
      style={{
        height: '100vh',
        width: '100vw',
        backgroundImage: `url('/man.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="flex-grow flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-5xl font-bold mb-4 drop-shadow-md">Welcome to GuideMe</h1>
        <p className="text-lg mb-8 max-w-xl drop-shadow-md">
          Your personal travel itinerary planner. Plan, customize, and enjoy your journey.
        </p>
        <button
          onClick={() => navigate('/login')}
          className="bg-purple-700 hover:bg-purple-800 transition text-white px-6 py-3 rounded-xl shadow-lg"
        >
          Get Started
        </button>
      </div>
      <footer className="bg-black bg-opacity-40 py-4 text-center">
        <p className="text-sm">© 2025 GuideMe. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;