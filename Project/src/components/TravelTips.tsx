import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

const TravelTips = () => {
  return (
    <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Travel Guidelines</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold text-green-600 mb-4 flex items-center">
            <CheckCircle className="h-6 w-6 mr-2" />
            Do's
          </h3>
          <ul className="space-y-3">
            {[
              'Arrive at least 2 hours before domestic flights',
              'Keep your ID and boarding pass readily accessible',
              'Follow baggage weight and size restrictions',
              'Stay updated with flight status',
              'Keep valuable items in carry-on luggage',
              'Stay hydrated during the flight',
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-red-600 mb-4 flex items-center">
            <XCircle className="h-6 w-6 mr-2" />
            Don'ts
          </h3>
          <ul className="space-y-3">
            {[
              'Pack prohibited items in your luggage',
              'Leave baggage unattended at any time',
              'Forget to check visa requirements',
              'Ignore safety instructions',
              'Miss your boarding call',
              'Pack valuables in checked baggage',
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <XCircle className="h-5 w-5 text-red-500 mr-2 mt-1 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TravelTips;