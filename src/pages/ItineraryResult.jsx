 

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ItineraryResult = () => {
  const { state } = useLocation();
  const { location, days, budget } = state || {};
  const [places, setPlaces] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState(null);

  const GEOAPIFY_KEY = import.meta.env.VITE_GEOAPIFY_KEY;
  const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY;

  useEffect(() => {
    if (!location) return;

    const fetchPlaces = async () => {
      try {
        const geoRes = await fetch(
          `https://api.geoapify.com/v1/geocode/search?text=${location}&apiKey=${GEOAPIFY_KEY}`
        );
        const geoData = await geoRes.json();
        const feature = geoData.features?.[0];
        if (!feature) throw new Error('No location data found');

        const { lat, lon } = feature.properties;

        const placesRes = await fetch(
          `https://api.geoapify.com/v2/places?categories=tourism.sights&filter=circle:${lon},${lat},5000&limit=10&apiKey=${GEOAPIFY_KEY}`
        );
        const placesData = await placesRes.json();
        setPlaces(placesData.features || []);
      } catch (err) {
        console.error('Places Fetch failed:', err);
        setError('Could not load itinerary. Try again later.');
      }
    };

    fetchPlaces();
  }, [location]);

  useEffect(() => {
    if (!location) return;

    const fetchHotels = async () => {
      try {
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': RAPIDAPI_KEY,
            'X-RapidAPI-Host': 'booking-com.p.rapidapi.com',
          },
        };

        const res = await fetch(
          `https://booking-com.p.rapidapi.com/v1/hotels/search?dest_type=city&units=metric&order_by=popularity&adults_number=2&checkin_date=2025-07-20&checkout_date=2025-07-22&dest_id=-2092174&locale=en-gb&room_number=1`,
          options
        );
        const data = await res.json();
        setHotels(data.result || []);
      } catch (err) {
        console.error('Hotel Fetch failed:', err);
      }
    };

    fetchHotels();
  }, [location]);

  return (
    <div
      className="h-screen w-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: "url('/flower.jpg')" }}
    >
      <div className="w-full max-w-4xl bg-[#1a1a2ed8] p-8 rounded-xl shadow-lg text-white mx-4 my-10">
        <h2 className="text-3xl font-bold mb-6 text-purple-400">
          Your Trip Plan to {location}
        </h2>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Suggested Places to Visit</h3>
          {error && <p className="text-red-400">{error}</p>}
          <ul className="list-disc pl-6">
            {places.length > 0 ? (
              [...Array(Number(days)).keys()].map((day) => {
                const place = places[day % places.length];
                return (
                  <li key={day} className="mb-3">
                    <strong className="text-purple-300">Day {day + 1}:</strong>{' '}
                    {place.properties.name || 'Unknown Place'}
                    <br />
                    <a
                      href={`https://www.google.com/maps?q=${place.properties.lat},${place.properties.lon}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-blue-400 underline"
                    >
                      View on Map
                    </a>
                  </li>
                );
              })
            ) : (
              <p>Loading places...</p>
            )}
          </ul>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">Recommended Hotels in {location}</h3>
          <ul className="list-disc pl-6">
            {hotels.length > 0 ? (
              hotels.slice(0, 5).map((hotel, index) => (
                <li key={index}>
                  {hotel.hotel_name || 'Unnamed Hotel'} — ⭐ {hotel.review_score}
                </li>
              ))
            ) : (
              <p>Loading hotels...</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ItineraryResult;
