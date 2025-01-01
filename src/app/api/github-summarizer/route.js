import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { summarizeReadme } from './chain';

export async function POST(req) {
  try {
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

    const summary = await summarizeReadme(readmeContent);

    return NextResponse.json({
      success: true,
      data: summary,
      message: 'GitHub repository summarized successfully'
    }, { status: 200 });

  } catch (error) {
    console.error('GitHub summarizer error:', error);
    return NextResponse.json({
      success: false,
      message: error.message || 'Failed to summarize repository'
    }, { status: 500 });
  }
}

function getRepoInfo(url) {
  try {
    const parsedUrl = new URL(url);
    const parts = parsedUrl.pathname.split('/').filter(Boolean);
    if (parts.length >= 2) {
      return {
        owner: parts[0],
        repo: parts[1]
      };
    }
    return null;
  } catch (error) {
    return null;
  }
}

async function fetchReadme(owner, repo) {
  try {
    const response = await fetch(
      `https://raw.githubusercontent.com/${owner}/${repo}/main/README.md`
    );
    if (!response.ok) {
      const masterResponse = await fetch(
        `https://raw.githubusercontent.com/${owner}/${repo}/master/README.md`
      );
      if (!masterResponse.ok) return null;
      return await masterResponse.text();
    }
    return await response.text();
  } catch (error) {
    console.error('Error fetching README:', error);
    return null;
  }
}
