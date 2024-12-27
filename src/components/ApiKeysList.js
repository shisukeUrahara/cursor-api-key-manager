import { EyeIcon, EyeSlashIcon, ClipboardDocumentIcon, PencilIcon, TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
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

  const getDisplayKey = (key) => {
    if (visibleKeys.has(key.id)) {
      return key.key;
    }
    return key.display_key;
  };

  return (
    <div className="space-y-4">
      {apiKeys.map((key) => (
        <div key={key.id} className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
          <div className="flex-1">
            <p className="font-medium">{key.name}</p>
            <p className="text-sm font-mono text-gray-500 dark:text-gray-400">
              {getDisplayKey(key)}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => toggleKeyVisibility(key.id)}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              {visibleKeys.has(key.id) ? (
                <EyeSlashIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={() => copyToClipboard(key)}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <ClipboardDocumentIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => onEdit(key)}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <PencilSquareIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => onDelete(key.id)}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
} 