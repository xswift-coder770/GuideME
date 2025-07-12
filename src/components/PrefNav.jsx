 
import { useNavigate } from 'react-router-dom';

const PrefNavigation = () => {
  const navigate = useNavigate();

  return (
    <nav className="mb-[-1rem] mt-[-1rem] mr-[4rem] bg-black bg-opacity-50 px-6 py-4 flex justify-between items-center">
      <h1 className="ml-[2rem] text-xl font-bold text-white cursor-pointer" onClick={() => navigate('/')}>GuideMe</h1>
    </nav>
  );
};

export default PrefNavigation;
