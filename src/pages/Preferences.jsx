import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Preferences = () => {
  const navigate = useNavigate();
  const [budget, setBudget] = useState('Moderate');
  const [tripType, setTripType] = useState('Friends');
  const [location, setLocation] = useState('');
  const [duration, setDuration] = useState(3);

  const handleSubmit = () => {
    navigate('/results', {
      state: {
        location,
        days: duration,
        budget: budget.toLowerCase(),
      },
    });
  };

  return (
    <div
      className="h-screen w-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('/flower.jpg')` }}
    >
      <div className="w-full max-w-4xl bg-[#1a1a2ed8] p-10 rounded-xl shadow-lg text-white">
        <h2 className="text-3xl font-bold text-center mb-8">Plan Your Trip</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="flex flex-col items-center space-y-6"
        >
          <div className=" mr-[4.9rem]  max-w-md">
            <label className="  block mb-1 font-semibold"> Hotel Budget</label>
            <select
              className="  mx-auto px-4 py-2 rounded text-black"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            >
              <option>Cheap</option>
              <option>Moderate</option>
              <option>Luxury</option>
              <option>VIP</option>
            </select>
          </div>

          <div className=" mr-[6.5rem] max-w-md">
            <label className=" block mb-1 font-semibold">Trip Type</label>
            <select
              className=" px-4 py-2 rounded text-black"
              value={tripType}
              onChange={(e) => setTripType(e.target.value)}
            >
              <option>Friends</option>
              <option>Family</option>
              <option>Couple</option>
              <option>Solo</option>
            </select>
          </div>

          <div className="  max-w-md">
            <label className="block mb-1 font-semibold">Location</label>
            <input
              type="text"
              className="  px-4 py-2 rounded text-black"
              placeholder="e.g. Goa"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="  max-w-md">
            <label className="  block mb-1 font-semibold">Trip Duration (Days)</label>
            <input
              type="number"
              className="   px-4 py-2 rounded text-black"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className=" max-w-md bg-purple-700 hover:bg-purple-800 transition text-white font-semibold py-3 rounded-xl mt-6"
          >
            Search Preferences
          </button>
        </form>
      </div>
    </div>
  );
};

export default Preferences;



// import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';

// const Preferences = () => {
//   const navigate = useNavigate();
//   const [budget, setBudget] = useState('Moderate');
//   const [tripType, setTripType] = useState('Friends');
//   const [location, setLocation] = useState('');
//   const [duration, setDuration] = useState(3);

//   const handleSubmit = () => {
//     navigate('/results');
//   };

//   return (
//     <div
//       className="h-screen w-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
//       style={{ backgroundImage: `url('/man.jpg')` }}
//     >
//       <div
//         className="w-[40%] max-w-2xl bg-black bg-opacity-10 backdrop-blur-lg text-white rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 border border-white/20" // Changed bg-white to bg-black
//         style={{ backgroundImage: `url('/car.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
//       >
//         <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">Plan Your Trip</h2>

//         <div className="space-y-6">
//           <div>
//             <label className="block mb-1 font-semibold">Budget</label>
//             <select
//               className="w-[30rem] px-4 py-2 rounded text-black"
//               value={budget}
//               onChange={(e) => setBudget(e.target.value)}
//             >
//               <option>Cheap</option>
//               <option>Moderate</option>
//               <option>Luxury</option>
//               <option>VIP</option>
//             </select>
//           </div>

//           <div>
//             <label className="block mb-1 font-semibold">Trip Type</label>
//             <select
//               className="w-[30rem] px-4 py-2 rounded text-black"
//               value={tripType}
//               onChange={(e) => setTripType(e.target.value)}
//             >
//               <option>Friends</option>
//               <option>Family</option>
//               <option>Couple</option>
//               <option>Solo</option>
//             </select>
//           </div>

//           <div>
//             <label className="block mb-10 font-semibold">Location</label>
//             <input
//               type="text"
//               className="w-[30rem] px-4 py-2 rounded text-black"
//               placeholder="e.g. Goa"
//               value={location}
//               onChange={(e) => setLocation(e.target.value)}
//             />
//           </div>

//           <div>
//             <label className="block mb-1 font-semibold">Trip Duration (Days)</label>
//             <input
//               type="number"
//               className="w-[15rem] px-4 py-2 rounded text-black"
//               value={duration}
//               onChange={(e) => setDuration(e.target.value)}
//             />
//           </div>
//         </div>

//         <button
//           onClick={handleSubmit}
//           className="mb-[1rem] ml-[6rem] mt-8 w-[26rem] bg-purple-700 hover:bg-purple-800 transition text-white font-semibold py-3 rounded-xl"
//         >
//           Search Preferences
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Preferences;