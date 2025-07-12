// import { useNavigate } from 'react-router-dom';

// const Landing = () => {
//   const navigate = useNavigate();

//   return (
//     <div
//       className="flex flex-col justify-between overflow-hidden"
//       style={{
//         height: '100vh',
//         width: '100vw',
//         backgroundImage: `url('/man.jpg')`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat',
//       }}
//     >
//       <div className="flex-grow flex flex-col justify-center items-center text-center px-4">
//         <h1 className="text-5xl font-bold mb-4 drop-shadow-md">Welcome to GuideMe</h1>
//         <p className="text-lg mb-8 max-w-xl drop-shadow-md">
//           Your personal travel itinerary planner. Plan, customize, and enjoy your journey.
//         </p>
//         <button
//           onClick={() => navigate('/login')}
//           className="bg-purple-700 hover:bg-purple-800 transition text-white px-6 py-3 rounded-xl shadow-lg"
//         >
//           Get Started
//         </button>
//       </div>
//       <footer className="bg-black bg-opacity-40 py-4 text-center">
//         <p className="text-sm">© 2025 GuideMe. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default Landing;





//new code 

import { useNavigate } from 'react-router-dom';
import SplitText from '../components/SplitText';
import RollingGallery from '../components/RollingGallery';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-screen bg-[#0a0112] text-white flex flex-col items-center justify-between overflow-hidden">
      {/* Top Section: Logo and Text */}
      <div className="flex flex-col items-center justify-center flex-grow mt-12 z-10">
        {/* Static Heading */}
        <h1 className="text-6xl md:text-7xl font-extrabold text-center mb-6">
          Guide<span className="text-purple-500">Me</span>
        </h1>

        {/* Subheading with SplitText */}
        <div className="text-xl md:text-2xl font-medium text-center mb-10 px-4">
          <SplitText text="Plan, Customize, and Enjoy your journey ✈️" />
        </div>

        {/* Get Started Button */}
        <button
          onClick={() => navigate('/login')}
          className="bg-purple-700 hover:bg-purple-800 transition text-white px-8 py-4 rounded-2xl shadow-xl font-semibold text-lg hover:scale-105"
        >
          Get Started
        </button>
      </div>

      {/* Bottom Rolling Gallery */}
      <div className="w-full px-4 py-6 z-0 flex justify-center">
        <div className="max-w-6xl w-full">
          <RollingGallery
            images={[
              '/gallery/img1.jpg',
              '/gallery/img2.jpg',
              '/gallery/img3.jpg',
              '/gallery/img4.jpg',
              '/gallery/img5.jpg',
              '/gallery/img6.jpg',
              '/gallery/img7.jpg',
            ]}
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-2 text-sm text-gray-400 text-center z-10">
        © 2025 GuideMe. All rights reserved.
      </footer>
    </div>
  );
};

export default Landing;
