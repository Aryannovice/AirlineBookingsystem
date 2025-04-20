import React from 'react';
import { PlaneLanding, Users, DollarSign } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-4">
            <PlaneLanding className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-gray-500">Total Flights</p>
              <p className="text-2xl font-bold">0</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-4">
            <Users className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-gray-500">Total Bookings</p>
              <p className="text-2xl font-bold">0</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-4">
            <DollarSign className="h-8 w-8 text-yellow-600" />
            <div>
              <p className="text-gray-500">Revenue</p>
              <p className="text-2xl font-bold">$0</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Manage Flights</h2>
        <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
          Add New Flight
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;