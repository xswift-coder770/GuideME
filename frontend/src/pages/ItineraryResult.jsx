// import { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import StarBorders from '../components/StarBorder';
// import SpotlightCard from '../components/SpotLightCard';

// const ItineraryResult = () => {
//   const { state } = useLocation();
//   const { location, days, budget } = state || {};
//   const [places, setPlaces] = useState([]);
//   const [hotels, setHotels] = useState([]);
//   const [error, setError] = useState(null);

//   const GEOAPIFY_KEY = import.meta.env.VITE_GEOAPIFY_KEY;
//   const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY;

//   useEffect(() => {
//     if (!location) return;

//     const fetchPlaces = async () => {
//       try {
//         const geoRes = await fetch(
//           `https://api.geoapify.com/v1/geocode/search?text=${location}&apiKey=${GEOAPIFY_KEY}`
//         );
//         const geoData = await geoRes.json();
//         const feature = geoData.features?.[0];
//         if (!feature) throw new Error('No location data found');

//         const { lat, lon } = feature.properties;

//         const placesRes = await fetch(
//           `https://api.geoapify.com/v2/places?categories=tourism.sights&filter=circle:${lon},${lat},5000&limit=10&apiKey=${GEOAPIFY_KEY}`
//         );
//         const placesData = await placesRes.json();
//         setPlaces(placesData.features || []);
//       } catch (err) {
//         console.error('Places Fetch failed:', err);
//         setError('Could not load itinerary. Try again later.');
//       }
//     };

//     fetchPlaces();
//   }, [location]);

//   useEffect(() => {
//     if (!location) return;

//     const fetchHotels = async () => {
//       try {
//         const options = {
//           method: 'GET',
//           headers: {
//             'X-RapidAPI-Key': RAPIDAPI_KEY,
//             'X-RapidAPI-Host': 'booking-com.p.rapidapi.com',
//           },
//         };

//         const res = await fetch(
//           `https://booking-com.p.rapidapi.com/v1/hotels/search?dest_type=city&units=metric&order_by=popularity&adults_number=2&checkin_date=2025-07-20&checkout_date=2025-07-22&dest_id=-2092174&locale=en-gb&room_number=1`,
//           options
//         );
//         const data = await res.json();
//         setHotels(data.result || []);
//       } catch (err) {
//         console.error('Hotel Fetch failed:', err);
//       }
//     };

//     fetchHotels();
//   }, [location]);

//   return (
//     <div className="min-h-screen w-full bg-[#0e071b] text-white py-12 px-4">
//       <div className="max-w-5xl mx-auto">
//         <h2 className="text-4xl font-bold text-center text-purple-400 mb-10">
//           Your Dream Trip to {location}
//         </h2>

//         {/* Suggested Places Section */}
//         <div className="mb-14">
//           <h3 className="text-2xl font-semibold mb-6 text-center">🗺️ Suggested Places To Visit</h3>
//           {error && <p className="text-red-400 text-center">{error}</p>}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             {[...Array(Number(days)).keys()].map((day) => {
//               const place = places[day % places.length];
//               return (
//                 <SpotlightCard
//                   key={day}
//                   title={`Day ${day + 1}: ${place?.properties?.name || 'Unknown Place'}`}
//                   image={`/demo/places/place${(day % 5) + 1}.jpg`}
//                   description={`Explore one of the best attractions in ${location}.`}
//                   actionLabel="View on Map"
//                   actionUrl={`https://www.google.com/maps?q=${place?.properties?.lat},${place?.properties?.lon}`}
//                 />
//               );
//             })}
//           </div>
//         </div>

//         {/* Recommended Hotels Section */}
//         <div>
//           <h3 className="text-2xl font-semibold mb-6 text-center">🏨 Top Recommended Hotels</h3>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {hotels.slice(0, 6).map((hotel, index) => (
//               <StarBorders key={index}>
//                 <img
//                   src={`/demo/hotels/hotel${(index % 5) + 1}.jpg`}
//                   alt={hotel.hotel_name}
//                   className="w-full h-40 object-cover rounded-xl mb-3"
//                 />
//                 <h4 className="text-lg font-bold text-purple-300">{hotel.hotel_name}</h4>
//                 <p className="text-sm">Rating: ⭐ {hotel.review_score || 'N/A'}</p>
//               </StarBorders>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ItineraryResult;









 

// //BEST BOTH API FETCHING CORRECTLY 

// import { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';

