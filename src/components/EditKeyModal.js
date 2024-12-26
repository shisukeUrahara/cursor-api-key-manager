import { useTheme } from '@/context/ThemeContext';

export default function EditKeyModal({
  isOpen,
  onClose,
  onSave,
  editKeyData,
  setEditKeyData,
  canEditUsage,
  setCanEditUsage
}) {
  const { theme } = useTheme();

  if (!isOpen) return null;

  return (
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
              onClick={onClose}
              className={`px-4 py-2 rounded-md ${
                theme === 'dark' ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 