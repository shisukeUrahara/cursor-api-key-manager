import { useTheme } from '@/context/ThemeContext';

export default function UsageCard() {
  const { theme } = useTheme();
  
  return (
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
  );
} 