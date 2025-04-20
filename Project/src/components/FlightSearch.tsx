import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, MapPin } from 'lucide-react';
import { searchFlights } from '../lib/gemini';

interface Flight {
  flight_number: string;
  departure_time: string;
  arrival_time: string;
  price: number;
  seats_available: number;
}

const FlightSearch = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    date: '',
  });
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const results = await searchFlights(
        searchParams.from,
        searchParams.to,
        searchParams.date
      );
      setFlights(results);
    } catch (err: any) {
      console.error('Error searching flights:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBookFlight = (flight: Flight) => {
    navigate('/payment', { state: { flight } });
  };

  return (
    <div id="flight-search" className="max-w-4xl mx-auto scroll-mt-24">
      <div className="bg-white rounded-xl shadow-2xl p-8 transform hover:shadow-3xl transition-all duration-300 border border-blue-50">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          Find Your Perfect Flight
        </h2>
        
        <form onSubmit={handleSearch} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative group">
              <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 h-5 w-5 transition-colors group-hover:text-blue-600" />
                <input
                  type="text"
                  className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                  placeholder="Departure City"
                  value={searchParams.from}
                  onChange={(e) => setSearchParams({ ...searchParams, from: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="relative group">
              <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 h-5 w-5 transition-colors group-hover:text-blue-600" />
                <input
                  type="text"
                  className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                  placeholder="Arrival City"
                  value={searchParams.to}
                  onChange={(e) => setSearchParams({ ...searchParams, to: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="relative group">
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 h-5 w-5 transition-colors group-hover:text-blue-600" />
                <input
                  type="date"
                  className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                  value={searchParams.date}
                  onChange={(e) => setSearchParams({ ...searchParams, date: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-600 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-2 font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span>Searching...</span>
            ) : (
              <>
                <Search className="h-5 w-5" />
                <span>Search Flights</span>
              </>
            )}
          </button>
        </form>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {error}
        </div>
      )}

      {flights.length > 0 && (
        <div className="mt-8 space-y-4">
          {flights.map((flight) => (
            <div key={flight.flight_number} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">Flight {flight.flight_number}</h3>
                  <p className="text-gray-600">{searchParams.from} → {searchParams.to}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(flight.departure_time).toLocaleString()} - {new Date(flight.arrival_time).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">${flight.price}</p>
                  <p className="text-sm text-gray-500">{flight.seats_available} seats left</p>
                  <button
                    onClick={() => handleBookFlight(flight)}
                    className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {flights.length === 0 && !loading && searchParams.from && searchParams.to && searchParams.date && (
        <div className="mt-8 p-6 bg-gray-50 rounded-lg text-center">
          <p className="text-gray-600">No flights found for your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default FlightSearch;