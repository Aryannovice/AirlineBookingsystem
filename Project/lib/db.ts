import { collection, addDoc, query, where, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';

// Flights Collection
export const addFlight = async (flightData) => {
  try {
    const docRef = await addDoc(collection(db, 'flights'), {
      ...flightData,
      createdAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding flight:', error);
    throw error;
  }
};

export const getFlights = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'flights'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting flights:', error);
    throw error;
  }
};

// Bookings Collection
export const addBooking = async (bookingData) => {
  try {
    const docRef = await addDoc(collection(db, 'bookings'), {
      ...bookingData,
      createdAt: new Date(),
      status: 'confirmed'
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding booking:', error);
    throw error;
  }
};

export const getUserBookings = async (userId) => {
  try {
    const q = query(collection(db, 'bookings'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting user bookings:', error);
    throw error;
  }
};