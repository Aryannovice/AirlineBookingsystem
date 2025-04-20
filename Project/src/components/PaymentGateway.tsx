import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Lock } from 'lucide-react';

const PaymentGateway = ({ amount, flightDetails, onSuccess }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Navigate to booking confirmation
      onSuccess();
      navigate('/booking-confirmation');
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center justify-center mb-6">
        <Lock className="h-8 w-8 text-blue-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-800">Secure Payment</h2>
      </div>

      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-2">Flight Summary</h3>
        <div className="text-sm text-gray-600">
          <p>Flight: {flightDetails?.flightNumber}</p>
          <p>From: {flightDetails?.from}</p>
          <p>To: {flightDetails?.to}</p>
          <p>Date: {flightDetails?.date}</p>
          <p className="mt-2 text-lg font-semibold text-blue-600">
            Total: ${amount}
          </p>
        </div>
      </div>

      <form onSubmit={handlePayment}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Card Number
          </label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="1234 5678 9012 3456"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expiry Date
            </label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="MM/YY"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CVV
            </label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="123"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className={`w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center ${
            loading ? 'opacity-75 cursor-not-allowed' : ''
          }`}
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center">
              Processing...
              <span className="ml-2 animate-spin">⌛</span>
            </span>
          ) : (
            'Pay Now'
          )}
        </button>
      </form>

      <div className="mt-4 text-center text-sm text-gray-500">
        <Lock className="inline-block h-4 w-4 mr-1" />
        Secured by Stripe
      </div>
    </div>
  );
};

export default PaymentGateway;