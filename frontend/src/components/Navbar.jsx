
 
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="       bg-black bg-opacity-50 px-6 py-4 flex justify-between items-center">
      <h1 className=" text-xl font-bold text-white cursor-pointer" onClick={() => navigate('/')}>GuideMe</h1>
      <button
        onClick={() => navigate('/login')}
        className="bg-purple-700 hover:bg-purple-800 transition text-white px-4 py-2 rounded shadow"
      >
        Login
      </button>
    </nav>
  );
};

export default Navbar;
