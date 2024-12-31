'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { useTheme } from '@/context/ThemeContext';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      if (isLogin) {
        // Login
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        
        if (!response.ok) throw new Error(data.message);
        
        router.push('/dashboard');
      } else {
        // Register
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            email, 
            password,
            redirectTo: `${window.location.origin}/auth/callback`
          }),
        });

        const data = await response.json();
        
        if (!response.ok) throw new Error(data.message);
        
        toast.success('Registration successful! Please check your email to verify your account.');
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-[#111111] text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Navbar */}
      <header className={`sticky top-0 z-10 shadow-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex justify-between items-center p-4">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Logo" width={32} height={32} />
            <span className="font-bold">Shisuke Github Analyzer</span>
          </Link>
          
          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex gap-4 items-center">
            <Link href="/#features" className="hover:underline">Features</Link>
            <Link href="/#pricing" className="hover:underline">Pricing</Link>
            <Link href="/#about" className="hover:underline">About</Link>
            <button onClick={toggleTheme} className={`ml-4 p-2 rounded-full ${theme === 'dark' ? 'text-yellow-400' : 'text-gray-600'}`}>
              {theme === 'dark' ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
            </button>
          </nav>
        </div>

        {/* Mobile navigation */}
        <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden px-4 py-2 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex flex-col gap-2">
            <Link href="/#features" className="py-2 hover:underline">Features</Link>
            <Link href="/#pricing" className="py-2 hover:underline">Pricing</Link>
            <Link href="/#about" className="py-2 hover:underline">About</Link>
            <button 
              onClick={toggleTheme} 
              className={`mt-2 p-2 rounded-full flex items-center justify-center ${theme === 'dark' ? 'text-yellow-400' : 'text-gray-600'}`}
            >
              {theme === 'dark' ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Login Form */}
      <div className="flex-grow flex items-center justify-center p-4">
        <div className={`w-full max-w-md space-y-8 p-4 md:p-8 rounded-lg ${
          theme === 'dark' ? 'bg-[#1A1A1A] border border-gray-800' : 'bg-white shadow-sm border border-gray-200'
        }`}>
          <div className="flex justify-between items-center">
            <h2 className={`text-3xl font-extrabold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {isLogin ? 'Sign in' : 'Register'}
            </h2>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleAuth}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className={`mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border ${
                    theme === 'dark' 
                      ? 'bg-gray-800 border-gray-700 text-white' 
                      : 'border-gray-300 text-gray-900'
                  } placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className={`mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border ${
                    theme === 'dark' 
                      ? 'bg-gray-800 border-gray-700 text-white' 
                      : 'border-gray-300 text-gray-900'
                  } placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loading ? (
                  'Processing...'
                ) : isLogin ? (
                  'Sign in'
                ) : (
                  'Register'
                )}
              </button>
            </div>
          </form>

          <div className="text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
            >
              {isLogin 
                ? "Don't have an account? Register" 
                : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 