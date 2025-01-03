'use client';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useTheme } from '@/context/ThemeContext';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import ApiKeyModal from '@/components/ApiKeyModal';
import EditKeyModal from '@/components/EditKeyModal';
import ApiKeysList from '@/components/ApiKeysList';
import UsageCard from '@/components/UsageCard';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';


const DUMMY_KEYS = [
  { 
    id: 1, 
    name: 'default', 
    createdAt: '2024-01-15', 
    key: 'tvly1234bakjdgskahcisabc',
    displayKey: 'tvly********************',
    limit: 1000 
  },
  { 
    id: 2, 
    name: 'production', 
    createdAt: '2024-01-20', 
    key: 'tvly5678xyzwpqrstuvmnop', 
    displayKey: 'tvly********************', 
    limit: 1000 
  },
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
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      window.location.href = '/login';
    }
  }, [user]);

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const fetchApiKeys = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('api_keys')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      console.log("**@ fetching api keys data", data);

      if (error) throw error;
      setApiKeys(data);
    } catch (error) {
      toast.error('Failed to fetch API keys');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const generateApiKey = () => {
    // Generate a key of consistent length (23 characters)
    const randomStr = Math.random().toString(36).substring(2, 12); // 10 chars
    return `shke${randomStr}${Date.now().toString(36).slice(-9)}`; // shke + 10 chars + 9 chars = 23 total
  };

  const createApiKey = async () => {
    if (!newKeyName.trim()) {
      toast.error('Please enter a key name');
      return;
    }

    try {
      setLoading(true);
      if (!user) throw new Error('Not authenticated');

      const generatedKey = generateApiKey();
      const maskedKey = `${generatedKey.slice(0, 4)}${'*'.repeat(19)}`; // Show first 4 chars + 19 asterisks
      
      const newKey = {
        name: newKeyName,
        key: generatedKey,
        display_key: maskedKey,
        "limit": keyLimit,
        user_id: user.id
      };

      const { data, error } = await supabase
        .from('api_keys')
        .insert([newKey])
        .select()
        .single();

      if (error) throw error;

      setApiKeys([data, ...apiKeys]);
      setNewlyCreatedKey(data.key);
      setVisibleKeys(new Set()); // Start with all keys hidden
      setShowNewKey(true);
      setNewKeyName('');
      setIsModalOpen(false);
      toast.success('API key created successfully');
    } catch (error) {
      toast.error('Failed to create API key');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateApiKey = async (keyId) => {
    if (!editKeyData.name.trim()) {
      toast.error('Please enter a key name');
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('api_keys')
        .update({ 
          name: editKeyData.name,
          "limit": editKeyData.limit
        })
        .eq('id', keyId)
        .select()
        .single();

      if (error) throw error;

      setApiKeys(apiKeys.map(key => 
        key.id === keyId ? data : key
      ));
      setEditingKey(null);
      setEditModalOpen(false);
      toast.success('API key updated successfully');
    } catch (error) {
      toast.error('Failed to update API key');
      console.error(error);
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
      const { error } = await supabase
        .from('api_keys')
        .delete()
        .eq('id', keyId);

      if (error) throw error;

      setApiKeys(apiKeys.filter(key => key.id !== keyId));
      toast.success('API key deleted successfully');
    } catch (error) {
      toast.error('Failed to delete API key');
      console.error(error);
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

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      window.location.href = '/login';
    } catch (error) {
      toast.error('Error logging out');
      console.error(error);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      theme === 'dark' ? 'bg-[#111111] text-gray-100' : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="max-w-4xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-3xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>API Key Management</h1>
          
          <div className="flex items-center gap-4">
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
            >
              Logout
            </button>
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
        </div>

        <UsageCard />

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

          <ApiKeysList
            apiKeys={apiKeys}
            visibleKeys={visibleKeys}
            toggleKeyVisibility={toggleKeyVisibility}
            copyToClipboard={copyToClipboard}
            onEdit={(key) => {
              setEditKeyData(key);
              setEditModalOpen(true);
            }}
            onDelete={deleteApiKey}
          />
        </div>

        <ApiKeyModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={createApiKey}
          newKeyName={newKeyName}
          setNewKeyName={setNewKeyName}
          keyLimit={keyLimit}
          setKeyLimit={setKeyLimit}
        />

        <EditKeyModal
          isOpen={editModalOpen}
          onClose={() => {
            setEditModalOpen(false);
            setCanEditUsage(false);
          }}
          onSave={() => {
            updateApiKey(editKeyData.id);
            setEditModalOpen(false);
            setCanEditUsage(false);
          }}
          editKeyData={editKeyData}
          setEditKeyData={setEditKeyData}
          canEditUsage={canEditUsage}
          setCanEditUsage={setCanEditUsage}
        />
      </div>
    </div>
  );
} 