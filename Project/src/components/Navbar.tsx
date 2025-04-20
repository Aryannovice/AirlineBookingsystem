import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plane } from 'lucide-react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';
import Auth from './Auth';
import UserMenu from './UserMenu';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      unsubscribe();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-2">
            <Plane className={`h-8 w-8 ${isScrolled ? 'text-blue-600' : 'text-white'}`} />
            <span className={`text-2xl font-bold ${
              isScrolled 
                ? 'bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent'
                : 'text-white'
            }`}>
              Albatross
            </span>
          </Link>
          
          <div className="flex items-center space-x-8">
            <div className="hidden md:flex space-x-8">
              <Link 
                to="/" 
                className={`${
                  isScrolled ? 'text-gray-600 hover:text-blue-600' : 'text-white hover:text-blue-200'
                } transition-colors duration-300 font-medium`}
              >
                Search Flights
              </Link>
              {user && (
                <Link 
                  to="/bookings" 
                  className={`${
                    isScrolled ? 'text-gray-600 hover:text-blue-600' : 'text-white hover:text-blue-200'
                  } transition-colors duration-300 font-medium`}
                >
                  My Bookings
                </Link>
              )}
              {user && (
                <Link 
                  to="/flight-management" 
                  className={`${
                    isScrolled ? 'text-gray-600 hover:text-blue-600' : 'text-white hover:text-blue-200'
                  } transition-colors duration-300 font-medium`}
                >
                  Flight Management
                </Link>
              )}
              <Link 
                to="/grievances" 
                className={`${
                  isScrolled ? 'text-gray-600 hover:text-blue-600' : 'text-white hover:text-blue-200'
                } transition-colors duration-300 font-medium`}
              >
                Support
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              {user ? (
                <UserMenu user={user} onSignOut={() => setUser(null)} />
              ) : (
                <Auth />
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;