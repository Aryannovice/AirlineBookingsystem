import React, { useState } from 'react';
import { Phone, Mail, MessageSquare } from 'lucide-react';

const Grievances = () => {
  const [supportType, setSupportType] = useState('chat');
  const [isPlaying, setIsPlaying] = useState(false);

  const handleVoiceSupport = async () => {
    try {
      const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': import.meta.env.VITE_ELEVEN_LABS_API_KEY,
        },
        body: JSON.stringify({
          text: "Hello! I'm your Albatross Airlines virtual assistant. How can I help you today?",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5,
          },
        }),
      });

      if (!response.ok) throw new Error('Failed to get voice response');

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      
      setIsPlaying(true);
      audio.play();
      audio.onended = () => setIsPlaying(false);
    } catch (error) {
      console.error('Error with voice support:', error);
    }
  };

  return (
    <div className="pt-24 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Customer Support</h1>
      
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button
            className={`p-6 rounded-lg border-2 transition-all duration-300 transform hover:-translate-y-1 ${
              supportType === 'voice' 
                ? 'border-blue-600 bg-blue-50 shadow-md' 
                : 'border-gray-200 hover:border-blue-400 hover:shadow-md'
            }`}
            onClick={() => {
              setSupportType('voice');
              handleVoiceSupport();
            }}
          >
            <Phone className={`h-8 w-8 mb-3 mx-auto ${isPlaying ? 'text-green-600 animate-pulse' : 'text-blue-600'}`} />
            <h3 className="text-lg font-semibold mb-2">Voice Support</h3>
            <p className="text-sm text-gray-600">Talk to our AI assistant</p>
          </button>

          <button
            className={`p-6 rounded-lg border-2 transition-all duration-300 transform hover:-translate-y-1 ${
              supportType === 'chat' 
                ? 'border-blue-600 bg-blue-50 shadow-md' 
                : 'border-gray-200 hover:border-blue-400 hover:shadow-md'
            }`}
            onClick={() => setSupportType('chat')}
          >
            <MessageSquare className="h-8 w-8 text-blue-600 mb-3 mx-auto" />
            <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
            <p className="text-sm text-gray-600">Chat with our AI assistant</p>
          </button>

          <button
            className={`p-6 rounded-lg border-2 transition-all duration-300 transform hover:-translate-y-1 ${
              supportType === 'email' 
                ? 'border-blue-600 bg-blue-50 shadow-md' 
                : 'border-gray-200 hover:border-blue-400 hover:shadow-md'
            }`}
            onClick={() => setSupportType('email')}
          >
            <Mail className="h-8 w-8 text-blue-600 mb-3 mx-auto" />
            <h3 className="text-lg font-semibold mb-2">Email Support</h3>
            <p className="text-sm text-gray-600">Get help via email</p>
          </button>
        </div>

        <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-white rounded-lg border border-blue-100">
          {supportType === 'voice' && (
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Voice Support</h3>
              <p className="mb-4">Call us at our 24/7 support line:</p>
              <a 
                href="tel:+1-555-123-4567" 
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg"
              >
                <Phone className="h-5 w-5" />
                <span>+1 (555) 123-4567</span>
              </a>
              {isPlaying && (
                <div className="mt-4 text-sm text-green-600">
                  AI Assistant is speaking...
                </div>
              )}
            </div>
          )}

          {supportType === 'chat' && (
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Live Chat Support</h3>
              <p className="mb-4">Our AI assistant is ready to help you 24/7</p>
              <button className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg">
                Start Chat
              </button>
            </div>
          )}

          {supportType === 'email' && (
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Email Support</h3>
              <p className="mb-4">Send us your queries at:</p>
              <a 
                href="mailto:support@albatross.com"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg"
              >
                <Mail className="h-5 w-5" />
                <span>support@albatross.com</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Grievances;