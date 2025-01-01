'use client';
import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function Playground() {
  const { theme } = useTheme();
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const router = useRouter();

  const validateApiKey = async () => {
    if (!apiKey.trim()) {
      toast.error('Please enter an API key');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('/api/validate-key', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apiKey }),
      });

      const data = await response.json();
      setResponse(data);
      
      if (data.isValidApiKey) {
        toast.success('API key is valid!');
      } else {
        toast.error('Invalid API key');
      }
    } catch (error) {
      console.error('Validation error:', error);
      toast.error('Error validating API key');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen p-8 transition-colors duration-200 ${
      theme === 'dark' ? 'bg-[#111111] text-gray-100' : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-3xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>API Playground</h1>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Back to Dashboard
          </button>
        </div>

        <div className={`p-6 rounded-lg mb-8 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white shadow-sm'
        }`}>
          <h2 className="text-xl font-semibold mb-4">Validate API Key</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">API Key</label>
              <input
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your API key"
                className={`w-full p-2 rounded border ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600' 
                    : 'bg-white border-gray-300'
                }`}
              />
            </div>
            <button
              onClick={validateApiKey}
              disabled={loading}
              className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? 'Validating...' : 'Test API Key'}
            </button>
          </div>
        </div>

        {response && (
          <div className={`p-6 rounded-lg ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white shadow-sm'
          }`}>
            <h3 className="text-lg font-semibold mb-3">Response</h3>
            <pre className={`p-4 rounded ${
              theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
            }`}>
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
} 