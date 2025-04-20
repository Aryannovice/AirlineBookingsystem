import React from 'react';
import { Ticket } from 'lucide-react';

const Bookings = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Bookings</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-center text-gray-400 py-8">
          <div className="text-center">
            <Ticket className="h-12 w-12 mx-auto mb-4" />
            <p>No bookings found</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookings;