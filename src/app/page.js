"use client";

import { useTheme } from "@/context/ThemeContext";
import Image from "next/image";
import { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export default function Home() {
  const { theme, toggleTheme } = useTheme();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={`w-full ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <header className={`sticky top-0 z-10 shadow-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Logo" width={32} height={32} />
            <span className="font-bold">Shisuke Github Analyzer</span>
          </div>
          
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
            <a href="#" className="hover:underline">Features</a>
            <a href="#" className="hover:underline">Pricing</a>
            <a href="#" className="hover:underline">About</a>
            <a href="/login" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Login</a>
            <button onClick={toggleTheme} className={`ml-4 p-2 rounded-full ${theme === 'dark' ? 'text-yellow-400' : 'text-gray-600'}`}>
              {theme === 'dark' ? <FaSun /> : <FaMoon />}
            </button>
          </nav>
        </div>

        {/* Mobile navigation */}
        <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden px-4 py-2 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex flex-col gap-2">
            <a href="#" className="py-2 hover:underline">Features</a>
            <a href="#" className="py-2 hover:underline">Pricing</a>
            <a href="#" className="py-2 hover:underline">About</a>
            <a href="/login" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-center">Login</a>
            <button 
              onClick={toggleTheme} 
              className={`mt-2 p-2 rounded-full flex items-center justify-center ${theme === 'dark' ? 'text-yellow-400' : 'text-gray-600'}`}
            >
              {theme === 'dark' ? <FaSun /> : <FaMoon />}
            </button>
          </div>
        </nav>
      </header>

      <main className="w-full p-4 md:p-8">
        {/* Hero section */}
        <section className="flex flex-col items-center text-center gap-6 md:gap-8">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-600">
            Unlock GitHub Insights with Shisuke
          </h1>
          <p className="text-base md:text-lg">
            Get powerful insights, summaries, and analytics for open source GitHub repositories.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Get Started</button>
            <button className="w-full sm:w-auto border border-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-blue-50 dark:hover:bg-gray-800">Learn More</button>
          </div>
        </section>

        {/* Key Features section */}
        <section className="mt-12 md:mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center">Key Features</h2>
          <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 mt-6 md:mt-8">
            {/* Feature cards */}
            <div className={`p-4 rounded shadow ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border border-gray-200'}`}>
              <h3 className="font-bold">Repository Insights</h3>
              <p className="text-sm md:text-base">Get comprehensive summaries and analytics for any GitHub repository.</p>
            </div>
            <div className={`p-4 rounded shadow ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border border-gray-200'}`}>
              <h3 className="font-bold">Important PRs</h3>
              <p className="text-sm md:text-base">Track and analyze the most impactful pull requests in real-time.</p>
            </div>
            <div className={`p-4 rounded shadow ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border border-gray-200'}`}>
              <h3 className="font-bold">Version Updates</h3>
              <p className="text-sm md:text-base">Stay informed about the latest version releases and changelogs.</p>
            </div>
          </div>
        </section>

        {/* Try It Out section */}
        <section className="mt-12 md:mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center">Try It Out</h2>
          <div className="flex flex-col lg:flex-row justify-center gap-4 md:gap-8 mt-6 md:mt-8">
            {/* Request and Response cards */}
            <div className={`p-4 rounded shadow w-full lg:w-1/2 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border border-gray-200'}`}>
              <h3 className="font-bold">API Request</h3>
              <p>Edit the payload and send a request</p>
              <pre className={`p-2 rounded ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-black'}`}>
                {`{
  "githubUrl": "https://github.com/assafelovic/gpt-researcher"
}`}
              </pre>
              <button className={`px-4 py-2 rounded mt-2 ${theme === 'dark' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-black text-white hover:bg-gray-800'}`}>Try it out</button>
            </div>
            <div className={`p-4 rounded shadow w-full lg:w-1/2 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border border-gray-200'}`}>
              <h3 className="font-bold">API Response</h3>
              <p>View the response from the API</p>
              <pre className={`p-2 rounded overflow-auto ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-black'}`}>
                {`{
  "summary": "GPT Researcher is an autonomous agent designed for comprehensive online research on various tasks. It aims to provide detailed, factual, and unbiased research reports by leveraging AI technology. The project addresses issues of misinformation, speed, determinism, and reliability in research tasks.",
  "cool_facts": [
    "The project leverages both 'gpt-4o-mini' and 'gpt-4o' (128K context) to complete research tasks, optimizing costs and..."
  ]
}`}
              </pre>
            </div>
          </div>
        </section>

        {/* Pricing section */}
        <section className="mt-12 md:mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center">Pricing Plans</h2>
          <div className="flex flex-col md:flex-row flex-wrap justify-center gap-4 md:gap-8 mt-6 md:mt-8">
            {/* Pricing cards */}
            <div className={`p-4 rounded shadow w-full md:w-1/3 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border border-gray-200'}`}>
              <h3 className="font-bold">Free</h3>
              <p>For individual developers</p>
              <p className="text-2xl font-bold">$0</p>
              <ul className="list-disc list-inside">
                <li>Basic repository insights</li>
                <li>Limited to 200 requests</li>
                <li>Daily updates</li>
              </ul>
              <button className={`px-4 py-2 rounded mt-2 ${theme === 'dark' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-black text-white hover:bg-gray-800'}`}>Get Started</button>
            </div>
            <div className={`p-4 rounded shadow w-full md:w-1/3 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border border-gray-200'}`}>
              <h3 className="font-bold">Pro</h3>
              <p>For professional developers</p>
              <p className="text-2xl font-bold">$19</p>
              <ul className="list-disc list-inside">
                <li>Advanced repository insights</li>
                <li>Unlimited repositories</li>
                <li>Real-time updates</li>
              </ul>
              <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded mt-2" disabled>Coming Soon</button>
            </div>
            <div className={`p-4 rounded shadow w-full md:w-1/3 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border border-gray-200'}`}>
              <h3 className="font-bold">Enterprise</h3>
              <p>For large teams and organizations</p>
              <p className="text-2xl font-bold">Custom</p>
              <ul className="list-disc list-inside">
                <li>Custom integrations</li>
                <li>Dedicated support</li>
                <li>Advanced analytics</li>
              </ul>
              <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded mt-2" disabled>Coming Soon</button>
            </div>
          </div>
        </section>
      </main>

      <footer className={`py-8 md:py-12 border-t ${theme === 'dark' ? 'bg-gray-800 text-gray-100 border-gray-700' : 'bg-gray-50 text-gray-600 border-gray-200'}`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center md:text-left">
              <h3 className="font-bold text-lg mb-4">About Us</h3>
              <p className="text-sm">Shisuke Github Analyzer helps developers gain valuable insights from GitHub repositories through advanced analytics and AI-powered analysis.</p>
            </div>
            <div className="text-center">
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <div className="flex flex-col space-y-2">
                <a href="#" className="hover:text-blue-500 transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-blue-500 transition-colors">Contact Us</a>
              </div>
            </div>
            <div className="text-center md:text-right">
              <h3 className="font-bold text-lg mb-4">Connect With Us</h3>
              <div className="flex justify-center md:justify-end space-x-4">
                <a href="#" className="hover:text-blue-500 transition-colors">Twitter</a>
                <a href="#" className="hover:text-blue-500 transition-colors">LinkedIn</a>
                <a href="#" className="hover:text-blue-500 transition-colors">GitHub</a>
              </div>
            </div>
          </div>
          <div className="text-center mt-8 pt-8 border-t border-gray-700">
            <p className="text-sm">© 2024 Shisuke Github Analyzer. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
