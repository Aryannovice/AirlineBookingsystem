import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Plane } from 'lucide-react';
import Navbar from './components/Navbar';
import FlightSearch from './components/FlightSearch';
import Bookings from './components/Bookings';
import FlightManagement from './components/FlightManagement';
import Hero from './components/Hero';
import Footer from './components/Footer';
import TravelTips from './components/TravelTips';
import Grievances from './components/Grievances';
import PaymentGateway from './components/PaymentGateway';
import BookingConfirmation from './components/BookingConfirmation';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <main className="container mx-auto px-4 py-8">
                  <FlightSearch />
                  <TravelTips />
                </main>
              </>
            } />
            <Route path="/bookings" element={
              <main className="container mx-auto px-4 py-8">
                <Bookings />
              </main>
            } />
            <Route path="/flight-management" element={
              <main className="container mx-auto px-4 py-8">
                <FlightManagement />
              </main>
            } />
            <Route path="/grievances" element={
              <main className="container mx-auto px-4 py-8">
                <Grievances />
              </main>
            } />
            <Route path="/payment" element={
              <main className="container mx-auto px-4 py-8 pt-24">
                <PaymentGateway />
              </main>
            } />
            <Route path="/booking-confirmation" element={
              <main className="container mx-auto px-4 py-8 pt-24">
                <BookingConfirmation />
              </main>
            } />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;