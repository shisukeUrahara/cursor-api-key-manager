import { EyeIcon, EyeSlashIcon, ClipboardDocumentIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useTheme } from '@/context/ThemeContext';

export default function ApiKeysList({
  apiKeys,
  visibleKeys,
  toggleKeyVisibility,
  copyToClipboard,
  onEdit,
  onDelete
}) {
  const { theme } = useTheme();

  return (
    <div className={`rounded-lg overflow-hidden ${
      theme === 'dark' ? 'bg-[#1A1A1A] border-gray-800' : 'bg-white border-gray-200'
    } border`}>
      <div className="grid grid-cols-4 gap-4 p-4 border-b border-gray-200 dark:border-gray-700 text-sm font-medium">
        <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>NAME</div>
        <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>USAGE</div>
        <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>KEY</div>
        <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>OPTIONS</div>
      </div>

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
              onClick={() => onEdit(key)}
              className={`p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
              title="Edit API Key Name"
            >
              <PencilIcon className="w-5 h-5" />
            </button>

            <button
              onClick={() => onDelete(key.id)}
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
} 