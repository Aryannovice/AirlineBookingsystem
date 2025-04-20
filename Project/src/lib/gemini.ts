import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const searchFlights = async (from: string, to: string, date: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Generate a list of 3-5 realistic flights from ${from} to ${to} on ${date}. 
      Include flight number, departure time, arrival time, price, and available seats. 
      Format as JSON array with properties: flight_number, departure_time, arrival_time, price, seats_available.
      Use realistic prices and times.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return JSON.parse(text);
  } catch (error: any) {
    console.error('Error generating flights:', error);
    throw new Error(error.message || 'Failed to search flights. Please try again.');
  }
};