// const ItineraryResult = () => {
//   const { state } = useLocation();
//   const { location } = state || {};
//   const [coords, setCoords] = useState(null);
//   const [hotels, setHotels] = useState([]);
//   const [attractions, setAttractions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   const TOMTOM_KEY = 'W9lOuf5aY5IpwqMopwRE4W0RdvDM7pxJ';

//   useEffect(() => {
//     if (!location) return;

//     const fetchAll = async () => {
//       try {
//         const geoRes = await fetch(
//           `https://api.tomtom.com/search/2/search/${encodeURIComponent(location)}.json?key=${TOMTOM_KEY}&limit=1`
//         );
//         const geoData = await geoRes.json();
//         const pos = geoData.results?.[0]?.position;
//         if (!pos) throw new Error('Location not found');
//         setCoords(pos);

//         const [hotelRes, attrRes] = await Promise.all([
//           fetch(
//             `https://api.tomtom.com/search/2/poiSearch/hotel.json?key=${TOMTOM_KEY}&lat=${pos.lat}&lon=${pos.lon}&radius=5000&limit=8`
//           ),
//           fetch(
//             `https://api.tomtom.com/search/2/poiSearch/tourism.sights.json?key=${TOMTOM_KEY}&lat=${pos.lat}&lon=${pos.lon}&radius=5000&limit=8`
//           ),
//         ]);

//         const hotelData = await hotelRes.json();
//         setHotels(hotelData.results || []);

//         const attrData = await attrRes.json();
//         setAttractions(attrData.results || []);
//       } catch (err) {
//         console.error(err);
//         setError('Failed to load trip data.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAll();
//   }, [location]);

//   return (
//     <div className="min-h-screen bg-[#0e071b] text-white p-6 flex justify-center">
//       <div className="max-w-5xl w-full space-y-12">
//         <h2 className="text-3xl font-bold text-center text-purple-400">
//           Trip Itinerary for {location || '—'}
//         </h2>

//         {loading && <p className="text-center text-gray-300">Loading itinerary...</p>}
//         {error && <p className="text-center text-red-400">{error}</p>}

//         {coords && (
//           <p className="text-center text-gray-300">
//             Coordinates: {coords.lat.toFixed(4)}, {coords.lon.toFixed(4)}
//           </p>
//         )}

//         <section>
//           <h3 className="text-2xl font-semibold mb-6">🏨 Nearby Hotels</h3>
//           {hotels.length === 0 ? (
//             <p className="text-gray-400">No hotels found.</p>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//               {hotels.map((h, idx) => (
//                 <div
//                   key={idx}
//                   className="bg-white/10 backdrop-blur-sm p-5 rounded-lg hover:shadow-lg transition transform hover:scale-[1.02]"
//                 >
//                   <h4 className="text-xl font-bold text-purple-300">
//                     {h.poi?.name || 'Unnamed Hotel'}
//                   </h4>
//                   {h.address?.freeformAddress && (
//                     <p className="text-sm text-gray-300">{h.address.freeformAddress}</p>
//                   )}
//                   <p className="text-sm text-gray-400">Distance: {(h.dist / 1000).toFixed(1)} km</p>
//                   {h.poi?.phone && <p className="text-sm text-gray-400">📞 {h.poi.phone}</p>}
//                 </div>
//               ))}
//             </div>
//           )}
//         </section>

//         <section>
//           <h3 className="text-2xl font-semibold mb-6">📍 Top Attractions</h3>
//           {attractions.length === 0 ? (
//             <p className="text-gray-400">No attractions found.</p>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//               {attractions.map((a, idx) => (
//                 <div
//                   key={idx}
//                   className="bg-white/10 backdrop-blur-sm p-5 rounded-lg hover:shadow-lg transition transform hover:scale-[1.02]"
//                 >
//                   <h4 className="text-xl font-bold text-purple-300">
//                     {a.poi?.name || 'Unnamed Place'}
//                   </h4>
//                   {a.address?.freeformAddress && (
//                     <p className="text-sm text-gray-300">{a.address.freeformAddress}</p>
//                   )}
//                   <p className="text-sm text-gray-400">
//                     Distance: {(a.dist / 1000).toFixed(1)} km
//                   </p>
//                   <a
//                     href={`https://www.google.com/maps?q=${a.position.lat},${a.position.lon}`}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="text-blue-400 underline text-sm"
//                   >
//                     View on Map
//                   </a>
//                 </div>
//               ))}
//             </div>
//           )}
//         </section>
//       </div>
//     </div>
//   );
// };

