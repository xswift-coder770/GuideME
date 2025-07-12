import { useNavigate } from 'react-router-dom';
import { useState, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/24/solid';
import SplashCursor from '../components/SplashCursor'; // ✅ Custom cursor effect

const Preferences = () => {
  const navigate = useNavigate();

  const budgetOptions = ['Cheap', 'Moderate', 'Luxury', 'VIP'];
  const tripOptions = ['Friends', 'Family', 'Couple', 'Solo'];

  const [budget, setBudget] = useState(budgetOptions[1]);
  const [tripType, setTripType] = useState(tripOptions[0]);
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
    <div className="h-screen w-screen flex items-center justify-center bg-[#0e071b] relative overflow-hidden">
      {/* ✅ Splash Cursor Effect */}
      <SplashCursor />

      {/* ✅ Glassmorphic Form Container */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-10 w-[90%] max-w-3xl text-white z-10">
        <h2 className="text-4xl font-extrabold text-center mb-10 drop-shadow-xl">
          🌙 Plan Your Dream Trip
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-6"
        >
          {/* Hotel Budget Dropdown */}
          <div>
            <label className="block mb-2 font-semibold text-lg">🏨 Hotel Budget</label>
            <Listbox value={budget} onChange={setBudget}>
              <div className="relative">
                <Listbox.Button className="w-full px-5 py-3 rounded-xl bg-white/80 text-black shadow-md hover:shadow-lg transition flex justify-between items-center">
                  {budget}
                  <ChevronUpDownIcon className="w-5 h-5 text-gray-700" />
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 w-full rounded-xl bg-white shadow-lg z-10">
                    {budgetOptions.map((option, index) => (
                      <Listbox.Option
                        key={index}
                        value={option}
                        className={({ active }) =>
                          `cursor-pointer select-none px-5 py-3 ${
                            active ? 'bg-purple-200 text-black' : 'text-black'
                          }`
                        }
                      >
                        {({ selected }) => (
                          <span className="flex justify-between">
                            {option}
                            {selected && <CheckIcon className="w-5 h-5 text-purple-700" />}
                          </span>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>

          {/* Trip Type Dropdown */}
          <div>
            <label className="block mb-2 font-semibold text-lg">🧳 Trip Type</label>
            <Listbox value={tripType} onChange={setTripType}>
              <div className="relative">
                <Listbox.Button className="w-full px-5 py-3 rounded-xl bg-white/80 text-black shadow-md hover:shadow-lg transition flex justify-between items-center">
                  {tripType}
                  <ChevronUpDownIcon className="w-5 h-5 text-gray-700" />
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 w-full rounded-xl bg-white shadow-lg z-10">
                    {tripOptions.map((option, index) => (
                      <Listbox.Option
                        key={index}
                        value={option}
                        className={({ active }) =>
                          `cursor-pointer select-none px-5 py-3 ${
                            active ? 'bg-purple-200 text-black' : 'text-black'
                          }`
                        }
                      >
                        {({ selected }) => (
                          <span className="flex justify-between">
                            {option}
                            {selected && <CheckIcon className="w-5 h-5 text-purple-700" />}
                          </span>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>

          {/* Location Input */}
          <div>
            <label className="block mb-2 font-semibold text-lg">📍 Location</label>
            <input
              type="text"
              placeholder="e.g. Goa"
              className="w-full px-5 py-3 rounded-xl bg-white/80 text-black focus:outline-none shadow-md hover:shadow-lg transition"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          {/* Duration Input */}
          <div>
            <label className="block mb-2 font-semibold text-lg">📅 Trip Duration (Days)</label>
            <input
              type="number"
              min="1"
              className="w-full px-5 py-3 rounded-xl bg-white/80 text-black focus:outline-none shadow-md hover:shadow-lg transition"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-4 bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 rounded-2xl shadow-xl hover:scale-105 transition"
          >
            ✨ Search Preferences
          </button>
        </form>
      </div>
    </div>
  );
};

export default Preferences;
