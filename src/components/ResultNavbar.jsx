
import { useNavigate } from 'react-router-dom';

const ResultNavbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="mb-[-1rem] mt-[-1rem] mr-[4rem] bg-black bg-opacity-50 px-6 py-4 flex justify-between items-center">
      <h1 className="ml-[2rem] text-xl font-bold text-white cursor-pointer" onClick={() => navigate('/')}>GuideMe</h1>
      <button
        onClick={() => navigate('/')}
        className="bg-purple-700 hover:bg-purple-800 transition text-white px-4 py-2 rounded shadow"
      >
        Logout
      </button>
    </nav>
  );
};

export default ResultNavbar;
