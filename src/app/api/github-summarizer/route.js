import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';
import { summarizeReadme } from './chain';


export async function POST(req) {
 try{
     // Get API key from headers
  const apiKey = req.headers.get('x-api-key');
  
  if (!apiKey) {
    return NextResponse.json({ 
      success: false,
      message: 'API key is required' 
    }, { status: 401 });
  }

  // Validate API key
  const { data: keyData, error: keyError } = await supabase
    .from('api_keys')
    .select('*')
    .eq('key', apiKey)
    .single();

  if (keyError || !keyData) {
    return NextResponse.json({ 
      success: false,
      message: 'Invalid API key'
    }, { status: 401 });
  }

  // Get request body
  const { githubUrl } = await req.json();

  if (!githubUrl) {
    return NextResponse.json({
      success: false, 
      message: 'GitHub URL is required'
    }, { status: 400 });
  }

  // Extract repo info from URL
  const repoInfo = getRepoInfo(githubUrl);
  if (!repoInfo) {
    return NextResponse.json({
      success: false,
      message: 'Invalid GitHub repository URL'
    }, { status: 400 });
  }

  // Fetch the README content
  const readmeContent = await fetchReadme(repoInfo.owner, repoInfo.repo);
  if (!readmeContent) {
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch README content'
    }, { status: 404 });
  }

  console.log("readmeContent",readmeContent);

  const summary = await summarizeReadme(readmeContent);



  return NextResponse.json({
    success: true,
    data: {
       summary
    },
    message: 'GitHub repository summarized successfully'

  }, { status: 200 });

 }
  catch (error) {
    console.error('Error Summarizing GitHub Repository:', error);
    return NextResponse.json({ message: 'Error Summarizing GitHub Repository' }, { status: 500 });
  }

  
 

  
}

 // Helper function to extract owner and repo from GitHub URL
 const getRepoInfo = (url) => {
    const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!match) return null;
    return {
      owner: match[1],
      repo: match[2].replace('.git', '') // Remove .git if present
    };
  };

  // Fetch README content from GitHub API
  const fetchReadme = async (owner, repo) => {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/readme`,
        {
          headers: {
            'Accept': 'application/vnd.github.v3.raw'
          }
        }
      );

      if (!response.ok) {
        throw new Error('README not found');
      }

      const content = await response.text();
      return content;

    } catch (error) {
      console.error('Error fetching README:', error);
      return null;
    }
  };
