 



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

  const TOMTOM_KEY = import.meta.env.VITE_TOMTOM_KEY;


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
 