// export default ItineraryResult;







import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ItineraryResult = () => {
  const { state } = useLocation();
  const { location, days, budget } = state || {};

  const [coords, setCoords] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const TOMTOM_KEY = 'W9lOuf5aY5IpwqMopwRE4W0RdvDM7pxJ';

  const budgetKeywords = {
    cheap: 'budget hotel',
    moderate: 'hotel',
    luxury: 'luxury hotel',
    vip: '5 star hotel',
  };

  useEffect(() => {
    if (!location) return;

    const fetchAll = async () => {
      try {
        const geoRes = await fetch(
          `https://api.tomtom.com/search/2/search/${encodeURIComponent(location)}.json?key=${TOMTOM_KEY}&limit=1`
        );
        const geoData = await geoRes.json();
        const pos = geoData.results?.[0]?.position;
        if (!pos) throw new Error('Location not found');
        setCoords(pos);

        const [hotelRes, attrRes] = await Promise.all([
          fetch(
            `https://api.tomtom.com/search/2/poiSearch/${budgetKeywords[budget] || 'hotel'}.json?key=${TOMTOM_KEY}&lat=${pos.lat}&lon=${pos.lon}&radius=5000&limit=8`
          ),
          fetch(
            `https://api.tomtom.com/search/2/poiSearch/tourism.sights.json?key=${TOMTOM_KEY}&lat=${pos.lat}&lon=${pos.lon}&radius=5000&limit=10`
          ),
        ]);

        const hotelData = await hotelRes.json();
        setHotels(hotelData.results || []);

        const attrData = await attrRes.json();
        setAttractions(attrData.results || []);
      } catch (err) {
        console.error(err);
        setError('Failed to load trip data.');
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [location]);

  return (
    <div className="min-h-screen bg-[#0e071b] text-white p-6 flex justify-center">
      <div className="max-w-5xl w-full space-y-12">
        <h2 className="text-3xl font-bold text-center text-purple-400">
          Your {days}-Day Plan for {location}
        </h2>

        {loading && <p className="text-center text-gray-300">Loading itinerary...</p>}
        {error && <p className="text-center text-red-400">{error}</p>}

        {/* Daily Attraction Plan */}
        <section>
          <h3 className="text-2xl font-semibold mb-6">📍 Daily Tourist Attractions</h3>
          {attractions.length === 0 ? (
            <p className="text-gray-400">No attractions found.</p>
          ) : (
            <div className="space-y-5">
              {[...Array(Number(days)).keys()].map((day) => {
                const attraction = attractions[day % attractions.length];
                return (
                  <div
                    key={day}
                    className="bg-white/10 backdrop-blur-sm p-5 rounded-lg hover:shadow-lg transition transform hover:scale-[1.02]"
                  >
                    <h4 className="text-xl font-bold text-purple-300">
                      Day {day + 1}: {attraction.poi?.name || 'Attraction'}
                    </h4>
                    <p className="text-sm text-gray-300">{attraction.address?.freeformAddress}</p>
                    <p className="text-sm text-gray-400">
                      Distance: {(attraction.dist / 1000).toFixed(1)} km
                    </p>
                    <a
                      href={`https://www.google.com/maps?q=${attraction.position.lat},${attraction.position.lon}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-400 underline text-sm"
                    >
                      View on Map
                    </a>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Hotel Recommendations */}
        <section>
          <h3 className="text-2xl font-semibold mb-6">
            🏨 {budget.charAt(0).toUpperCase() + budget.slice(1)} Hotel Recommendations
          </h3>
          {hotels.length === 0 ? (
            <p className="text-gray-400">No hotels found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {hotels.map((h, idx) => (
                <div
                  key={idx}
                  className="bg-white/10 backdrop-blur-sm p-5 rounded-lg hover:shadow-lg transition transform hover:scale-[1.02]"
                >
                  <h4 className="text-xl font-bold text-purple-300">
                    {h.poi?.name || 'Unnamed Hotel'}
                  </h4>
                  {h.address?.freeformAddress && (
                    <p className="text-sm text-gray-300">{h.address.freeformAddress}</p>
                  )}
                  <p className="text-sm text-gray-400">Distance: {(h.dist / 1000).toFixed(1)} km</p>
                  {h.poi?.phone && <p className="text-sm text-gray-400">📞 {h.poi.phone}</p>}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ItineraryResult;



// import { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import StarBorder from '../components/StarBorder';

// const ItineraryResult = () => {
//   const { state } = useLocation();
//   const { location, days, budget } = state || {};

//   const [coords, setCoords] = useState(null);
//   const [hotels, setHotels] = useState([]);
//   const [attractions, setAttractions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   const TOMTOM_KEY = 'W9lOuf5aY5IpwqMopwRE4W0RdvDM7pxJ';

//   const budgetKeywords = {
//     cheap: 'budget hotel',
//     moderate: 'hotel',
//     luxury: 'luxury hotel',
//     vip: '5 star hotel',
//   };

//   useEffect(() => {
//     if (!location) return;

//     const fetchAll = async () => {
//       try {
//         const geoRes = await fetch(
//           `https://api.tomtom.com/search/2/search/${encodeURIComponent(location)}.json?key=${TOMTOM_KEY}&limit=1`
//         );
//         const geoData = await geoRes.json();
//         const pos = geoData.results?.[0]?.position;
//         if (!pos) throw new Error('Location not found');
//         setCoords(pos);

//         const [hotelRes, attrRes] = await Promise.all([
//           fetch(
//             `https://api.tomtom.com/search/2/poiSearch/${budgetKeywords[budget] || 'hotel'}.json?key=${TOMTOM_KEY}&lat=${pos.lat}&lon=${pos.lon}&radius=5000&limit=8`
//           ),
//           fetch(
//             `https://api.tomtom.com/search/2/poiSearch/tourism.sights.json?key=${TOMTOM_KEY}&lat=${pos.lat}&lon=${pos.lon}&radius=5000&limit=10`
//           ),
//         ]);

//         const hotelData = await hotelRes.json();
//         setHotels(hotelData.results || []);

//         const attrData = await attrRes.json();
//         setAttractions(attrData.results || []);
//       } catch (err) {
//         console.error(err);
//         setError('Failed to load trip data.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAll();
//   }, [location]);

//   return (
//     <div className="min-h-screen bg-[#0e071b] text-white p-6 flex justify-center">
//       <div className="max-w-5xl w-full space-y-12">
//         <h2 className="text-3xl font-bold text-center text-purple-400">
//           Your {days}-Day Plan for {location}
//         </h2>

//         {loading && <p className="text-center text-gray-300">Loading itinerary...</p>}
//         {error && <p className="text-center text-red-400">{error}</p>}

//         {/* Daily Attraction Plan */}
//         <section>
//           <h3 className="text-2xl font-semibold mb-6">📍 Daily Tourist Attractions</h3>
//           <div className="space-y-5">
//             {[...Array(Number(days)).keys()].map((day) => {
//               const attraction = attractions[day % attractions.length];
//               return (
//                 <StarBorder key={day}>
//                   <div className="space-y-2">
//                     <h4 className="text-xl font-bold text-purple-300">
//                       Day {day + 1}: {attraction?.poi?.name || 'Attraction'}
//                     </h4>
//                     <p className="text-sm text-gray-300">{attraction?.address?.freeformAddress}</p>
//                     <p className="text-sm text-gray-400">
//                       Distance: {(attraction?.dist / 1000).toFixed(1)} km
//                     </p>
//                     <a
//                       href={`https://www.google.com/maps?q=${attraction?.position.lat},${attraction?.position.lon}`}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="text-blue-400 underline text-sm"
//                     >
//                       View on Map
//                     </a>
//                   </div>
//                 </StarBorder>
//               );
//             })}
//           </div>
//         </section>

//         {/* Hotel Recommendations */}
//         <section>
//           <h3 className="text-2xl font-semibold mb-6">
//             🏨 {budget.charAt(0).toUpperCase() + budget.slice(1)} Hotel Recommendations
//           </h3>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             {hotels.map((h, idx) => (
//               <StarBorder key={idx}>
//                 <div className="space-y-2">
//                   <h4 className="text-xl font-bold text-purple-300">{h.poi?.name || 'Unnamed Hotel'}</h4>
//                   <p className="text-sm text-gray-300">{h.address?.freeformAddress}</p>
//                   <p className="text-sm text-gray-400">Distance: {(h.dist / 1000).toFixed(1)} km</p>
//                   {h.poi?.phone && <p className="text-sm text-gray-400">📞 {h.poi.phone}</p>}
//                 </div>
//               </StarBorder>
//             ))}
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default ItineraryResult;















// import { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import StarBorder from '../components/StarBorder'; // Import the border wrapper

// const ItineraryResult = () => {
//   const { state } = useLocation();
//   const { location, days, budget } = state || {};

//   const [coords, setCoords] = useState(null);
//   const [hotels, setHotels] = useState([]);
//   const [attractions, setAttractions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   const TOMTOM_KEY = 'W9lOuf5aY5IpwqMopwRE4W0RdvDM7pxJ';

//   const budgetKeywords = {
//     cheap: 'budget hotel',
//     moderate: 'hotel',
//     luxury: 'luxury hotel',
//     vip: '5 star hotel',
//   };

//   useEffect(() => {
//     if (!location) return;

//     const fetchAll = async () => {
//       try {
//         const geoRes = await fetch(
//           `https://api.tomtom.com/search/2/search/${encodeURIComponent(location)}.json?key=${TOMTOM_KEY}&limit=1`
//         );
//         const geoData = await geoRes.json();
//         const pos = geoData.results?.[0]?.position;
//         if (!pos) throw new Error('Location not found');
//         setCoords(pos);

//         const [hotelRes, attrRes] = await Promise.all([
//           fetch(
//             `https://api.tomtom.com/search/2/poiSearch/${budgetKeywords[budget] || 'hotel'}.json?key=${TOMTOM_KEY}&lat=${pos.lat}&lon=${pos.lon}&radius=5000&limit=8`
//           ),
//           fetch(
//             `https://api.tomtom.com/search/2/poiSearch/tourism.sights.json?key=${TOMTOM_KEY}&lat=${pos.lat}&lon=${pos.lon}&radius=5000&limit=10`
//           ),
//         ]);

//         const hotelData = await hotelRes.json();
//         setHotels(hotelData.results || []);

//         const attrData = await attrRes.json();
//         setAttractions(attrData.results || []);
//       } catch (err) {
//         console.error(err);
//         setError('Failed to load trip data.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAll();
//   }, [location]);

//   return (
//     <div className="min-h-screen bg-[#0e071b] text-white p-6 flex justify-center">
//       <div className="max-w-5xl w-full space-y-12">
//         <h2 className="text-3xl font-bold text-center text-purple-400">
//           Your {days}-Day Plan for {location}
//         </h2>

//         {loading && <p className="text-center text-gray-300">Loading itinerary...</p>}
//         {error && <p className="text-center text-red-400">{error}</p>}

//         {/* Daily Attraction Plan */}
//         <section>
//           <h3 className="text-2xl font-semibold mb-6">📍 Daily Tourist Attractions</h3>
//           {attractions.length === 0 ? (
//             <p className="text-gray-400">No attractions found.</p>
//           ) : (
//             <div className="space-y-5">
//               {[...Array(Number(days)).keys()].map((day) => {
//                 const attraction = attractions[day % attractions.length];
//                 return (
//                   <StarBorder key={day}>
//                     <div>
//                       <h4 className="text-xl font-bold text-purple-300">
//                         Day {day + 1}: {attraction?.poi?.name || 'Attraction'}
//                       </h4>
//                       <p className="text-sm text-gray-300">{attraction?.address?.freeformAddress}</p>
//                       <p className="text-sm text-gray-400">
//                         Distance: {(attraction?.dist / 1000).toFixed(1)} km
//                       </p>
//                       <a
//                         href={`https://www.google.com/maps?q=${attraction?.position.lat},${attraction?.position.lon}`}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="text-blue-400 underline text-sm"
//                       >
//                         View on Map
//                       </a>
//                     </div>
//                   </StarBorder>
//                 );
//               })}
//             </div>
//           )}
//         </section>

//         {/* Hotel Recommendations */}
//         <section>
//           <h3 className="text-2xl font-semibold mb-6">
//             🏨 {budget.charAt(0).toUpperCase() + budget.slice(1)} Hotel Recommendations
//           </h3>
//           {hotels.length === 0 ? (
//             <p className="text-gray-400">No hotels found.</p>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//               {hotels.map((h, idx) => (
//                 <StarBorder key={idx}>
//                   <div>
//                     <h4 className="text-xl font-bold text-purple-300">{h.poi?.name || 'Unnamed Hotel'}</h4>
//                     <p className="text-sm text-gray-300">{h.address?.freeformAddress}</p>
//                     <p className="text-sm text-gray-400">Distance: {(h.dist / 1000).toFixed(1)} km</p>
//                     {h.poi?.phone && <p className="text-sm text-gray-400">📞 {h.poi.phone}</p>}
//                   </div>
//                 </StarBorder>
//               ))}
//             </div>
//           )}
//         </section>
//       </div>
//     </div>
//   );
// };

// export default ItineraryResult;
