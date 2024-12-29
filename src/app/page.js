"use client";

import { useTheme } from "@/context/ThemeContext";
import Image from "next/image";
import { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export default function Home() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <header className={`sticky top-0 z-10 shadow-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Logo" width={32} height={32} />
            <span className="font-bold">Shisuke Github Analyzer</span>
          </div>
          <nav className="flex gap-4 items-center">
            <a href="#" className="hover:underline">Features</a>
            <a href="#" className="hover:underline">Pricing</a>
            <a href="#" className="hover:underline">About</a>
            <button onClick={toggleTheme} className={`ml-4 p-2 rounded-full ${theme === 'dark' ? 'text-yellow-400' : 'text-gray-600'}`}>
              {theme === 'dark' ? <FaSun /> : <FaMoon />}
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-grow p-8 overflow-y-auto h-screen">
        <section className="flex flex-col items-center text-center gap-8">
          <h1 className="text-4xl font-bold text-blue-600">
            Unlock GitHub Insights with Shisuke
          </h1>
          <p className="text-lg">
            Get powerful insights, summaries, and analytics for open source GitHub repositories.
          </p>
          <div className="flex gap-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Get Started</button>
            <button className="border border-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-blue-50 dark:hover:bg-gray-800">Learn More</button>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center">Key Features</h2>
          <div className="flex justify-center gap-8 mt-8">
            <div className={`p-4 rounded shadow ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border border-gray-200'}`}>
              <h3 className="font-bold">Repository Insights</h3>
              <p>Get comprehensive summaries and analytics for any GitHub repository.</p>
            </div>
            <div className={`p-4 rounded shadow ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border border-gray-200'}`}>
              <h3 className="font-bold">Important PRs</h3>
              <p>Track and analyze the most impactful pull requests in real-time.</p>
            </div>
            <div className={`p-4 rounded shadow ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border border-gray-200'}`}>
              <h3 className="font-bold">Version Updates</h3>
              <p>Stay informed about the latest version releases and changelogs.</p>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center">Try It Out</h2>
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            <div className={`p-4 rounded shadow w-full md:w-1/2 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border border-gray-200'}`}>
              <h3 className="font-bold">API Request</h3>
              <p>Edit the payload and send a request</p>
              <pre className={`p-2 rounded ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-black'}`}>
                {`{
  "githubUrl": "https://github.com/assafelovic/gpt-researcher"
}`}
              </pre>
              <button className={`px-4 py-2 rounded mt-2 ${theme === 'dark' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-black text-white hover:bg-gray-800'}`}>Try it out</button>
            </div>
            <div className={`p-4 rounded shadow w-full md:w-1/2 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border border-gray-200'}`}>
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

        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center">Pricing Plans</h2>
          <div className="flex flex-wrap justify-center gap-8 mt-8">
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

        <section className="mt-16">
        <footer className={`py-8 mt-auto ${theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-gray-900 text-white'}`}>
        <div className="container mx-auto text-center">
          <p className="mb-4">© 2024 Dandi Github Analyzer. All rights reserved.</p>
          <div className="flex justify-center gap-4 mb-4">
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Contact Us</a>
          </div>
          <div>
            <p className="mb-2">Follow us on:</p>
            <div className="flex justify-center gap-4">
              <a href="#" className="hover:underline">Twitter</a>
              <a href="#" className="hover:underline">LinkedIn</a>
              <a href="#" className="hover:underline">GitHub</a>
            </div>
          </div>
        </div>
      </footer>

        </section>
      </main>

     
    </div>
  );
}
