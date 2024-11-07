'use client';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useTheme } from '@/context/ThemeContext';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

export default function Dashboard() {
  const { theme, toggleTheme } = useTheme();
  const [apiKeys, setApiKeys] = useState([]);
  const [newKeyName, setNewKeyName] = useState('');
  const [loading, setLoading] = useState(false);
  const [showNewKey, setShowNewKey] = useState(false);
  const [newlyCreatedKey, setNewlyCreatedKey] = useState(null);
  const [editingKey, setEditingKey] = useState(null);
  const [editName, setEditName] = useState('');

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const fetchApiKeys = async () => {
    try {
      setLoading(true);
      // TODO: Replace with your actual API endpoint
      const response = await fetch('/api/keys');
      const data = await response.json();
      setApiKeys(data);
    } catch (error) {
      toast.error('Failed to fetch API keys');
    } finally {
      setLoading(false);
    }
  };

  const createApiKey = async () => {
    if (!newKeyName.trim()) {
      toast.error('Please enter a key name');
      return;
    }

    try {
      setLoading(true);
      // TODO: Replace with your actual API endpoint
      const response = await fetch('/api/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newKeyName }),
      });
      const data = await response.json();
      
      setNewlyCreatedKey(data.key); // Store the newly created key
      setShowNewKey(true);
      setApiKeys([...apiKeys, data]);
      setNewKeyName('');
      toast.success('API key created successfully');
    } catch (error) {
      toast.error('Failed to create API key');
    } finally {
      setLoading(false);
    }
  };

  const updateApiKey = async (keyId) => {
    if (!editName.trim()) {
      toast.error('Please enter a key name');
      return;
    }

    try {
      setLoading(true);
      // TODO: Replace with your actual API endpoint
      const response = await fetch(`/api/keys/${keyId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editName }),
      });
      const updatedKey = await response.json();
      
      setApiKeys(apiKeys.map(key => 
        key.id === keyId ? { ...key, name: editName } : key
      ));
      setEditingKey(null);
      toast.success('API key updated successfully');
    } catch (error) {
      toast.error('Failed to update API key');
    } finally {
      setLoading(false);
    }
  };

  const deleteApiKey = async (keyId) => {
    if (!confirm('Are you sure you want to delete this API key? This action cannot be undone.')) {
      return;
    }

    try {
      setLoading(true);
      // TODO: Replace with your actual API endpoint
      await fetch(`/api/keys/${keyId}`, {
        method: 'DELETE',
      });
      
      setApiKeys(apiKeys.filter(key => key.id !== keyId));
      toast.success('API key deleted successfully');
    } catch (error) {
      toast.error('Failed to delete API key');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      theme === 'dark' ? 'bg-[#111111] text-gray-100' : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="max-w-4xl mx-auto p-8">
        {/* Header with Theme Toggle */}
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-3xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>API Key Management</h1>
          
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${
              theme === 'dark' 
                ? 'bg-gray-800 hover:bg-gray-700' 
                : 'bg-white hover:bg-gray-100 shadow-sm'
            }`}
          >
            {theme === 'dark' ? (
              <SunIcon className="w-5 h-5 text-yellow-400" />
            ) : (
              <MoonIcon className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>

        {/* API Usage Card */}
        <div className={`mb-8 rounded-lg p-6 ${
          theme === 'dark' 
            ? 'bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-gray-800' 
            : 'bg-gradient-to-r from-blue-100 to-purple-100'
        }`}>
          <p className="text-sm font-medium mb-2">CURRENT PLAN</p>
          <h2 className="text-2xl font-bold mb-4">Developer</h2>
          <div className="space-y-2">
            <p className="text-sm">API Limit</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
            </div>
            <p className="text-sm">500/1,000 Requests</p>
          </div>
        </div>

        {/* Create API Key Section */}
        <div className={`mb-8 rounded-lg p-6 ${
          theme === 'dark'
            ? 'bg-[#1A1A1A] border border-gray-800'
            : 'bg-white shadow-sm border border-gray-200'
        }`}>
          <h2 className={`text-xl font-semibold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>Create New API Key</h2>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Enter key name"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              className={`flex-1 rounded-md px-4 py-2 ${
                theme === 'dark'
                  ? 'bg-[#2A2A2A] border-gray-700 text-gray-200 placeholder-gray-500'
                  : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'
              } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            <button
              onClick={createApiKey}
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 
                       disabled:opacity-50 transition-colors duration-200"
            >
              {loading ? 'Creating...' : 'Generate Key'}
            </button>
          </div>

          {/* New Key Display */}
          {showNewKey && newlyCreatedKey && (
            <div className={`mt-4 p-4 rounded-md ${
              theme === 'dark'
                ? 'bg-[#2A2A2A] border-gray-700'
                : 'bg-gray-50 border-gray-200'
            } border`}>
              <div className="flex justify-between items-center">
                <div>
                  <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                    Your new API key:
                  </p>
                  <p className="font-mono text-sm mt-1 text-blue-500">
                    {newlyCreatedKey}
                  </p>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(newlyCreatedKey);
                    toast.success('API key copied to clipboard');
                  }}
                  className="text-blue-500 hover:text-blue-400"
                >
                  Copy
                </button>
              </div>
              <p className="text-sm text-red-400 mt-2">
                Make sure to copy your API key now. You won't be able to see it again!
              </p>
            </div>
          )}
        </div>

        {/* API Keys List */}
        <div className={`rounded-lg p-6 ${
          theme === 'dark'
            ? 'bg-[#1A1A1A] border border-gray-800'
            : 'bg-white shadow-sm border border-gray-200'
        }`}>
          <h2 className={`text-xl font-semibold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>Your API Keys</h2>
          
          <div className="space-y-4">
            {apiKeys.map((key) => (
              <div key={key.id} className={`rounded-lg p-4 ${
                theme === 'dark'
                  ? 'bg-[#2A2A2A] border-gray-700'
                  : 'bg-gray-50 border-gray-200'
              } border`}>
                {editingKey === key.id ? (
                  <div className="flex gap-4 items-center">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="flex-1 bg-[#1A1A1A] border border-gray-700 rounded-md px-3 py-1 
                               text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={() => updateApiKey(key.id)}
                      className="text-green-400 hover:text-green-300 transition-colors duration-200"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingKey(null)}
                      className="text-gray-400 hover:text-gray-300 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-white">{key.name}</p>
                      <p className="text-sm text-gray-400">
                        Created: {new Date(key.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setEditingKey(key.id);
                          setEditName(key.name);
                        }}
                        className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteApiKey(key.id)}
                        className="text-red-400 hover:text-red-300 transition-colors duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 