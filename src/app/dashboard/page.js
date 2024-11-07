'use client';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [apiKeys, setApiKeys] = useState([]);
  const [newKeyName, setNewKeyName] = useState('');

  // Mock functions for CRUD operations
  const createApiKey = async () => {
    // TODO: Implement API call to create new key
  };

  const deleteApiKey = async (keyId) => {
    // TODO: Implement API call to delete key
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">API Key Management</h1>
      
      {/* Create new key section */}
      <div className="mb-8">
        <h2 className="text-xl mb-4">Create New API Key</h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Key Name"
            value={newKeyName}
            onChange={(e) => setNewKeyName(e.target.value)}
            className="border p-2 rounded"
          />
          <button
            onClick={createApiKey}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Generate Key
          </button>
        </div>
      </div>

      {/* List of API keys */}
      <div>
        <h2 className="text-xl mb-4">Your API Keys</h2>
        <div className="space-y-4">
          {apiKeys.map((key) => (
            <div key={key.id} className="border p-4 rounded flex justify-between items-center">
              <div>
                <p className="font-semibold">{key.name}</p>
                <p className="text-sm text-gray-500">{key.key}</p>
              </div>
              <button
                onClick={() => deleteApiKey(key.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 