import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import TravelTips from './TravelTips';

const BookingConfirmation = ({ bookingDetails }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <div className="text-center mb-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Booking Confirmed!</h2>
          <p className="text-gray-600">Your flight has been successfully booked.</p>
        </div>

        <div className="border-t border-b border-gray-200 py-6 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Booking Reference</p>
              <p className="font-semibold">{bookingDetails?.reference || 'ABC123'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Flight Number</p>
              <p className="font-semibold">{bookingDetails?.flightNumber || 'AL123'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-semibold">{bookingDetails?.date || '2024-03-20'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className="font-semibold text-green-600">Confirmed</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => window.print()}
          >
            Download Ticket
          </button>
        </div>
      </div>

      <TravelTips />
    </div>
  );
};

export default BookingConfirmation;