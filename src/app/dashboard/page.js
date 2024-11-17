'use client';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useTheme } from '@/context/ThemeContext';
import { MoonIcon, SunIcon, EyeIcon, EyeSlashIcon, ClipboardDocumentIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

const DUMMY_KEYS = [
  { 
    id: 1, 
    name: 'default', 
    createdAt: '2024-01-15', 
    key: 'tvly1234bakjdgskahcisabc',
    displayKey: 'tvly**********abc',
    limit: 1000 
  },
  { id: 2, name: 'production', createdAt: '2024-01-20', key: 'tv1y-********************************', displayKey: 'tv1y-********************************', limit: 1000 },
];

export default function Dashboard() {
  const { theme, toggleTheme } = useTheme();
  const [apiKeys, setApiKeys] = useState([]);
  const [newKeyName, setNewKeyName] = useState('');
  const [loading, setLoading] = useState(false);
  const [showNewKey, setShowNewKey] = useState(false);
  const [newlyCreatedKey, setNewlyCreatedKey] = useState(null);
  const [editingKey, setEditingKey] = useState(null);
  const [editName, setEditName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [keyLimit, setKeyLimit] = useState(1000);
  const [visibleKeys, setVisibleKeys] = useState(new Set());
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editKeyData, setEditKeyData] = useState(null);
  const [canEditUsage, setCanEditUsage] = useState(false);

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const fetchApiKeys = async () => {
    try {
      setLoading(true);
      // Using dummy data instead of API call
      setApiKeys(DUMMY_KEYS);
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
      const newKey = {
        id: Date.now(),
        name: newKeyName,
        createdAt: new Date().toISOString(),
        key: `tv1y-${Math.random().toString(36).substring(2)}********************************`,
      };
      
      setApiKeys([...apiKeys, newKey]);
      setNewlyCreatedKey(newKey.key);
      setShowNewKey(true);
      setNewKeyName('');
      setIsModalOpen(false);
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

  const toggleKeyVisibility = (keyId) => {
    setVisibleKeys(prev => {
      const newSet = new Set(prev);
      if (newSet.has(keyId)) {
        newSet.delete(keyId);
      } else {
        newSet.add(keyId);
      }
      return newSet;
    });
  };

  const copyToClipboard = (key) => {
    navigator.clipboard.writeText(key.key);
    toast.success('API key copied to clipboard');
  };

  const KeyModal = () => (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50`}>
      <div className={`${
        theme === 'dark' ? 'bg-[#1A1A1A] text-white' : 'bg-white text-gray-900'
      } rounded-lg p-6 w-[400px]`}>
        <h2 className="text-xl font-semibold mb-4">Create a new API key</h2>
        <p className="text-sm mb-4">Enter a name and limit for the new API key.</p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Key Name — A unique name to identify this key
            </label>
            <input
              type="text"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              className={`w-full rounded-md px-4 py-2 ${
                theme === 'dark'
                  ? 'bg-[#2A2A2A] border-gray-700 text-gray-200'
                  : 'bg-gray-50 border-gray-300 text-gray-900'
              } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Key Name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">
              Limit monthly usage*
            </label>
            <input
              type="number"
              value={keyLimit}
              onChange={(e) => setKeyLimit(e.target.value)}
              className={`w-full rounded-md px-4 py-2 ${
                theme === 'dark'
                  ? 'bg-[#2A2A2A] border-gray-700 text-gray-200'
                  : 'bg-gray-50 border-gray-300 text-gray-900'
              } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          
          <p className="text-sm text-gray-500">
            * If the combined usage of all your keys exceeds your plan's limit, all requests will be rejected.
          </p>
          
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => setIsModalOpen(false)}
              className={`px-4 py-2 rounded-md ${
                theme === 'dark' ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Cancel
            </button>
            <button
              onClick={createApiKey}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const EditKeyModal = () => (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50`}>
      <div className={`${
        theme === 'dark' ? 'bg-[#1A1A1A] text-white' : 'bg-white text-gray-900'
      } rounded-lg p-6 w-[400px]`}>
        <h2 className="text-xl font-semibold mb-4">Edit API key</h2>
        <p className="text-sm mb-4">Enter a new limit for the API key.</p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Key Name — A unique name to identify this key
            </label>
            <input
              type="text"
              value={editKeyData?.name || ''}
              disabled
              className={`w-full rounded-md px-4 py-2 ${
                theme === 'dark'
                  ? 'bg-[#2A2A2A] border-gray-700 text-gray-400'
                  : 'bg-gray-50 border-gray-300 text-gray-500'
              } border focus:outline-none cursor-not-allowed`}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={canEditUsage}
              onChange={(e) => setCanEditUsage(e.target.checked)}
              className="rounded"
            />
            <label className="text-sm">Limit monthly usage*</label>
          </div>

          <input
            type="number"
            value={editKeyData?.limit || 1000}
            onChange={(e) => setEditKeyData({
              ...editKeyData,
              limit: parseInt(e.target.value)
            })}
            disabled={!canEditUsage}
            className={`w-full rounded-md px-4 py-2 ${
              theme === 'dark'
                ? 'bg-[#2A2A2A] border-gray-700 text-gray-200'
                : 'bg-gray-50 border-gray-300 text-gray-900'
            } border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              !canEditUsage ? 'cursor-not-allowed opacity-50' : ''
            }`}
          />
          
          <p className="text-sm text-gray-500">
            * If the combined usage of all your keys exceeds your plan's limit, all requests will be rejected.
          </p>
          
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => {
                setEditModalOpen(false);
                setCanEditUsage(false);
              }}
              className={`px-4 py-2 rounded-md ${
                theme === 'dark' ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                updateApiKey(editKeyData.id);
                setEditModalOpen(false);
                setCanEditUsage(false);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderApiKeysList = () => (
    <div className={`rounded-lg overflow-hidden ${
      theme === 'dark' ? 'bg-[#1A1A1A] border-gray-800' : 'bg-white border-gray-200'
    } border`}>
      {/* Table Header */}
      <div className="grid grid-cols-4 gap-4 p-4 border-b border-gray-200 dark:border-gray-700 text-sm font-medium">
        <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>NAME</div>
        <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>USAGE</div>
        <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>KEY</div>
        <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>OPTIONS</div>
      </div>

      {/* Table Body */}
      {apiKeys.map((key) => (
        <div key={key.id} className="grid grid-cols-12 gap-4 p-4 items-center">
          <div className="col-span-3">{key.name}</div>
          <div className="col-span-2">0</div>
          <div className="col-span-5 font-mono text-sm truncate">
            {visibleKeys.has(key.id) ? key.key : key.displayKey}
          </div>
          <div className="col-span-2 flex gap-2">
            <button
              onClick={() => toggleKeyVisibility(key.id)}
              className={`p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
              title={visibleKeys.has(key.id) ? "Hide API Key" : "Show API Key"}
            >
              {visibleKeys.has(key.id) ? (
                <EyeSlashIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>

            <button
              onClick={() => copyToClipboard(key)}
              className={`p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
              title="Copy API Key"
            >
              <ClipboardDocumentIcon className="w-5 h-5" />
            </button>

            <button
              onClick={() => {
                setEditKeyData(key);
                setEditModalOpen(true);
              }}
              className={`p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
              title="Edit API Key Name"
            >
              <PencilIcon className="w-5 h-5" />
            </button>

            <button
              onClick={() => deleteApiKey(key.id)}
              className={`p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
              title="Delete API Key"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );

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
          <div className="flex justify-between items-center mb-4">
            <h2 className={`text-xl font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>API Keys</h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Generate Key
            </button>
          </div>
          
          {/* Show Modal when isModalOpen is true */}
          {isModalOpen && <KeyModal />}
          
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
        <div className="mt-6">
          <h2 className={`text-xl font-semibold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>Your API Keys</h2>
          {renderApiKeysList()}
        </div>

        {editModalOpen && <EditKeyModal />}
      </div>
    </div>
  );
} 