import React, { useState, useEffect } from 'react';
import { Plane, Shield, Clock, Users } from 'lucide-react';

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const images = [
    "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-1.2.1&auto=format&fit=crop&w=2048&q=80",
    "https://images.unsplash.com/photo-1542296332-2e4473faf563?ixlib=rb-1.2.1&auto=format&fit=crop&w=2048&q=80",
    "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2048&q=80"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative">
      {/* Hero Section with Image Slider */}
      <div 
        className="relative h-[600px] bg-cover bg-center transition-all duration-1000"
        style={{
          backgroundImage: `url('${images[currentImageIndex]}')`,
        }}
      >
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentImageIndex === index ? 'bg-white scale-125' : 'bg-white/50'
              }`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50">
          <div className="container mx-auto px-4 h-full flex flex-col justify-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
              Let's fly together and safer
            </h1>
            <p className="text-xl text-white mb-8 max-w-2xl animate-fade-in-delay">
              Experience the joy of seamless travel with Albatross Airlines. Book your next adventure with confidence and peace of mind.
            </p>
            <a
              href="#flight-search"
              className="inline-flex items-center px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 w-fit animate-fade-in-delay-2"
            >
              <Plane className="mr-2 h-5 w-5" />
              Find Your Flight
            </a>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="bg-white rounded-lg p-6 shadow-lg transform hover:-translate-y-2 transition-all duration-300">
            <Plane className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Global Destinations</h3>
            <p className="text-gray-600">Connect to hundreds of destinations worldwide</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-lg transform hover:-translate-y-2 transition-all duration-300">
            <Shield className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Safe Travel</h3>
            <p className="text-gray-600">Your safety is our top priority</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-lg transform hover:-translate-y-2 transition-all duration-300">
            <Clock className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
            <p className="text-gray-600">Round-the-clock customer assistance</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-lg transform hover:-translate-y-2 transition-all duration-300">
            <Users className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Premium Service</h3>
            <p className="text-gray-600">Exceptional service for every passenger</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;